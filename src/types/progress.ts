import type { BadgeSlug } from "./badge";
import type { ISODateString, Nullable } from "./common";

export interface LocalProgress {
  gameSlug: string;
  isFavorite: boolean;
  lastPlayedAt: Nullable<ISODateString>;
  bestScore: Nullable<number>;
  bestTime: Nullable<number>;
  attempts: number;
  unlockedBadges: BadgeSlug[];
  updatedAt: ISODateString;
}

export interface ScoreLocal {
  gameSlug: string;
  score: number;
  bestScore: number;
  bestTime: Nullable<number>;
  attempts: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
