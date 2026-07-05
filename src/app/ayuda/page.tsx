import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

const helpArticles = [
  {
    title: "Como jugar",
    slug: "como-jugar",
    description: "Empieza a jugar gratis desde el navegador, sin descarga.",
  },
  {
    title: "Favoritos",
    slug: "favoritos",
    description: "Guarda juegos localmente para volver a ellos mas rapido.",
  },
  {
    title: "El juego no carga",
    slug: "el-juego-no-carga",
    description: "Revisa que hacer si un juego integrado no abre.",
  },
  {
    title: "Jugar en movil",
    slug: "jugar-en-movil",
    description: "Entiende cuando un juego es mobile OK o desktop recomendado.",
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
    title: "Clasificaciones",
    slug: "clasificaciones",
    description: "Consulta el estado actual de las clasificaciones globales.",
  },
  {
    title: "Badges",
    slug: "badges",
    description: "Consulta como funcionan los badges locales y objetivos personales.",
  },
  {
    title: "Anuncios",
    slug: "anuncios",
    description: "Entiende los espacios publicitarios preparados y desactivados por defecto.",
  },
  {
    title: "Privacidad",
    slug: "privacidad",
    description: "Resumen de datos locales antes de las paginas legales.",
  },
  {
    title: "Reportar un juego",
    slug: "reportar-un-juego",
    description: "Que preparar si un juego tiene un problema.",
  },
  {
    title: "Contacto",
    slug: "contacto",
    description: "Como se gestionara el contacto en esta V1.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Centro de ayuda
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Ayuda rapida para jugar sin cuenta
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Respuestas cortas sobre juegos dificiles, favoritos locales,
                clasificaciones en preparacion, badges y controles. Todo
                pensado para la V1 sin registro.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                V1 sin cuenta
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                No hay login, perfil, sincronizacion ni pagina de cuenta. Los
                datos de progreso disponibles son locales del navegador.
              </p>
            </Card>
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

          <Card className="p-6" variant="panel">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-200">
                Limites actuales
              </p>
              <h2 className="text-3xl font-black text-white">
                Funciones todavia limitadas
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Los juegos reales ya estan disponibles. Las clasificaciones
                globales y los anuncios reales siguen desactivados. El Help
                Center no envia datos ni incluye formularios funcionales.
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
