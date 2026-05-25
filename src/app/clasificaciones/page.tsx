import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card, DifficultyBadge, RageLevel } from "@/components/ui";
import { games, leaderboardPlaceholders } from "@/data";

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

export default function LeaderboardsPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Clasificaciones
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Leaderboards placeholder y anonimos
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Consulta rankings de demostracion para juegos dificiles. Estas
                entradas son anonimas, no pertenecen a usuarios reales y no
                estan conectadas con tus scores locales.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Demo sin cuenta
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                No hay perfil, login, userId ni envio de resultados. Los datos
                vienen solo del catalogo placeholder validado.
              </p>
            </Card>
          </div>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="p-6" variant="panel">
              <div className="mb-5 space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Top global demo
                </p>
                <h2 className="text-3xl font-black text-white">
                  Mejores scores placeholder
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
                  Juegos con ranking
                </p>
                <h2 className="text-3xl font-black text-white">
                  Clasificaciones por juego
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
                        <p className="line-clamp-2 text-sm leading-6 text-slate-400">
                          {game.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <DifficultyBadge level={game.difficultyLevel} />
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                            {entries.length} entradas anonimas
                          </span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                          Top score
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

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {leaderboardGames.map(({ game }) => (
              <Card className="p-5" key={game.slug} variant="panel">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                      {game.category}
                    </p>
                    <h3 className="mt-2 text-xl font-black text-white">
                      {game.title}
                    </h3>
                  </div>
                  <RageLevel level={game.rageLevel} />
                  <Link
                    className="inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 text-sm font-bold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-ring"
                    href={`/juegos/${game.slug}`}
                  >
                    Ver juego
                  </Link>
                </div>
              </Card>
            ))}
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
