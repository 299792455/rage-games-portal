import { RecentlyPlayedGrid } from "@/components/features";
import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";
import { games } from "@/data";

export default function RecentlyPlayedPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Recientes
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Juegos que ya abriste en este navegador
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Vuelve rápido a los retos que acabas de probar. Este historial
                es local, limitado a 12 juegos y no usa cuenta de usuario.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Historial local
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Se guardan únicamente el slug del juego y la fecha local de la
                visita. No hay userId, email, perfil ni sincronización.
              </p>
            </Card>
          </div>

          <RecentlyPlayedGrid games={games} />
        </section>
      </main>

      <Footer />
    </>
  );
}
