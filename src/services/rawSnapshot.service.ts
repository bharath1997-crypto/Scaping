import { createHash } from "crypto";
import { prisma } from "../utils/prisma.ts";
import type { AppInfo } from "../types/appInfo.ts";
import { buildRawSnapshotRow } from "./normalizationService.ts";

const normalizePayload = (value: any): any => {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.map((item) => normalizePayload(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, normalizePayload(val)])
    );
  }
  return value;
};

export async function saveRawSnapshot(
  app: AppInfo,
  ctx: {
    country?: string;
    locale?: string;
    rank?: number;
    chartType?: string;
    category?: string | number; // Can be string or number (e.g., Apple category IDs like 6023)
  }
) {
  const row = buildRawSnapshotRow(app, ctx);
  const payload = normalizePayload(row.payload);
  const payloadString = JSON.stringify(payload);
  const payloadHash = createHash("sha256").update(payloadString).digest("hex");

  const lastSnapshot = await prisma.rawAppSnapshot.findFirst({
    where: {
      appId: row.appId,
      store: row.store,
    },
    orderBy: { scrapedAt: "desc" },
    select: {
      payloadHash: true,
    },
  });

  // Check if payload hash changed (deduplication)
  if (lastSnapshot?.payloadHash === payloadHash) {
    return { saved: false, reason: "unchanged" as const };
  }

  // Get or create App row
  const appRow = await prisma.app.findUnique({
    where: {
      store_appId: {
        store: row.store,
        appId: row.appId,
      },
    },
    select: { id: true, firstSeenAt: true },
  });

  // Create new snapshot (payload changed)
  await prisma.rawAppSnapshot.create({
    data: {
      ...row,
      payload,
      appIdRef: appRow?.id ?? null,
      payloadHash,
    },
  });

  // If app exists, update lastSeenAt (payload changed = app was seen again)
  if (appRow) {
    await prisma.app.update({
      where: { id: appRow.id },
      data: { lastSeenAt: new Date() },
    });
  }

  return { saved: true as const, hashChanged: true };
}

