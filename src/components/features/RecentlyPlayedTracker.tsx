"use client";

import { useEffect } from "react";

import { recordRecentlyPlayedGame } from "@/lib/local-storage/recently-played";

type RecentlyPlayedTrackerProps = {
  gameSlug: string;
};

export function RecentlyPlayedTracker({
  gameSlug,
}: RecentlyPlayedTrackerProps) {
  useEffect(() => {
    recordRecentlyPlayedGame(gameSlug);
  }, [gameSlug]);

  return null;
}
