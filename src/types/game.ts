import type {
  DifficultyLevel,
  ISODateString,
  InputType,
  LanguageCode,
  Nullable,
  RageLevel,
} from "./common";

export type GameProvider =
  | "placeholder"
  | "gamepix"
  | "gamezop"
  | "gamedistribution"
  | "onlinegames.io"
  | "twoplayergames"
  | "other";

export type GameInputType = InputType;

export type GameDifficultyLevel = DifficultyLevel;

export type GameRageLevel = RageLevel;

export interface GameThumbnail {
  src: string;
  alt: string;
  kind: "local-svg" | "css-gradient" | "provider-image";
}

export interface Game {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: GameThumbnail;
  embedUrl: Nullable<string>;
  provider: Nullable<GameProvider>;
  isMobileFriendly: boolean;
  isDesktopRecommended: boolean;
  inputType: GameInputType;
  difficultyLevel: GameDifficultyLevel;
  rageLevel: GameRageLevel;
  hasHiddenTraps: boolean;
  speedrunFriendly: boolean;
  averageRetryTime: Nullable<number>;
  isActive: boolean;
  rating: number;
  playCount: number;
  language: LanguageCode;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}
