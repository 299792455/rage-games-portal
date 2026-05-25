"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";

import { Card, GameCard } from "@/components/ui";
import {
  getFavoriteSlugs,
  getServerFavoriteSlugs,
  subscribeToFavoriteChanges,
} from "@/lib/local-storage/favorites";
import type { Game } from "@/types";

import { FavoriteButton } from "./FavoriteButton";

type FavoritesGridProps = {
  games: Game[];
};

export function FavoritesGrid({ games }: FavoritesGridProps) {
  const favoriteSlugs = useSyncExternalStore(
    subscribeToFavoriteChanges,
    getFavoriteSlugs,
    getServerFavoriteSlugs,
  );

  const favoriteGames = useMemo(
    () =>
      favoriteSlugs
        .map((slug) => games.find((game) => game.slug === slug))
        .filter((game): game is Game => Boolean(game)),
    [favoriteSlugs, games],
  );

  if (favoriteGames.length === 0) {
    return (
      <Card className="p-8 text-center" variant="glass">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
            Favoritos locales
          </p>
          <h2 className="text-3xl font-black text-white">
            Todavia no tienes favoritos guardados
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Guarda juegos desde su pagina. La lista se queda solo en este
            navegador y no depende de ningun perfil.
          </p>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-4 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
            href="/juegos"
          >
            Explorar juegos
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {favoriteGames.map((game) => (
        <div className="space-y-3" key={game.slug}>
          <GameCard game={game} showFavoriteAction={false} />
          <FavoriteButton className="w-full" gameSlug={game.slug} />
        </div>
      ))}
    </div>
  );
}
