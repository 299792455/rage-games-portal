import Link from "next/link";

import { ContinuePlayingGrid } from "@/components/features";
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
import {
  badges,
  categories,
  games,
  leaderboardPlaceholders,
} from "@/data";
import {
  createCollectionPageJsonLd,
  createItemListJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { HOME_DESCRIPTION } from "@/lib/seo/site";

const featuredCategories = categories.slice(0, 8);
const impossibleGames = games.filter(
  (game) => game.category === "juegos-imposibles",
);
const rageGames = [...games]
  .sort((firstGame, secondGame) => {
    if (secondGame.rageLevel !== firstGame.rageLevel) {
      return secondGame.rageLevel - firstGame.rageLevel;
    }

    return secondGame.playCount - firstGame.playCount;
  })
  .slice(0, 4);
const dieAndRetryGames = games.filter(
  (game) => game.category === "die-and-retry",
);
const hardcorePlatformGames = games.filter(
  (game) => game.category === "plataformas-hardcore",
);
const trapGames = games.filter((game) => game.category === "juegos-con-trampas");
const fastChallengeGames = games
  .filter((game) =>
    ["one-touch", "reflejos", "speedrun"].includes(game.category),
  )
  .slice(0, 6);
const newGames = [...games]
  .sort(
    (firstGame, secondGame) =>
      new Date(secondGame.createdAt).getTime() -
      new Date(firstGame.createdAt).getTime(),
  )
  .slice(0, 4);
const leaderboardPreview = leaderboardPlaceholders.slice(0, 5);
const badgePreview = badges.slice(0, 6);
const featuredGame =
  games.find((game) => game.slug === "rage-maze-troll-hardest-platformer") ??
  games[0];

const gameSections = [
  {
    title: "Juegos imposibles",
    description:
      "Retos extremos para quienes quieren saltos precisos, rutas duras y muy poco margen de error.",
    games: impossibleGames,
    href: "/categorias/juegos-imposibles",
  },
  {
    title: "Rage games destacados",
    description:
      "Los juegos con mas nivel de rage y mas intensidad dentro del catalogo curado.",
    games: rageGames,
    href: "/populares",
  },
  {
    title: "Die & Retry",
    description:
      "Falla, aprende la trampa, vuelve a intentarlo y mejora cada intento.",
    games: dieAndRetryGames,
    href: "/categorias/die-and-retry",
  },
  {
    title: "Plataformas hardcore",
    description:
      "Plataformas exigentes con precision, timing estricto y rutas que no perdonan.",
    games: hardcorePlatformGames,
    href: "/categorias/plataformas-hardcore",
  },
  {
    title: "Juegos con trampas",
    description:
      "Puertas falsas, pinchos ocultos y reglas que solo se entienden despues de caer.",
    games: trapGames,
    href: "/categorias/juegos-con-trampas",
  },
];

const homeVisibleGames = [
  featuredGame,
  ...gameSections.flatMap((section) => section.games.slice(0, 4)),
  ...fastChallengeGames,
  ...newGames,
].filter(
  (game, index, visibleGames) =>
    visibleGames.findIndex((visibleGame) => visibleGame.slug === game.slug) ===
    index,
);

const homeJsonLd = [
  createWebsiteJsonLd(),
  createOrganizationJsonLd(),
  createCollectionPageJsonLd({
    name: "Juegos difíciles online gratis",
    description: HOME_DESCRIPTION,
    path: "/",
  }),
  createItemListJsonLd({
    name: "Juegos visibles en la portada",
    path: "/",
    items: homeVisibleGames.map((game) => ({
      name: game.title,
      path: `/juegos/${game.slug}`,
    })),
  }),
];

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid min-h-[calc(100svh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Juegos gratis en el navegador
              </p>
              <div className="space-y-5">
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl">
                  Juegos difíciles online gratis
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Entra directo a una seleccion de juegos dificiles, frustrantes
                  y memorables. Sin descarga, sin cuenta y pensados para decir:
                  solo un intento mas.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-bold text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                href="/juegos"
              >
                Jugar gratis
              </Link>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-5 text-sm font-bold text-slate-100 transition hover:border-violet-300/40 hover:bg-violet-400/10 focus-ring"
                href="/aleatorio"
              >
                Probar un reto aleatorio
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-slate-950/60 px-5 text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100 focus-ring"
                href="/buscar"
              >
                Buscar juegos
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="p-4" variant="panel">
                <p className="text-3xl font-black text-white">{games.length}</p>
                <p className="mt-1 text-sm text-slate-400">
                  juegos reales disponibles
                </p>
              </Card>
              <Card className="p-4" variant="panel">
                <p className="text-3xl font-black text-white">
                  {categories.length}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  categorias principales
                </p>
              </Card>
              <Card className="p-4" variant="panel">
                <p className="text-3xl font-black text-white">0</p>
                <p className="mt-1 text-sm text-slate-400">
                  descargas necesarias
                </p>
              </Card>
            </div>
          </div>

          <Card className="relative overflow-hidden p-6" variant="glass">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.18),transparent_28%)]" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Reto destacado
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">
                    {featuredGame.title}
                  </h2>
                </div>
                <DifficultyBadge level={featuredGame.difficultyLevel} />
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-[linear-gradient(135deg,rgba(14,165,233,0.18),rgba(168,85,247,0.18),rgba(244,63,94,0.18))]">
                {featuredGame.thumbnail.kind === "provider-image" ? (
                  <img
                    alt={featuredGame.thumbnail.alt}
                    className="h-full w-full object-cover"
                    src={featuredGame.thumbnail.src}
                  />
                ) : (
                  <>
                    <div className="absolute left-6 top-6 h-16 w-24 rounded border border-cyan-300/40 bg-cyan-300/15" />
                    <div className="absolute bottom-10 left-10 h-4 w-36 rounded-full bg-rose-400/70 shadow-[0_0_24px_rgba(251,113,133,0.45)]" />
                    <div className="absolute bottom-20 right-8 h-28 w-4 rounded-full bg-violet-300/70 shadow-[0_0_24px_rgba(168,85,247,0.45)]" />
                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                      <span className="h-10 w-10 rounded border border-white/20 bg-white/10" />
                      <span className="h-16 w-16 rounded border border-cyan-300/30 bg-cyan-300/10" />
                      <span className="h-8 w-24 rounded border border-rose-300/30 bg-rose-400/10" />
                    </div>
                  </>
                )}
              </div>

              <p className="text-sm leading-6 text-slate-300">
                {featuredGame.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {featuredGame.tags.slice(0, 4).map((tag) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <RageLevel level={featuredGame.rageLevel} />
                {featuredGame.playCount > 0 ? (
                  <span className="text-sm font-bold text-slate-300">
                    {featuredGame.playCount.toLocaleString("es-ES")} jugadas
                  </span>
                ) : null}
              </div>
            </div>
          </Card>
        </section>

        <section className="container-page space-y-6 py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Explora por categoria
              </p>
              <h2 className="text-3xl font-black text-white">
                Elige tu tipo de frustracion favorita
              </h2>
            </div>
            <Link
              className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
              href="/categorias"
            >
              Ver todas las categorias
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {featuredCategories.map((category) => (
              <CategoryChip
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                {category.name}
              </CategoryChip>
            ))}
          </div>
        </section>

        <section className="container-page py-8">
          <AdSlot label="AdSlot placeholder - home banner" />
        </section>

        <section className="container-page space-y-6 py-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Seguir jugando
            </p>
            <h2 className="text-3xl font-black text-white">
              Retoma tus retos guardados
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Lista local creada al pulsar Play. Funciona sin cuenta y se queda
              en este navegador.
            </p>
          </div>

          <ContinuePlayingGrid games={games} />
        </section>

        {gameSections.map((section) => (
          <section className="container-page space-y-6 py-10" key={section.title}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-2">
                <h2 className="text-3xl font-black text-white">
                  {section.title}
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  {section.description}
                </p>
              </div>
              <a
                className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
                href={section.href}
              >
                Ver mas
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {section.games.slice(0, 4).map((game) => (
                <GameCard game={game} key={game.slug} />
              ))}
            </div>
          </section>
        ))}

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6" variant="panel">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Retos rapidos
              </p>
              <h2 className="text-3xl font-black text-white">
                Partidas cortas, fallos veloces
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                One touch, reflejos y speedrun para sesiones rapidas donde cada
                intento dura poco y la presion llega enseguida.
              </p>
            </div>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {fastChallengeGames.map((game) => (
              <a
                className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus-ring"
                href={`/juegos/${game.slug}`}
                key={game.slug}
              >
                <p className="text-sm font-bold text-white">{game.title}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                  {game.description}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <DifficultyBadge level={game.difficultyLevel} />
                  {game.averageRetryTime !== null ? (
                    <span className="text-xs font-semibold text-slate-500">
                      {game.averageRetryTime}s retry
                    </span>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="container-page space-y-6 py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl font-black text-white">Nuevos juegos</h2>
              <p className="text-sm leading-6 text-slate-400">
                Las incorporaciones mas recientes del catalogo real, listas
                para jugar directamente en el navegador.
              </p>
            </div>
            <a
              className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
              href="/nuevos"
            >
              Ver novedades
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {newGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </section>

        <section className="container-page py-10">
          <Card className="p-6" variant="panel">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Clasificaciones
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Ranking global
                </h2>
              </div>
              <Link
                className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
                href="/clasificaciones"
              >
                Ver rankings
              </Link>
            </div>

            {leaderboardPreview.length > 0 ? (
              <div className="divide-y divide-white/10">
                {leaderboardPreview.map((entry) => (
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
                      <p className="text-xs text-slate-500">{entry.gameId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">
                        {entry.score.toLocaleString("es-ES")}
                      </p>
                      <p className="text-xs text-slate-500">
                        {entry.attempts} intentos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400">
                Todavia no hay un ranking global publicado.
              </p>
            )}
          </Card>
        </section>

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="p-6" variant="glass">
            <div className="mb-6 space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Badges locales
              </p>
              <h2 className="text-3xl font-black text-white">
                Recompensas ligeras, sin cuenta
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-400">
                Catalogo de badges de demostracion para progreso local en el
                navegador. No hay perfil, usuario ni sincronizacion.
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

          <Card className="p-6" variant="panel">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-200">
                  Top categorias
                </p>
                <h2 className="text-3xl font-black text-white">
                  La dificultad como criterio
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  La seleccion no depende de una categoria generica de provider.
                  Se organiza por dificultad, rage, controles y tipo de reto.
                </p>
              </div>

              <div className="space-y-3">
                {categories.slice(0, 5).map((category) => (
                  <a
                    className="flex items-center justify-between gap-4 rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus-ring"
                    href={`/categorias/${category.slug}`}
                    key={category.slug}
                  >
                    <span>
                      <span className="block text-sm font-bold text-white">
                        {category.name}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-xs text-slate-500">
                        {category.description}
                      </span>
                    </span>
                    <span className="text-xs font-black text-cyan-100">
                      {category.order}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="container-page py-10">
          <Card
            className="grid gap-6 overflow-hidden p-6 lg:grid-cols-[1fr_auto]"
            variant="glass"
          >
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Comunidad sin cuenta en V1
              </p>
              <h2 className="text-3xl font-black text-white">
                Favoritos, recientes y progreso guardados localmente
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-400">
                La V1 funciona sin registro. Las funciones de retencion
                disponibles se guardan localmente en este navegador.
              </p>
            </div>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-5 text-sm font-bold text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-ring"
              href="/ayuda"
            >
              Centro de ayuda
            </Link>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
