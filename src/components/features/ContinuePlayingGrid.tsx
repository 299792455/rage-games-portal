"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";

import { Card, GameCard } from "@/components/ui";
import {
  getContinuePlayingEntries,
  getServerContinuePlayingEntries,
  subscribeToContinuePlayingChanges,
} from "@/lib/local-storage/continue-playing";
import type { Game } from "@/types";

type ContinuePlayingGridProps = {
  games: Game[];
};

function formatUpdatedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha local no disponible";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function ContinuePlayingGrid({ games }: ContinuePlayingGridProps) {
  const continuePlayingEntries = useSyncExternalStore(
    subscribeToContinuePlayingChanges,
    getContinuePlayingEntries,
    getServerContinuePlayingEntries,
  );

  const continuePlayingGames = useMemo(
    () =>
      continuePlayingEntries
        .map((entry) => {
          const game = games.find((currentGame) => currentGame.slug === entry.slug);

          return game
            ? {
                game,
                updatedAt: entry.updatedAt,
              }
            : null;
        })
        .filter(
          (
            entry,
          ): entry is {
            game: Game;
            updatedAt: string;
          } => Boolean(entry),
        ),
    [continuePlayingEntries, games],
  );

  if (continuePlayingGames.length === 0) {
    return (
      <Card className="p-6" variant="glass">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
            Seguir jugando
          </p>
          <h2 className="text-2xl font-black text-white">
            Tus partidas guardadas aparecerán aquí
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Abre la página de un juego para guardarlo en esta lista local. Solo
            se almacenan slug, startedAt y updatedAt en este navegador.
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
      {continuePlayingGames.map(({ game, updatedAt }) => (
        <div className="space-y-3" key={game.slug}>
          <GameCard game={game} showFavoriteAction={false} />
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
              Guardado para seguir
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              {formatUpdatedAt(updatedAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
