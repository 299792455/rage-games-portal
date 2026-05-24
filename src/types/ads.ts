import type { ISODateString } from "./common";

export type AdPlacementKey = string;

export type AdPlacementType =
  | "banner"
  | "block"
  | "interstitial";

export type AdPlacementLocation =
  | "home"
  | "category"
  | "game"
  | "game-area";

export interface AdPlacement {
  key: AdPlacementKey;
  type: AdPlacementType;
  location: AdPlacementLocation;
  enabled: boolean;
  placeholder: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
