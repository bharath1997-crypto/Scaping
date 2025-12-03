# ✅ Multi-Store Safety Audit

**Date:** December 3, 2025  
**Status:** ✅ **ALL CHECKS PASSED**

---

## 🎯 **CRITICAL REQUIREMENT**

**ChatGPT on Google Play** and **ChatGPT on Apple App Store** must:
- ✅ Never overwrite each other
- ✅ Exist as separate rows in the database
- ✅ Be queryable independently
- ✅ Be comparable side-by-side

---

## ✅ **SCHEMA VERIFICATION**

### **App Model** ✅

```prisma
model App {
  id        String   @id @default(cuid())
  store     Store    @default(GOOGLE_PLAY)
  appId     String
  
  // ... fields ...
  
  @@unique([store, appId])  // ✅ CORRECT - Composite unique key
}
```

**Status:** ✅ **CORRECT**
- Uniqueness is enforced on `(store, appId)` pair
- NOT on `appId` alone
- NOT on `name` alone
- This allows same app name across stores

**Example:**
- ✅ `(GOOGLE_PLAY, "com.openai.chatgpt")` → One row
- ✅ `(APPLE_APP_STORE, "6448311069")` → Different row
- ❌ Cannot have two `(GOOGLE_PLAY, "com.openai.chatgpt")` rows

---

## ✅ **CODEBASE AUDIT**

### **1. App Upsert Service** ✅

**File:** `src/services/appUpsert.service.ts`

```typescript
const appRow = await prisma.app.upsert({
  where: { store_appId: { store, appId: app.appId } },  // ✅ CORRECT
  update: baseData,
  create: baseData,
});
```

**Status:** ✅ **CORRECT**
- Uses composite key `store_appId: { store, appId }`
- Always includes `store` in query

---

### **2. Raw Snapshot Service** ✅

**File:** `src/services/rawSnapshot.service.ts`

```typescript
const appRow = await prisma.app.findUnique({
  where: {
    store_appId: {
      store: row.store,
      appId: row.appId,
    },
  },
  select: { id: true },
});
```

**Status:** ✅ **CORRECT**
- Uses composite key `store_appId`
- Always includes `store` in query

---

### **3. API Service - Get App Detail** ✅

**File:** `src/api/services/apps.service.ts`

```typescript
static async getAppDetail(store: Store, appId: string): Promise<AppDetailDto | null> {
  const app = await prisma.app.findUnique({
    where: {
      store_appId: {
        store,      // ✅ CORRECT
        appId,      // ✅ CORRECT
      },
    },
    // ...
  });
}
```

**Status:** ✅ **CORRECT**
- Method signature requires both `store` and `appId`
- Uses composite key in query

---

### **4. API Controller** ✅

**File:** `src/api/controllers/apps.controller.ts`

```typescript
static async getAppDetail(req: Request, res: Response) {
  const { store: storeParam, appId } = req.params;  // ✅ CORRECT
  
  const store = parseStore(storeParam);
  const app = await AppsService.getAppDetail(store, appId);  // ✅ CORRECT
}
```

**Status:** ✅ **CORRECT**
- Route: `GET /api/v1/apps/:store/:appId`
- Always requires `store` parameter
- Cannot query without store

---

### **5. API Routes** ✅

**File:** `src/api/routes/apps.routes.ts`

```typescript
router.get("/:store/:appId", AppsController.getAppDetail);
router.get("/:store/:appId/reviews-analytics", AppsController.getAppReviewsAnalytics);
```

**Status:** ✅ **CORRECT**
- Routes require `store` parameter
- Cannot access apps without specifying store

---

## ✅ **SEARCH FUNCTIONALITY**

**File:** `src/api/services/apps.service.ts`

```typescript
if (searchQuery) {
  where.OR = [
    { title: { contains: searchQuery, mode: "insensitive" } },
    { developer: { contains: searchQuery, mode: "insensitive" } },
    { summary: { contains: searchQuery, mode: "insensitive" } },
    { appId: { contains: searchQuery, mode: "insensitive" } },
  ];
}
```

**Status:** ✅ **SAFE**
- Search includes `appId` but only within filtered `store` context
- If `store` filter is provided, search is scoped to that store
- If no `store` filter, search returns results from all stores (which is correct)

