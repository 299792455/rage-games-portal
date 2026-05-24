import type { ISODateString, Nullable } from "./common";

export interface LeaderboardEntryPlaceholder {
  gameId: string;
  usernamePlaceholder: string;
  avatarPlaceholder: string;
  score: number;
  bestTime: Nullable<number>;
  attempts: number;
  rank: number;
  createdAt: ISODateString;
}

export type LeaderboardSortKey =
  | "score"
  | "bestTime"
  | "attempts"
  | "rank";
