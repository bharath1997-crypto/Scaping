import { GooglePlayConnector } from "./googlePlay/googlePlayConnector.ts";
import { AppleAppStoreConnector } from "./appleAppStore/appleAppStoreConnector.ts";
import { SamsungGalaxyStoreConnector } from "./samsungGalaxyStore/samsungGalaxyStoreConnector.ts";
import { HuaweiAppGalleryConnector } from "./huaweiAppGallery/huaweiAppGalleryConnector.ts";
import { XiaomiMiStoreConnector } from "./xiaomiMiStore/xiaomiMiStoreConnector.ts";
import { BaseConnector } from "./baseConnector.ts";
import type { AppInfo } from "../types/appInfo.ts";

export function getConnector(store: AppInfo["store"]): BaseConnector {
  switch (store) {
    case "GOOGLE_PLAY":
      return new GooglePlayConnector();
    case "APPLE_APP_STORE":
      return new AppleAppStoreConnector();
    case "SAMSUNG_GALAXY_STORE":
      return new SamsungGalaxyStoreConnector();
    case "HUAWEI_APP_GALLERY":
      return new HuaweiAppGalleryConnector();
    case "XIAOMI_MI_STORE":
      return new XiaomiMiStoreConnector();
    default:
      throw new Error(`Unknown store: ${store}`);
  }
}