---

## ✅ **DTO DESIGN**

**File:** `src/api/dtos/app.dto.ts`

```typescript
export interface AppListItemDto {
  id: string;
  store: "GOOGLE_PLAY" | "APPLE_APP_STORE" | ...;  // ✅ Always includes store
  appId: string;                                    // ✅ Store-specific ID
  name: string;
  // ...
}
```

**Status:** ✅ **CORRECT**
- Every DTO includes `store` field
- Frontend always knows which store an app belongs to
- No ambiguity possible

---

## ✅ **RELATED MODELS**

### **RawAppSnapshot** ✅

```prisma
model RawAppSnapshot {
  store        Store     // ✅ Store field present
  appId        String    // ✅ Store-specific ID
  appIdRef     String?   // ✅ References App.id (which includes store)
  app          App?      @relation(...)
  
  @@index([store, appId])  // ✅ Indexed by composite key
}
```

**Status:** ✅ **CORRECT**
- Snapshot includes `store` field
- Indexed by `(store, appId)`
- References `App` via `appIdRef` (which is unique per store)

---

### **AppDailyStat** ✅

```prisma
model AppDailyStat {
  appIdRef   String   // ✅ References App.id (which includes store)
  app        App      @relation(...)
  
  @@unique([appIdRef, date, country])  // ✅ Unique per app (which is per store)
}
```

**Status:** ✅ **CORRECT**
- References `App` via `appIdRef`
- Since `App` is unique per `(store, appId)`, daily stats are automatically scoped correctly

---

### **AppRanking** ✅

```prisma
model AppRanking {
  appIdRef   String   // ✅ References App.id (which includes store)
  app        App      @relation(...)
  
  @@unique([appIdRef, chartType, category, country, date])  // ✅ Unique per app
}
```

**Status:** ✅ **CORRECT**
- References `App` via `appIdRef`
- Rankings are automatically scoped per store

---

## ✅ **NO PROBLEMATIC PATTERNS FOUND**

### **What We Checked For:**
- ❌ Queries using only `appId` without `store`
- ❌ Unique constraints on `appId` alone
- ❌ Unique constraints on `name` alone
- ❌ API endpoints that don't require `store` parameter
- ❌ DTOs missing `store` field

### **Result:**
✅ **NONE FOUND** - All code correctly uses composite `(store, appId)` pattern

---

## 🎯 **CROSS-STORE COMPARISON CAPABILITY**

### **Current Design:**
- ✅ Each store's version of an app is a separate `App` row
- ✅ Can query per store: `GET /api/v1/apps?store=google`
- ✅ Can compare side-by-side in frontend
- ✅ All metrics (ratings, reviews, installs) are store-specific

### **Example Query:**
```bash
# ChatGPT on Google Play
GET /api/v1/apps/google/com.openai.chatgpt

# ChatGPT on Apple App Store  
GET /api/v1/apps/apple/6448311069
```

**Result:** Two separate responses, can be compared in UI

---

## 🚀 **FUTURE ENHANCEMENT: GlobalApp**

When ready for "one product, many stores" analytics:

```prisma
model GlobalApp {
  id            String   @id @default(cuid())
  canonicalName String   // "ChatGPT"
  website       String?
  
  storeApps     App[]   // Links to App rows across stores
}

model App {
  // ... existing fields ...
  
  globalAppId String?
  globalApp   GlobalApp? @relation(fields: [globalAppId], references: [id])
  
  @@unique([store, appId])  // ✅ Still enforced
}
```

**Benefits:**
- Can show "ChatGPT total installs across all stores"
- Cross-store comparison queries
- "Same product, different store performance" analytics

**But:** Not needed right now - current design already supports side-by-side comparison.

---

## ✅ **FINAL VERDICT**

**Status:** ✅ **100% SAFE FOR MULTI-STORE**

- ✅ Schema enforces `(store, appId)` uniqueness
- ✅ All queries use composite key
- ✅ API always requires `store` parameter
- ✅ DTOs always include `store` field
- ✅ No code assumes `appId` is globally unique
- ✅ Cross-store comparison already possible

**ChatGPT on Google Play and ChatGPT on Apple App Store will NEVER overwrite each other.** ✅

---

**Audit Complete:** December 3, 2025

