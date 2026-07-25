import Link from "next/link";

import { Footer, Header } from "@/components/layout";

const helpArticles = [
  {
    title: "Cómo jugar",
    slug: "como-jugar",
    description: "Empieza a jugar gratis desde el navegador, sin descarga.",
  },
  {
    title: "Favoritos",
    slug: "favoritos",
    description: "Guarda juegos localmente para volver a ellos más rápido.",
  },
  {
    title: "El juego no carga",
    slug: "el-juego-no-carga",
    description: "Revisa qué hacer si un juego integrado no abre.",
  },
  {
    title: "Jugar en móvil",
    slug: "jugar-en-movil",
    description: "Entiende cuándo un juego es mobile OK o desktop recomendado.",
  },
  {
    title: "Controles",
    slug: "controles",
    description: "Conoce los tipos de control indicados en cada juego.",
  },
  {
    title: "Dificultad",
    slug: "dificultad",
    description: "Interpreta dificultad, rage level y retos de retry.",
  },
  {
    title: "Privacidad",
    slug: "privacidad",
    description: "Resumen de datos locales antes de las páginas legales.",
  },
  {
    title: "Reportar un juego",
    slug: "reportar-un-juego",
    description: "Qué preparar si un juego tiene un problema.",
  },
  {
    title: "Contacto",
    slug: "contacto",
    description: "Cómo se gestionará el contacto en esta V1.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Centro de ayuda
            </p>
            <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
              Ayuda rápida para jugar
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Respuestas claras sobre los juegos, los favoritos locales, los
              controles, la dificultad y el uso del portal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {helpArticles.map((article) => (
              <Link
                className="block rounded-[var(--radius-lg)] border border-white/10 bg-slate-950/60 p-5 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 focus-ring"
                href={`/ayuda/${article.slug}`}
                key={article.slug}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-200">
                  Ayuda
                </p>
                <h2 className="mt-2 text-xl font-black text-white">
                  {article.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
