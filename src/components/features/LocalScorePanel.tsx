"use client";

import { useMemo, useSyncExternalStore } from "react";

import { Button, Card } from "@/components/ui";
import {
  addDemoAttempt,
  getLocalScoreEntries,
  getServerLocalScoreEntries,
  recordDemoBestTime,
  recordDemoScore,
  resetLocalScoreEntry,
  subscribeToLocalScoreChanges,
} from "@/lib/local-storage/local-scores";

type LocalScorePanelProps = {
  gameSlug: string;
};

function formatScore(value: number | null) {
  return value === null ? "Sin datos" : value.toLocaleString("es-ES");
}

function formatTime(value: number | null) {
  return value === null ? "Sin datos" : `${value}s`;
}

export function LocalScorePanel({ gameSlug }: LocalScorePanelProps) {
  const localScoreEntries = useSyncExternalStore(
    subscribeToLocalScoreChanges,
    getLocalScoreEntries,
    getServerLocalScoreEntries,
  );
  const localScoreEntry = useMemo(
    () =>
      localScoreEntries.find((entry) => entry.gameSlug === gameSlug) ?? null,
    [gameSlug, localScoreEntries],
  );

  const score = localScoreEntry?.score ?? null;
  const bestScore = localScoreEntry?.bestScore ?? null;
  const bestTime = localScoreEntry?.bestTime ?? null;
  const attempts = localScoreEntry?.attempts ?? 0;

  return (
    <Card className="p-6" variant="glass">
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
            Progreso local demo
          </p>
          <h2 className="text-3xl font-black text-white">
            Scores, tiempo e intentos locales
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Datos guardados solo en este navegador. Las acciones son de
            demostracion local y no envian resultados a ningun leaderboard.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Ultimo score demo
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {formatScore(score)}
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Mejor score local
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {formatScore(bestScore)}
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Mejor tiempo demo
            </p>
            <p className="mt-2 text-2xl font-black text-white">
              {formatTime(bestTime)}
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Intentos locales
            </p>
            <p className="mt-2 text-2xl font-black text-white">{attempts}</p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Button onClick={() => addDemoAttempt(gameSlug)} variant="ghost">
            Sumar intento demo
          </Button>
          <Button onClick={() => recordDemoScore(gameSlug)} variant="secondary">
            Guardar score demo
          </Button>
          <Button
            onClick={() => recordDemoBestTime(gameSlug)}
            variant="secondary"
          >
            Guardar tiempo demo
          </Button>
          <Button onClick={() => resetLocalScoreEntry(gameSlug)} variant="danger">
            Reiniciar local
          </Button>
        </div>
      </div>
    </Card>
  );
}
