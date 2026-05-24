import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer, Header } from "@/components/layout";
import {
  AdSlot,
  Card,
  CategoryChip,
  DifficultyBadge,
  GameCard,
  RageLevel,
} from "@/components/ui";
import { badges, categories, games, leaderboardPlaceholders } from "@/data";
import type { Game } from "@/types";

type GamePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const providerPendingMessage =
  "Integración oficial del juego pendiente de aprobación del proveedor.";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

function getSimilarGames(currentGame: Game) {
  const sameCategoryGames = games.filter(
    (game) =>
      game.slug !== currentGame.slug && game.category === currentGame.category,
  );

  const tagRelatedGames = games
    .filter(
      (game) =>
        game.slug !== currentGame.slug &&
        game.category !== currentGame.category &&
        game.tags.some((tag) => currentGame.tags.includes(tag)),
    )
    .sort((firstGame, secondGame) => {
      const firstScore =
        firstGame.playCount +
        firstGame.rageLevel * 1000 +
        firstGame.difficultyLevel * 1000;
      const secondScore =
        secondGame.playCount +
        secondGame.rageLevel * 1000 +
        secondGame.difficultyLevel * 1000;

      return secondScore - firstScore;
    });

  const fallbackGames = games
    .filter(
      (game) =>
        game.slug !== currentGame.slug &&
        !sameCategoryGames.some((sameGame) => sameGame.slug === game.slug) &&
        !tagRelatedGames.some((relatedGame) => relatedGame.slug === game.slug),
    )
    .sort((firstGame, secondGame) => secondGame.playCount - firstGame.playCount);

  return [...sameCategoryGames, ...tagRelatedGames, ...fallbackGames].slice(0, 4);
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = games.find((currentGame) => currentGame.slug === slug);

  if (!game) {
    notFound();
  }

  const category = categories.find(
    (currentCategory) => currentCategory.slug === game.category,
  );
  const sameCategoryGames = games.filter(
    (currentGame) =>
      currentGame.category === game.category && currentGame.slug !== game.slug,
  );
  const similarGames = getSimilarGames(game);
  const leaderboardEntries = leaderboardPlaceholders
    .filter((entry) => entry.gameId === game.slug)
    .sort((firstEntry, secondEntry) => firstEntry.rank - secondEntry.rank);
  const badgePreview = badges.slice(0, 4);
  const challengeTypes = [
    game.hasHiddenTraps ? "Trampas ocultas" : null,
    game.speedrunFriendly ? "Speedrun friendly" : null,
    game.averageRetryTime ? `${game.averageRetryTime}s retry medio` : null,
  ].filter(Boolean);

  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_360px] lg:py-16">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {category ? (
                <Link
                  className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
                  href={`/categorias/${category.slug}`}
                >
                  {category.name}
                </Link>
              ) : null}
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Gratis
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                Sin descarga
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-5xl text-5xl font-black leading-[0.95] text-white md:text-6xl">
                {game.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">
                {game.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <span
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <DifficultyBadge level={game.difficultyLevel} />
                <span className="text-sm font-black text-white">
                  {game.rating.toFixed(1)}
                </span>
              </div>
              <RageLevel level={game.rageLevel} />
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-2xl font-black text-white">
                    {game.playCount.toLocaleString("es-ES")}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">jugadas demo</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">
                    {game.inputType}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">control</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="container-page grid gap-6 py-6 xl:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card className="overflow-hidden" variant="panel">
              <div className="relative aspect-video bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(244,63,94,0.18),transparent_30%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,0.92))]">
                {game.embedUrl ? (
                  <iframe
                    allow="fullscreen; gamepad"
                    className="h-full w-full border-0"
                    loading="lazy"
                    src={game.embedUrl}
                    title={game.title}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-lg)] border border-cyan-300/35 bg-cyan-300/10 text-xl font-black text-cyan-100 shadow-[var(--glow-cyan)]">
                      RG
                    </div>
                    <div className="max-w-xl space-y-3">
                      <p className="text-2xl font-black text-white">
                        Juego pendiente de integracion oficial
                      </p>
                      <p className="text-sm leading-6 text-slate-300">
                        {providerPendingMessage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row">
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)]"
                  role="button"
                >
                  Play
                </span>
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-5 text-sm font-bold text-slate-100"
                  role="button"
                >
                  Fullscreen
                </span>
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius-md)] border border-violet-300/35 bg-violet-400/10 px-5 text-sm font-bold text-violet-100"
                  role="button"
                >
                  Favorito local
                </span>
              </div>
            </Card>

            <Card className="p-6" variant="glass">
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Seleccion editorial
                </p>
                <h2 className="text-3xl font-black text-white">
                  Reto dificil preparado para retry
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  Este juego forma parte de nuestra seleccion de retos dificiles
                  y juegos de retry. La pagina usa datos placeholder y deja clara
                  la integracion pendiente antes de conectar cualquier provider
                  oficial.
                </p>
              </div>
            </Card>
          </div>

          <aside className="space-y-6">
            <AdSlot label="AdSlot placeholder - juego" type="block" />

            <Card className="p-5" variant="panel">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Info de juego
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-sm text-slate-400">Dispositivo</span>
                  <span className="text-sm font-bold text-white">
                    {game.isMobileFriendly
                      ? "Mobile OK"
                      : "Desktop recomendado"}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-sm text-slate-400">Provider</span>
                  <span className="text-sm font-bold text-white">
                    {game.provider}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-sm text-slate-400">Embed</span>
                  <span className="text-sm font-bold text-white">
                    {game.embedUrl ? "Disponible" : "Pendiente"}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-slate-400">Tipo de reto</span>
                  <div className="flex flex-wrap gap-2">
                    {challengeTypes.map((challengeType) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                        key={challengeType}
                      >
                        {challengeType}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </section>

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6" variant="glass">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Progreso local
              </p>
              <h2 className="text-3xl font-black text-white">
                Scores y reintentos llegaran despues
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Los scores personales, mejores tiempos, intentos y progreso
                local se activaran en etapas posteriores. Esta pagina no lee ni
                escribe datos del navegador.
              </p>
            </div>
          </Card>

          <Card className="p-6" variant="panel">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Clasificacion demo
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Leaderboard anonimo
                </h2>
              </div>
              <Link
                className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
                href="/clasificaciones"
              >
                Ver rankings
              </Link>
            </div>

            {leaderboardEntries.length > 0 ? (
              <div className="divide-y divide-white/10">
                {leaderboardEntries.map((entry) => (
                  <div
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3"
                    key={`${entry.gameId}-${entry.rank}`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100">
                      {entry.rank}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {entry.usernamePlaceholder}
                      </p>
                      <p className="text-xs text-slate-500">
                        {entry.attempts} intentos
                      </p>
                    </div>
                    <p className="text-sm font-black text-white">
                      {entry.score.toLocaleString("es-ES")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400">
                Todavia no hay entradas placeholder para este juego. El
                leaderboard real no esta activo en V1.
              </p>
            )}
          </Card>
        </section>

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6" variant="panel">
            <div className="mb-6 space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Badges catalogo
              </p>
              <h2 className="text-3xl font-black text-white">
                Retos locales preparados
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Estos badges son de catalogo placeholder. No hay perfil, cuenta
                ni desbloqueo real en esta etapa.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {badgePreview.map((badge) => (
                <div
                  className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4"
                  key={badge.slug}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-200">
                    {badge.icon}
                  </p>
                  <h3 className="mt-2 text-base font-black text-white">
                    {badge.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6" variant="glass">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-200">
                Misma categoria
              </p>
              <h2 className="text-3xl font-black text-white">
                Otros juegos de {category?.name ?? game.category}
              </h2>
              <div className="space-y-3">
                {sameCategoryGames.map((sameCategoryGame) => (
                  <Link
                    className="block rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus-ring"
                    href={`/juegos/${sameCategoryGame.slug}`}
                    key={sameCategoryGame.slug}
                  >
                    <span className="block text-sm font-bold text-white">
                      {sameCategoryGame.title}
                    </span>
                    <span className="mt-1 line-clamp-1 block text-xs text-slate-500">
                      {sameCategoryGame.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="container-page space-y-6 py-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Juegos similares
            </p>
            <h2 className="text-3xl font-black text-white">
              Mas retos para seguir fallando mejor
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Seleccion basada en categoria, tags, dificultad, rage level y
              popularidad placeholder.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {similarGames.map((similarGame) => (
              <GameCard game={similarGame} key={similarGame.slug} />
            ))}
          </div>
        </section>

        <section className="container-page pb-12">
          <Card className="p-6" variant="panel">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Navegacion
                </p>
                <h2 className="text-2xl font-black text-white">
                  Explora mas juegos dificiles
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {category ? (
                  <CategoryChip href={`/categorias/${category.slug}`}>
                    {category.name}
                  </CategoryChip>
                ) : null}
                <CategoryChip href="/categorias">Categorias</CategoryChip>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
