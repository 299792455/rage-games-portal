"use client";

import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui";
import {
  getContinuePlayingEntries,
  getServerContinuePlayingEntries,
  recordContinuePlayingGame,
  subscribeToContinuePlayingChanges,
} from "@/lib/local-storage/continue-playing";

type ContinuePlayingButtonProps = {
  gameSlug: string;
  className?: string;
};

export function ContinuePlayingButton({
  gameSlug,
  className,
}: ContinuePlayingButtonProps) {
  const continuePlayingEntries = useSyncExternalStore(
    subscribeToContinuePlayingChanges,
    getContinuePlayingEntries,
    getServerContinuePlayingEntries,
  );
  const isSaved = continuePlayingEntries.some(
    (entry) => entry.slug === gameSlug,
  );

  function handleClick() {
    recordContinuePlayingGame(gameSlug);
  }

  return (
    <Button
      aria-label={
        isSaved
          ? "Actualizar seguir jugando local"
          : "Guardar para seguir jugando localmente"
      }
      className={className}
      onClick={handleClick}
      variant={isSaved ? "secondary" : "primary"}
    >
      {isSaved ? "Seguir guardado" : "Play"}
    </Button>
  );
}
