import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

export default function BadgesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Progreso del jugador
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Mis logros
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Esta sección formará parte del progreso del jugador en una
                próxima actualización. Por ahora, los logros no están
                conectados a una cuenta ni a un sistema global.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Próxima actualización
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Queremos ampliar esta sección con cuentas, progreso automático,
                logros desbloqueables y rankings globales, sin prometer una
                fecha concreta.
              </p>
            </Card>
          </div>

          <Card className="p-6" variant="panel">
            <div className="space-y-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Todavía no hay logros activos
              </p>
              <h2 className="text-3xl font-black text-white">
                Sigue jugando mientras preparamos el sistema
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Los favoritos, recientes y progreso local siguen funcionando en
                este navegador. Los logros públicos y sincronizados llegarán
                cuando exista una base técnica adecuada para cuentas y progreso
                persistente.
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
