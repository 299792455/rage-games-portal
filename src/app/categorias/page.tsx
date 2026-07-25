import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { JsonLd } from "@/components/seo/JsonLd";
import { AdSlot } from "@/components/ui";
import { categories } from "@/data";
import {
  createCollectionPageJsonLd,
  createItemListJsonLd,
} from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Categorías de juegos difíciles",
  description:
    "Explora categorías de juegos difíciles online gratis: juegos troll, juegos con trampas, plataformas difíciles, reflejos, precisión y retos para jugar en el navegador.",
  path: "/categorias",
});

const categoriesJsonLd = [
  createCollectionPageJsonLd({
    name: "Categorías de juegos difíciles",
    description:
      "Categorías editoriales de juegos difíciles online gratis para explorar retos por trampas, reflejos, plataformas, retry y speedrun.",
    path: "/categorias",
  }),
  createItemListJsonLd({
    name: "Categorías visibles de Juegos Difíciles",
    path: "/categorias",
    items: categories.map((category) => ({
      name: category.name,
      path: `/categorias/${category.slug}`,
    })),
  }),
];

export default function CategoriesPage() {
  return (
    <>
      <JsonLd data={categoriesJsonLd} />
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page py-12 lg:py-16">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
              Categorías de juegos difíciles
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Explora juegos imposibles, rage games, die & retry, plataformas
              hardcore y retos rápidos organizados por tipo de desafío.
            </p>
          </div>
        </section>

        <section className="container-page py-6">
          <AdSlot label="AdSlot placeholder - categorias" />
        </section>

        <section className="container-page grid auto-rows-fr gap-5 py-10 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <Link
              className="group flex h-full min-h-60 flex-col rounded-[var(--radius-lg)] border border-white/10 bg-slate-950/70 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)] focus-ring"
              href={`/categorias/${category.slug}`}
              key={category.slug}
            >
              <h2 className="text-2xl font-black text-white">
                {category.name}
              </h2>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">
                {category.description}
              </p>
              <span className="mt-6 text-sm font-bold text-cyan-100 transition group-hover:text-cyan-200">
                Ver categoría
              </span>
            </Link>
          ))}
        </section>

        <section className="container-page py-10">
          <div className="flex flex-col gap-6 border-t border-white/10 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-2">
              <h2 className="text-3xl font-black text-white">
                ¿No sabes por dónde empezar?
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Elige el tipo de reto que te apetece jugar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white focus-ring"
                href="/categorias/juegos-imposibles"
              >
                Quiero sufrir
              </Link>
              <Link
                className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white focus-ring"
                href="/categorias/reflejos"
              >
                Quiero mejorar mis reflejos
              </Link>
              <Link
                className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/35 hover:bg-cyan-300/10 hover:text-white focus-ring"
                href="/categorias/one-touch"
              >
                Quiero partidas rápidas
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
