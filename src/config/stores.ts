export const STORES = {
  GOOGLE_PLAY: "GOOGLE_PLAY",
  APPLE_APP_STORE: "APPLE_APP_STORE",
  SAMSUNG_GALAXY_STORE: "SAMSUNG_GALAXY_STORE",
} as const;

export type StoreType = typeof STORES[keyof typeof STORES];


