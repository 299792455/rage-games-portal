import type { ISODateString } from "./common";

export type ConsentStorageStatus = "granted" | "denied";

export type CookieConsent = {
  version: 1;
  necessary: true;
  analytics_storage: ConsentStorageStatus;
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
  updatedAt: ISODateString;
};
