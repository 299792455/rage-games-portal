import { Footer, Header } from "@/components/layout";
import { FavoritesGrid } from "@/components/features";
import { games } from "@/data";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...createPageMetadata({
    title: "Favoritos",
    description:
      "Consulta los juegos difíciles guardados como favoritos en este navegador, sin cuenta ni sincronización entre dispositivos.",
    path: "/favoritos",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function FavoritesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
              Favoritos locales
            </p>
            <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
              Tus retos guardados en este navegador
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Guarda juegos difíciles para volver a intentarlo después. Esta
              lista vive solo en tu dispositivo: sin cuenta, sin perfil y sin
              sincronización.
            </p>
          </div>

          <FavoritesGrid games={games} />
        </section>
      </main>

      <Footer />
    </>
  );
}
