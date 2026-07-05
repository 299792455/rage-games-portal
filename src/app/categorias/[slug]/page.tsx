import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  AdSlot,
  Card,
  CategoryChip,
  DifficultyBadge,
  GameCard,
} from "@/components/ui";
import { categories, games } from "@/data";
import {
  createCategoryMetadata,
  createMissingCategoryMetadata,
} from "@/lib/seo/metadata";
import {
  createBreadcrumbListJsonLd,
  createCollectionPageJsonLd,
  createItemListJsonLd,
} from "@/lib/seo/json-ld";
import type { DifficultyLevel } from "@/types";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const sortLabels = ["Popularidad", "Novedad", "Nota", "Dificultad"];
const difficultyFilters = ["Difícil", "Extremo", "Imposible"];
const deviceFilters = ["Mobile OK", "Desktop recomendado"];
const inputFilters = ["Teclado", "Mouse", "Tactil", "One touch"];

const editorialNotes: Record<string, string> = {
  "juegos-imposibles":
    "Los juegos imposibles concentran saltos de precisión, trampas duras y rutas con margen mínimo. Son retos para repetir mucho, leer cada detalle y celebrar pequeños avances.",
  "rage-games":
    "Los rage games buscan tensión, caídas largas y errores memorables. La clave está en volver a intentarlo sin que la frustración rompa el ritmo de juego.",
  "die-and-retry":
    "Los juegos die & retry enseñan sus reglas a base de fallos. Cada intento revela un patrón, una trampa o una decisión mejor para avanzar.",
  "plataformas-hardcore":
    "Las plataformas hardcore dependen del timing, el control y la precisión constante. Un salto tarde o un aterrizaje corto pueden reiniciar toda la ruta.",
  "juegos-con-trampas":
    "Los juegos con trampas mezclan reglas falsas, sorpresas ocultas y memoria. No basta con reaccionar: hay que aprender dónde el escenario miente.",
  "one-touch":
    "Los retos one touch reducen los controles al mínimo y suben la presión. Cada toque importa, especialmente en partidas cortas y rápidas.",
  reflejos:
    "Los juegos de reflejos exigen lectura inmediata de patrones, obstáculos veloces y decisiones en segundos. Ideales para retos breves pero intensos.",
  speedrun:
    "Los juegos speedrun premian repetir, optimizar rutas y bajar tiempos. El objetivo no es solo llegar: es llegar mejor, más rápido y con menos errores.",
};

export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find(
    (currentCategory) => currentCategory.slug === slug,
  );

  if (!category) {
    return createMissingCategoryMetadata(slug);
  }

  const categoryGames = games.filter((game) => game.category === category.slug);

  return createCategoryMetadata(category, categoryGames.length);
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find(
    (currentCategory) => currentCategory.slug === slug,
  );

  if (!category) {
    notFound();
  }

  const categoryGames = games.filter((game) => game.category === category.slug);
  const featuredGames = categoryGames.slice(0, 4);
  const relatedCategories = categories
    .filter((currentCategory) => currentCategory.slug !== category.slug)
    .slice(0, 4);
  const mobileCount = categoryGames.filter((game) => game.isMobileFriendly).length;
  const desktopCount = categoryGames.filter(
    (game) => game.isDesktopRecommended,
  ).length;
  const trapCount = categoryGames.filter((game) => game.hasHiddenTraps).length;
  const speedrunCount = categoryGames.filter(
    (game) => game.speedrunFriendly,
  ).length;
  const maxDifficulty = categoryGames.reduce<DifficultyLevel>(
    (highestLevel, game) =>
      game.difficultyLevel > highestLevel ? game.difficultyLevel : highestLevel,
    1,
  );
  const categoryJsonLd = [
    createCollectionPageJsonLd({
      name: category.name,
      description: category.description,
      path: `/categorias/${category.slug}`,
    }),
    createItemListJsonLd({
      name: `Juegos en ${category.name}`,
      path: `/categorias/${category.slug}`,
      items: categoryGames.map((game) => ({
        name: game.title,
        path: `/juegos/${game.slug}`,
      })),
    }),
    createBreadcrumbListJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Categorías", path: "/categorias" },
      { name: category.name, path: `/categorias/${category.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={categoryJsonLd} />
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <Link
                className="text-sm font-bold text-cyan-100 hover:text-cyan-200 focus-ring"
                href="/categorias"
              >
                Todas las categorías
              </Link>
              <div className="space-y-4">
                <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                  {category.icon}
                </p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-6xl">
                  {category.name}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  {category.description}
                </p>
              </div>
            </div>

            <Card className="p-6" variant="glass">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-black text-white">
                    {categoryGames.length}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    juegos disponibles
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white">{mobileCount}</p>
                  <p className="mt-1 text-sm text-slate-400">mobile OK</p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white">
                    {desktopCount}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    desktop recomendado
                  </p>
                </div>
                <div>
                  <DifficultyBadge level={maxDifficulty} />
                  <p className="mt-3 text-sm text-slate-400">
                    dificultad maxima
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="container-page grid gap-5 py-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <Card className="p-5" variant="panel">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Filtros
              </p>

              <div className="mt-5 space-y-5">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Dificultad
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {difficultyFilters.map((filter) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                        key={filter}
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Dispositivo
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {deviceFilters.map((filter) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                        key={filter}
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Controles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {inputFilters.map((filter) => (
                      <span
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                        key={filter}
                      >
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-slate-500">
                Filtros visuales preparados para la etapa de búsqueda y filtros.
              </p>
            </Card>

            <AdSlot label="AdSlot placeholder - categoria" type="block" />
          </aside>

          <div className="space-y-8">
            <Card className="p-5" variant="panel">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold text-white">
                    {categoryGames.length} juegos en {category.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Trampas: {trapCount} · Speedrun friendly: {speedrunCount}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sortLabels.map((label) => (
                    <span
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300"
                      key={label}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {categoryGames.map((game) => (
                <GameCard game={game} key={game.slug} />
              ))}
            </div>
          </div>
        </section>

        <section className="container-page space-y-6 py-10">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-3xl font-black text-white">
              Destacados en {category.name}
            </h2>
            <p className="text-sm leading-6 text-slate-400">
              Una selección de juegos disponibles dentro de esta categoría.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </section>

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-6" variant="glass">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Guía de categoría
              </p>
              <h2 className="text-3xl font-black text-white">
                Cómo jugar {category.name.toLowerCase()}
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                {editorialNotes[category.slug]}
              </p>
              <p className="text-sm leading-6 text-slate-400">
                Todos los juegos de esta página forman parte del catálogo real
                integrado. La selección mantiene criterios editoriales de
                dificultad, controles, trampas y ritmo de retry.
              </p>
            </div>
          </Card>

          <Card className="p-6" variant="panel">
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Categorías cercanas
              </p>
              <div className="flex flex-wrap gap-3">
                {relatedCategories.map((relatedCategory) => (
                  <CategoryChip
                    href={`/categorias/${relatedCategory.slug}`}
                    key={relatedCategory.slug}
                  >
                    {relatedCategory.name}
                  </CategoryChip>
                ))}
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
