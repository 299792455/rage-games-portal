import type { ISODateString, LanguageCode } from "./common";

export type CategoryIcon = string;

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: CategoryIcon;
  order: number;
  language: LanguageCode;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
