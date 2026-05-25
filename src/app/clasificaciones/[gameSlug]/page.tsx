import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer, Header } from "@/components/layout";
import { Card, DifficultyBadge, GameCard, RageLevel } from "@/components/ui";
import { games, leaderboardPlaceholders } from "@/data";

type LeaderboardGamePageProps = {
  params: Promise<{
    gameSlug: string;
  }>;
};

export function generateStaticParams() {
  return Array.from(
    new Set(leaderboardPlaceholders.map((entry) => entry.gameId)),
  ).map((gameSlug) => ({
    gameSlug,
  }));
}

function formatBestTime(value: number | null) {
  return value === null ? "Sin tiempo" : `${value}s`;
}

export default async function LeaderboardGamePage({
  params,
}: LeaderboardGamePageProps) {
  const { gameSlug } = await params;
  const game = games.find((currentGame) => currentGame.slug === gameSlug);
  const entries = leaderboardPlaceholders
    .filter((entry) => entry.gameId === gameSlug)
    .sort((firstEntry, secondEntry) => firstEntry.rank - secondEntry.rank);

  if (!game || entries.length === 0) {
    notFound();
  }

  const similarGames = games
    .filter(
      (currentGame) =>
        currentGame.slug !== game.slug && currentGame.category === game.category,
    )
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Clasificacion demo
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                {game.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Leaderboard anonimo de demostracion. No usa scores locales, no
                pertenece a usuarios reales y no envia datos a ningun servidor.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <div className="space-y-4">
                <DifficultyBadge level={game.difficultyLevel} />
                <RageLevel level={game.rageLevel} />
                <Link
                  className="inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-4 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                  href={`/juegos/${game.slug}`}
                >
                  Abrir juego
                </Link>
              </div>
            </Card>
          </div>

          <Card className="overflow-hidden" variant="panel">
            <div className="border-b border-white/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Ranking anonimo
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">
                Entradas placeholder
              </h2>
            </div>

            <div className="divide-y divide-white/10">
              {entries.map((entry) => (
                <div
                  className="grid gap-4 p-5 md:grid-cols-[auto_1fr_auto_auto_auto] md:items-center"
                  key={`${entry.gameId}-${entry.rank}`}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100">
                    {entry.rank}
                  </span>
                  <div>
                    <p className="text-base font-black text-white">
                      {entry.usernamePlaceholder}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {entry.avatarPlaceholder}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Score
                    </p>
                    <p className="mt-1 text-lg font-black text-white">
                      {entry.score.toLocaleString("es-ES")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Mejor tiempo
                    </p>
                    <p className="mt-1 text-lg font-black text-white">
                      {formatBestTime(entry.bestTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Intentos
                    </p>
                    <p className="mt-1 text-lg font-black text-white">
                      {entry.attempts}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="p-6" variant="glass">
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Aviso de datos
                </p>
                <h2 className="text-3xl font-black text-white">
                  Sin relacion con scores locales
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  Este ranking no lee localStorage, no usa MongoDB y no muestra
                  resultados reales de jugadores. Es una vista placeholder para
                  preparar la experiencia de clasificaciones.
                </p>
                <Link
                  className="inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 text-sm font-bold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-ring"
                  href="/clasificaciones"
                >
                  Volver a clasificaciones
                </Link>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {similarGames.map((similarGame) => (
                <GameCard
                  game={similarGame}
                  key={similarGame.slug}
                  showFavoriteAction={false}
                />
              ))}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
