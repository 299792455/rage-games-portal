import { redirect } from "next/navigation";

import { games } from "@/data";

export const dynamic = "force-dynamic";

export function GET() {
  const availableGames = games.filter(
    (game) => game.isActive && Boolean(game.embedUrl),
  );

  if (availableGames.length === 0) {
    redirect("/juegos");
  }

  const randomIndex = Math.floor(Math.random() * availableGames.length);
  const randomGame = availableGames[randomIndex];

  redirect(`/juegos/${encodeURIComponent(randomGame.slug)}`);
}
