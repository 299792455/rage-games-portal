import { Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { Card, GameCard } from "@/components/ui";
import { games } from "@/data";
import { createWebPageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Juegos populares",
  description:
    "Descubre juegos populares y recomendados de JuegosDificiles.com: plataformas imposibles, trampas ocultas, precisión, reflejos y mucho retry.",
  path: "/populares",
});

const popularGamesJsonLd = createWebPageJsonLd({
  name: "Juegos populares",
  description:
    "Selección editorial de juegos populares y recomendados de JuegosDificiles.com.",
  path: "/populares",
});

const recommendedGameSlugs = [
  "pixel-path",
  "rage-maze-troll-hardest-platformer",
  "geometry-vibes-monster",
  "snail-odyssey-hardest-game",
  "geometry-arrow",
];

const recommendedGames = recommendedGameSlugs
  .map((slug) => games.find((game) => game.slug === slug))
  .filter((game): game is (typeof games)[number] => Boolean(game));

export default function PopularGamesPage() {
  return (
    <>
      <JsonLd data={popularGamesJsonLd} />
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Populares
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Juegos populares
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Una selección de retos populares y recomendados para empezar
                fuerte: plataformas imposibles, trampas ocultas, precisión,
                reflejos y mucho retry.
              </p>
            </div>
          </div>

          <Card className="p-6 md:p-8" variant="glass">
            <div className="mb-6 max-w-3xl space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Top recomendado
              </p>
              <h2 className="text-3xl font-black text-white">
                5 juegos para poner a prueba tu paciencia
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Empieza por estos retos si quieres descubrir algunos de los
                juegos más intensos del portal.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {recommendedGames.map((game, index) => (
                <div className="relative" key={game.slug}>
                  <span className="absolute left-3 top-3 z-10 rounded-full border border-cyan-300/40 bg-slate-950/85 px-3 py-1 text-xs font-black text-cyan-100 shadow-[var(--glow-cyan)]">
                    #{index + 1}
                  </span>
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
