"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

type GameFullscreenButtonProps = {
  targetId: string;
  className?: string;
};

export function GameFullscreenButton({
  targetId,
  className,
}: GameFullscreenButtonProps) {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  async function handleFullscreenRequest() {
    if (typeof document === "undefined") {
      return;
    }

    const targetElement = document.getElementById(targetId);

    if (!targetElement || !document.fullscreenEnabled) {
      setStatusMessage("Pantalla completa no disponible");
      return;
    }

    try {
      await targetElement.requestFullscreen();
      setStatusMessage(null);
    } catch {
      setStatusMessage("Pantalla completa no disponible");
    }
  }

  return (
    <Button
      aria-label="Abrir juego en pantalla completa"
      className={className}
      onClick={handleFullscreenRequest}
      variant="ghost"
    >
      Pantalla completa
      {statusMessage ? <span className="sr-only">{statusMessage}</span> : null}
    </Button>
  );
}
