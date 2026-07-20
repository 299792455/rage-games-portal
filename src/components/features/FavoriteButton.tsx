"use client";

import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/Button";
import {
  getFavoriteSlugs,
  getServerFavoriteSlugs,
  subscribeToFavoriteChanges,
  toggleFavoriteSlug,
} from "@/lib/local-storage/favorites";

type FavoriteButtonProps = {
  gameSlug: string;
  className?: string;
  compact?: boolean;
};

export function FavoriteButton({
  gameSlug,
  className,
  compact = false,
}: FavoriteButtonProps) {
  const favoriteSlugs = useSyncExternalStore(
    subscribeToFavoriteChanges,
    getFavoriteSlugs,
    getServerFavoriteSlugs,
  );
  const isFavorite = favoriteSlugs.includes(gameSlug);
  const ariaLabel = isFavorite ? "Quitar de favoritos" : "Guardar en favoritos";

  function handleClick() {
    toggleFavoriteSlug(gameSlug);
  }

  if (compact) {
    const classes = [
      "inline-flex h-9 w-9 items-center justify-center rounded-full border text-base font-black uppercase leading-none transition focus-ring",
      isFavorite
        ? "border-violet-300/45 bg-violet-400/25 text-violet-100"
        : "border-white/15 bg-black/45 text-white/90 hover:border-cyan-300/40 hover:bg-cyan-300/15",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        aria-label={ariaLabel}
        aria-pressed={isFavorite}
        className={classes}
        onClick={handleClick}
        type="button"
      >
        <span aria-hidden="true">{isFavorite ? "\u2605" : "\u2661"}</span>
      </button>
    );
  }

  return (
    <Button
      aria-label={ariaLabel}
      aria-pressed={isFavorite}
      className={className}
      onClick={handleClick}
      variant={isFavorite ? "secondary" : "ghost"}
    >
      {isFavorite ? "En favoritos" : "Guardar en favoritos"}
    </Button>
  );
}
