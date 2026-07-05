"use client";

import { useMemo, useSyncExternalStore } from "react";

import { Button, Card } from "@/components/ui";
import {
  getLocalBadgeEntries,
  getServerLocalBadgeEntries,
  resetLocalBadges,
  subscribeToLocalBadgesChanges,
  unlockDemoLocalBadge,
} from "@/lib/local-storage/local-badges";
import type { Badge } from "@/types";

type LocalBadgesPanelProps = {
  badges: Badge[];
};

function formatUnlockedAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Fecha local no disponible";
  }

  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function LocalBadgesPanel({ badges }: LocalBadgesPanelProps) {
  const localBadgeEntries = useSyncExternalStore(
    subscribeToLocalBadgesChanges,
    getLocalBadgeEntries,
    getServerLocalBadgeEntries,
  );
  const entriesBySlug = useMemo(
    () =>
      new Map(
        localBadgeEntries.map((entry) => [entry.badgeSlug, entry.unlockedAt]),
      ),
    [localBadgeEntries],
  );
  const unlockedCount = badges.filter((badge) =>
    entriesBySlug.has(badge.slug),
  ).length;

  return (
    <div className="space-y-6">
      <Card className="p-6" variant="glass">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Progreso local
            </p>
            <h2 className="text-3xl font-black text-white">
              {unlockedCount} / {badges.length} logros desbloqueados
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Estos logros se guardan solo en este navegador por ahora. Puedes
              marcarlos manualmente para seguir tu progreso personal. En una
              próxima actualización, el sistema evolucionará con cuentas,
              progreso automático, logros desbloqueables y rankings globales.
            </p>
          </div>
          <Button
            disabled={unlockedCount === 0}
            onClick={resetLocalBadges}
            variant="danger"
          >
            Reiniciar logros locales
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {badges.map((badge) => {
          const unlockedAt = entriesBySlug.get(badge.slug);
          const isUnlocked = Boolean(unlockedAt);

          return (
            <Card className="p-5" key={badge.slug} variant="panel">
              <div className="flex h-full flex-col gap-5">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <p className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                      {badge.icon}
                    </p>
                    <span
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-bold",
                        isUnlocked
                          ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-400",
                      ].join(" ")}
                    >
                      {isUnlocked ? "Local desbloqueado" : "Bloqueado"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white">
                      {badge.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {badge.description}
                    </p>
                  </div>

                  <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Seguimiento actual
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-300">
                      Marcado manual en este navegador.
                    </p>
                  </div>

                  {unlockedAt ? (
                    <p className="text-sm font-semibold text-cyan-100">
                      Desbloqueado localmente: {formatUnlockedAt(unlockedAt)}
                    </p>
                  ) : (
                    <p className="text-sm leading-6 text-slate-500">
                      No hay desbloqueo automático por acciones de juego todavía.
                    </p>
                  )}
                </div>

                <div className="mt-auto">
                  {isUnlocked ? (
                    <Button className="w-full" disabled variant="ghost">
                      Marcado como conseguido
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => unlockDemoLocalBadge(badge.slug)}
                      variant="secondary"
                    >
                      Marcar como conseguido
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
