import { NextResponse } from "next/server";

import { games } from "@/data";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const availableGames = games.filter(
    (game) => game.isActive && Boolean(game.embedUrl),
  );

  if (availableGames.length === 0) {
    return NextResponse.redirect(new URL("/juegos", request.url));
  }

  const randomIndex = Math.floor(Math.random() * availableGames.length);
  const randomGame = availableGames[randomIndex];

  return NextResponse.redirect(
    new URL(`/juegos/${encodeURIComponent(randomGame.slug)}`, request.url),
  );
}
