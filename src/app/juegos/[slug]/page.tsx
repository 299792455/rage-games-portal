import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ContinuePlayingButton,
  FavoriteButton,
  GameFullscreenButton,
  LocalScorePanel,
  RecentlyPlayedTracker,
} from "@/components/features";
import { Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  AdSlot,
  Card,
  CategoryChip,
  DifficultyBadge,
  GameCard,
  RageLevel,
} from "@/components/ui";
import { categories, games, leaderboardPlaceholders } from "@/data";
import {
  createGameMetadata,
  createMissingGameMetadata,
} from "@/lib/seo/metadata";
import {
  createBreadcrumbListJsonLd,
  createVideoGameJsonLd,
  createWebPageJsonLd,
} from "@/lib/seo/json-ld";
import type { Game } from "@/types";

type GamePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const unavailableGameMessage =
  "Este juego no está disponible temporalmente.";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: GamePageProps) {
  const { slug } = await params;
  const game = games.find((currentGame) => currentGame.slug === slug);

  return game ? createGameMetadata(game) : createMissingGameMetadata(slug);
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
  const gameFrameWrapperId = `game-frame-${game.slug}`;
  const challengeTypes = [
    game.hasHiddenTraps ? "Trampas ocultas" : null,
    game.speedrunFriendly ? "Speedrun friendly" : null,
    game.averageRetryTime ? `${game.averageRetryTime}s retry medio` : null,
  ].filter(Boolean);
  const gameJsonLd = [
    createWebPageJsonLd({
      name: game.title,
      description: game.description,
      path: `/juegos/${game.slug}`,
    }),
    createVideoGameJsonLd(game, category),
    createBreadcrumbListJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Juegos", path: "/juegos" },
      { name: game.title, path: `/juegos/${game.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={gameJsonLd} />
      <RecentlyPlayedTracker gameSlug={game.slug} />
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
                  {game.rating > 0 ? game.rating.toFixed(1) : "Sin valoración"}
                </span>
              </div>
              <RageLevel level={game.rageLevel} />
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-2xl font-black text-white">
                    {game.playCount > 0
                      ? game.playCount.toLocaleString("es-ES")
                      : "Sin datos"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    jugadas globales
                  </p>
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
              <div
                className="relative aspect-video bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(244,63,94,0.18),transparent_30%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,0.92))]"
                id={gameFrameWrapperId}
              >
                {game.embedUrl ? (
                  <iframe
                    allow="fullscreen; gamepad"
                    allowFullScreen
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
                        Juego no disponible temporalmente
                      </p>
                      <p className="text-sm leading-6 text-slate-300">
                        {unavailableGameMessage}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row">
                <ContinuePlayingButton
                  className="flex-1"
                  gameSlug={game.slug}
                />
                <GameFullscreenButton
                  className="flex-1"
                  targetId={gameFrameWrapperId}
                />
                <FavoriteButton className="flex-1" gameSlug={game.slug} />
              </div>
            </Card>

            <Card className="p-6" variant="glass">
              <div className="space-y-3">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Selección editorial
                </p>
                <h2 className="text-3xl font-black text-white">
                  Reto difícil preparado para retry
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  Este juego forma parte de nuestra selección de retos difíciles
                  y juegos de retry, con información editorial sobre dificultad,
                  controles y tipo de desafío.
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
                  <span className="text-sm text-slate-400">Proveedor</span>
                  <span className="text-sm font-bold text-white">
                    {game.provider}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                  <span className="text-sm text-slate-400">Embed</span>
                  <span className="text-sm font-bold text-white">
                    {game.embedUrl ? "Disponible" : "No disponible"}
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
          <LocalScorePanel gameSlug={game.slug} />

          <Card className="p-6" variant="panel">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Clasificación global en preparación
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Clasificación global
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
                Esta clasificación global está en preparación. No mostramos
                resultados ficticios ni mezclamos tu progreso local con un
                ranking global.
              </p>
            )}
          </Card>
        </section>

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6" variant="panel">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Mis logros
              </p>
              <h2 className="text-3xl font-black text-white">
                Logros en preparación
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Esta sección formará parte del progreso del jugador en una
                próxima actualización. Por ahora, los logros no están conectados
                a una cuenta ni a un sistema global.
              </p>
            </div>
          </Card>

          <Card className="p-6" variant="glass">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-200">
                Misma categoría
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
              Selección basada en categoría, tags, dificultad y rage level.
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
                  Navegación
                </p>
                <h2 className="text-2xl font-black text-white">
                  Explora más juegos difíciles
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {category ? (
                  <CategoryChip href={`/categorias/${category.slug}`}>
                    {category.name}
                  </CategoryChip>
                ) : null}
                <CategoryChip href="/categorias">Categorías</CategoryChip>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
