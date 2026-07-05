"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";

import { Card, GameCard } from "@/components/ui";
import {
  getRecentlyPlayedEntries,
  getServerRecentlyPlayedEntries,
  subscribeToRecentlyPlayedChanges,
} from "@/lib/local-storage/recently-played";
import type { Game } from "@/types";

type RecentlyPlayedGridProps = {
  games: Game[];
};

function formatLastPlayedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha local no disponible";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function RecentlyPlayedGrid({ games }: RecentlyPlayedGridProps) {
  const recentlyPlayedEntries = useSyncExternalStore(
    subscribeToRecentlyPlayedChanges,
    getRecentlyPlayedEntries,
    getServerRecentlyPlayedEntries,
  );

  const recentlyPlayedGames = useMemo(
    () =>
      recentlyPlayedEntries
        .map((entry) => {
          const game = games.find((currentGame) => currentGame.slug === entry.slug);

          return game
            ? {
                game,
                lastPlayedAt: entry.lastPlayedAt,
              }
            : null;
        })
        .filter(
          (
            entry,
          ): entry is {
            game: Game;
            lastPlayedAt: string;
          } => Boolean(entry),
        ),
    [games, recentlyPlayedEntries],
  );

  if (recentlyPlayedGames.length === 0) {
    return (
      <Card className="p-8 text-center" variant="glass">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
            Recientes locales
          </p>
          <h2 className="text-3xl font-black text-white">
            Todavía no hay juegos recientes
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Abre la página de un juego para guardarlo en este historial local.
            Solo se almacena el slug del juego y la fecha local de la visita.
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
      {recentlyPlayedGames.map(({ game, lastPlayedAt }) => (
        <div className="space-y-3" key={game.slug}>
          <GameCard game={game} showFavoriteAction={false} />
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
              Ultima visita
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              {formatLastPlayedAt(lastPlayedAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
