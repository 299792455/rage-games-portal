import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card, DifficultyBadge } from "@/components/ui";
import { games, leaderboardPlaceholders } from "@/data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Clasificaciones",
    description:
      "Consulta el estado de las clasificaciones de Juegos Difíciles. Los rankings globales todavía no están publicados.",
    path: "/clasificaciones",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

function getLeaderboardGames() {
  const gameSlugs = Array.from(
    new Set(leaderboardPlaceholders.map((entry) => entry.gameId)),
  );

  return gameSlugs
    .map((gameSlug) => {
      const game = games.find((currentGame) => currentGame.slug === gameSlug);
      const entries = leaderboardPlaceholders
        .filter((entry) => entry.gameId === gameSlug)
        .sort((firstEntry, secondEntry) => firstEntry.rank - secondEntry.rank);
      const topEntry = entries[0];

      return game && topEntry
        ? {
            game,
            entries,
            topEntry,
          }
        : null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

const leaderboardGames = getLeaderboardGames();
const globalTopEntries = [...leaderboardPlaceholders]
  .sort((firstEntry, secondEntry) => secondEntry.score - firstEntry.score)
  .slice(0, 5);
const hasPublishedLeaderboards =
  globalTopEntries.length > 0 && leaderboardGames.length > 0;

export default function LeaderboardsPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Clasificaciones
            </p>
            <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
              Rankings de juegos difíciles
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Los rankings globales llegarán en una próxima actualización. Por
              ahora, solo se guardan resultados locales en tu dispositivo.
            </p>
          </div>

          {hasPublishedLeaderboards ? (
            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Card className="p-6" variant="panel">
                <div className="mb-5 space-y-2">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                    Top global
                  </p>
                  <h2 className="text-3xl font-black text-white">
                    Mejores resultados publicados
                  </h2>
                </div>

                <div className="divide-y divide-white/10">
                  {globalTopEntries.map((entry, index) => {
                    const game = games.find(
                      (currentGame) => currentGame.slug === entry.gameId,
                    );

                    return (
                      <div
                        className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3"
                        key={`${entry.gameId}-${entry.rank}`}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-white">
                            {entry.usernamePlaceholder}
                          </p>
                          <p className="text-xs text-slate-500">
                            {game?.title ?? entry.gameId}
                          </p>
                        </div>
                        <p className="text-sm font-black text-white">
                          {entry.score.toLocaleString("es-ES")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6" variant="glass">
                <div className="mb-5 space-y-2">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-200">
                    Por juego
                  </p>
                  <h2 className="text-3xl font-black text-white">
                    Clasificaciones disponibles
                  </h2>
                </div>

                <div className="space-y-3">
                  {leaderboardGames.map(({ game, entries, topEntry }) => (
                    <Link
                      className="block rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus-ring"
                      href={`/clasificaciones/${game.slug}`}
                      key={game.slug}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-black text-white">
                            {game.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2">
                            <DifficultyBadge level={game.difficultyLevel} />
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                              {entries.length} entradas
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                            Mejor resultado
                          </p>
                          <p className="mt-1 text-2xl font-black text-white">
                            {topEntry.score.toLocaleString("es-ES")}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </section>
          ) : (
            <Card className="p-8 text-center" variant="glass">
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Sin clasificación global
                </p>
                <h2 className="text-3xl font-black text-white">
                  Todavía no hay rankings publicados
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  No mostramos resultados ficticios ni mezclamos tus
                  resultados locales con una clasificación global. Estamos
                  preparando una funcionalidad de rankings globales para
                  comparar resultados con otros jugadores más adelante.
                </p>
                <Link
                  className="mt-2 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                  href="/juegos"
                >
                  Explorar juegos
                </Link>
              </div>
            </Card>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
