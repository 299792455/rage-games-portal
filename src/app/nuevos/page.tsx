import { Footer, Header } from "@/components/layout";
import { Card, GameCard } from "@/components/ui";
import { games } from "@/data";

const newestGames = games
  .map((game, index) => ({ game, index }))
  .sort((firstEntry, secondEntry) => {
    const updatedAtDifference =
      new Date(secondEntry.game.updatedAt).getTime() -
      new Date(firstEntry.game.updatedAt).getTime();

    if (updatedAtDifference !== 0) {
      return updatedAtDifference;
    }

    const createdAtDifference =
      new Date(secondEntry.game.createdAt).getTime() -
      new Date(firstEntry.game.createdAt).getTime();

    return createdAtDifference !== 0
      ? createdAtDifference
      : firstEntry.index - secondEntry.index;
  })
  .map(({ game }) => game);

export default function NewGamesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                Novedades del catalogo
              </p>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-6xl">
                  Juegos nuevos
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Descubre los ultimos juegos dificiles, retos de reflejos y
                  plataformas de retry incorporados al catalogo.
                </p>
              </div>
            </div>

            <Card className="p-6" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Catalogo actual
              </p>
              <p className="mt-3 text-4xl font-black text-white">
                {newestGames.length}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                juegos disponibles en el navegador
              </p>
            </Card>
          </div>
        </section>

        <section className="container-page pb-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {newestGames.map((game) => (
              <GameCard game={game} key={game.slug} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
