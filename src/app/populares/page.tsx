import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Juegos populares",
  description:
    "Consulta la actividad local de juegos jugados en este navegador y explora juegos difíciles online gratis sin descargar, sin mostrar popularidad global inventada.",
  path: "/populares",
});

export default function PopularGamesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Actividad local
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Juegos populares
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Esta pagina no muestra popularidad global ni utiliza datos de
                otros jugadores.
              </p>
            </div>
          </div>

          <Card className="p-8 text-center" variant="glass">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Sin datos suficientes
              </p>
              <h2 className="text-3xl font-black text-white">
                Todavia no hay juegos populares en este navegador
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Juega a algunos titulos para ver tus mas jugados aqui.
              </p>
              <p className="text-xs leading-5 text-slate-500">
                El portal no publica por ahora un ranking global de popularidad.
              </p>
              <Link
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                href="/juegos"
              >
                Explorar juegos
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
