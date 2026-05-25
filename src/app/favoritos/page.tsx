import { Footer, Header } from "@/components/layout";
import { FavoritesGrid } from "@/components/features";
import { Card } from "@/components/ui";
import { games } from "@/data";

export default function FavoritesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Favoritos locales
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Tus retos guardados en este navegador
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Guarda juegos dificiles para volver a intentarlo despues. Esta
                lista vive solo en tu dispositivo: sin cuenta, sin perfil y sin
                sincronizacion.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Privado por defecto
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Los favoritos usan localStorage y almacenan unicamente slugs de
                juegos. No se guarda userId, email ni dato de cuenta.
              </p>
            </Card>
          </div>

          <FavoritesGrid games={games} />
        </section>
      </main>

      <Footer />
    </>
  );
}
