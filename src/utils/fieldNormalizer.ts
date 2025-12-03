/**
 * Utility functions to normalize empty/null fields to "not available"
 * This ensures database columns are never empty - they either have data or "not available"
 */

export const NOT_AVAILABLE = "not available";

/**
 * Normalize string fields - return "not available" if empty/null/undefined
 */
export function normalizeString(
  value: string | null | undefined,
  defaultValue: string = NOT_AVAILABLE
): string {
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  return value.trim();
}

/**
 * Normalize optional string fields - return undefined if empty, otherwise return value
 * Use this for fields that are truly optional (like URLs)
 */
export function normalizeOptionalString(
  value: string | null | undefined
): string | undefined {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/**
 * Normalize number fields - return null if invalid, otherwise return number
 */
export function normalizeNumber(
  value: number | string | null | undefined
): number | null {
  if (value === null || value === undefined) return null;
  const num = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(num) ? null : num;
}

/**
 * Normalize boolean fields - return null if undefined, otherwise return boolean
 */
export function normalizeBoolean(
  value: boolean | null | undefined
): boolean | null {
  if (value === undefined) return null;
  return value === null ? null : Boolean(value);
}

/**
 * Normalize date fields - return undefined if invalid, otherwise return ISO string
 */
export function normalizeDate(
  value: string | Date | null | undefined
): string | undefined {
  if (!value) return undefined;
  try {
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? undefined : date.toISOString();
  } catch {
    return undefined;
  }
}

/**
 * Normalize BigInt fields
 */
export function normalizeBigInt(
  value: bigint | number | string | null | undefined
): bigint | null {
  if (value === null || value === undefined) return null;
  try {
    if (typeof value === "bigint") return value;
    if (typeof value === "number") return BigInt(Math.trunc(value));
    if (typeof value === "string") {
      const num = parseFloat(value);
      return isNaN(num) ? null : BigInt(Math.trunc(num));
    }
    return null;
  } catch {
    return null;
  }
}

