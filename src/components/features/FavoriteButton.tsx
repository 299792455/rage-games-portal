"use client";

import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui";
import {
  getFavoriteSlugs,
  getServerFavoriteSlugs,
  subscribeToFavoriteChanges,
  toggleFavoriteSlug,
} from "@/lib/local-storage/favorites";

type FavoriteButtonProps = {
  gameSlug: string;
  className?: string;
};

export function FavoriteButton({ gameSlug, className }: FavoriteButtonProps) {
  const favoriteSlugs = useSyncExternalStore(
    subscribeToFavoriteChanges,
    getFavoriteSlugs,
    getServerFavoriteSlugs,
  );
  const isFavorite = favoriteSlugs.includes(gameSlug);

  function handleClick() {
    toggleFavoriteSlug(gameSlug);
  }

  return (
    <Button
      aria-label={
        isFavorite
          ? "Quitar de favoritos locales"
          : "Guardar en favoritos locales"
      }
      aria-pressed={isFavorite}
      className={className}
      onClick={handleClick}
      variant={isFavorite ? "secondary" : "ghost"}
    >
      {isFavorite ? "En favoritos" : "Favorito local"}
    </Button>
  );
}
