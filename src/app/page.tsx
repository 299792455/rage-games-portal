import type { Metadata } from "next";
import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  AdSlot,
  Card,
  DifficultyBadge,
  GameCard,
  RageLevel,
} from "@/components/ui";
import { categories, games } from "@/data";
import {
  createCollectionPageJsonLd,
  createItemListJsonLd,
  createOrganizationJsonLd,
  createWebsiteJsonLd,
} from "@/lib/seo/json-ld";
import { HOME_DESCRIPTION } from "@/lib/seo/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const featuredCategories = categories.slice(0, 8);
const newGames = [...games]
  .sort(
    (firstGame, secondGame) =>
      new Date(secondGame.createdAt).getTime() -
      new Date(firstGame.createdAt).getTime(),
  )
  .slice(0, 3);
const featuredGame = games.find((game) => game.slug === "pixel-path") ?? games[0];

const homeVisibleGames = [featuredGame, ...newGames].filter(
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
                  Entra directo a una selección de juegos difíciles, frustrantes
                  y memorables. Sin descarga, sin cuenta y pensados para decir:
                  solo un intento más.
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
                  categorías principales
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

          <Link
            aria-label={`Jugar a ${featuredGame.title}`}
            className="group block rounded-[var(--radius-lg)] focus-ring"
            href={`/juegos/${featuredGame.slug}`}
          >
            <Card
              className="relative overflow-hidden p-6 transition group-hover:border-cyan-300/40 group-hover:bg-white/[0.08]"
              variant="glass"
            >
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
          </Link>
        </section>

        <section className="container-page space-y-6 py-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Explora por categoría
              </p>
              <h2 className="text-3xl font-black text-white">
                Elige tu tipo de frustración favorita
              </h2>
            </div>
            <Link
              className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
              href="/categorias"
            >
              Ver todas las categorías
            </Link>
          </div>

          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCategories.map((category) => (
              <Link
                className="group flex h-full min-h-32 flex-col rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 focus-ring"
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                <h3 className="text-base font-black text-white transition group-hover:text-cyan-100">
                  {category.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="container-page py-8">
          <AdSlot label="AdSlot placeholder - home banner" />
        </section>

        <section className="container-page space-y-6 py-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-3xl font-black text-white">
                Últimos juegos añadidos
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Las incorporaciones más recientes del catálogo real, listas
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
