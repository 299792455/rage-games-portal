import { Footer, Header } from "@/components/layout";
import { AdSlot, Card, CategoryChip, DifficultyBadge } from "@/components/ui";
import { categories, games } from "@/data";
import type { DifficultyLevel } from "@/types";

const categorySummaries = categories.map((category) => {
  const categoryGames = games.filter((game) => game.category === category.slug);
  const highestDifficulty = categoryGames.reduce<DifficultyLevel>(
    (highestLevel, game) =>
      game.difficultyLevel > highestLevel ? game.difficultyLevel : highestLevel,
    1,
  );
  const averageRage =
    categoryGames.reduce((total, game) => total + game.rageLevel, 0) /
    categoryGames.length;

  return {
    category,
    gameCount: categoryGames.length,
    highestDifficulty,
    averageRage,
    popularGames: [...categoryGames]
      .sort((firstGame, secondGame) => secondGame.playCount - firstGame.playCount)
      .slice(0, 2),
  };
});

export default function CategoriesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Categorias curadas
              </p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-6xl">
                  Categorias de juegos dificiles
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Explora juegos imposibles, rage games, die & retry,
                  plataformas hardcore y retos rapidos organizados por criterio
                  editorial, no por una categoria generica de provider.
                </p>
              </div>
            </div>

            <Card className="p-6" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Catalogo placeholder
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-4xl font-black text-white">
                    {categories.length}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    categorias principales
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-white">
                    {games.length}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    juegos ficticios
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <CategoryChip
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                {category.name}
              </CategoryChip>
            ))}
          </div>
        </section>

        <section className="container-page py-6">
          <AdSlot label="AdSlot placeholder - categorias" />
        </section>

        <section className="container-page grid gap-5 py-10 md:grid-cols-2 xl:grid-cols-4">
          {categorySummaries.map(
            ({ category, gameCount, highestDifficulty, averageRage, popularGames }) => (
              <a
                className="group rounded-[var(--radius-lg)] border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] focus-ring"
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
                      {category.icon}
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-white">
                      {category.name}
                    </h2>
                  </div>
                  <DifficultyBadge level={highestDifficulty} />
                </div>

                <p className="mt-4 min-h-18 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xl font-black text-white">{gameCount}</p>
                    <p className="text-xs text-slate-500">juegos</p>
                  </div>
                  <div>
                    <p className="text-xl font-black text-white">
                      {averageRage.toFixed(1)}
                    </p>
                    <p className="text-xs text-slate-500">rage medio</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {popularGames.map((game) => (
                    <p
                      className="line-clamp-1 text-xs font-semibold text-slate-300"
                      key={game.slug}
                    >
                      {game.title}
                    </p>
                  ))}
                </div>
              </a>
            ),
          )}
        </section>

        <section className="container-page grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6" variant="glass">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Top categorias
              </p>
              <h2 className="text-3xl font-black text-white">
                La dificultad como mapa del catalogo
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Cada categoria agrupa juegos por tipo de desafio: precision,
                trampas ocultas, retry rapido, reflejos o rutas speedrun.
              </p>
            </div>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {categorySummaries.slice(0, 6).map(({ category, gameCount }) => (
              <a
                className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-violet-300/35 hover:bg-violet-400/10 focus-ring"
                href={`/categorias/${category.slug}`}
                key={category.slug}
              >
                <p className="text-sm font-bold text-white">{category.name}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                  {category.description}
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                  {gameCount} juegos placeholder
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="container-page py-10">
          <Card className="p-6" variant="panel">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-200">
                Criterio editorial
              </p>
              <h2 className="text-3xl font-black text-white">
                Una seleccion pensada para juegos dificiles
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                La organizacion del portal prioriza dificultad, rage level,
                controles, compatibilidad movil y tipo de reto. Las categorias
                estan preparadas para recibir juegos reales de providers cuando
                esa fase sea validada, sin perder la curation interna de la
                niche.
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
