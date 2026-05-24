import type { ISODateString } from "./common";

export type BadgeCondition = string;

export type BadgeSlug = string;

export interface Badge {
  name: string;
  slug: BadgeSlug;
  description: string;
  icon: string;
  condition: BadgeCondition;
  createdAt: ISODateString;
}
