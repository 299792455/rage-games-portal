import { LocalBadgesPanel } from "@/components/features";
import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";
import { badges } from "@/data";

export default function BadgesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Badges locales
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Recompensas ligeras sin cuenta
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Explora badges de demostracion para retos dificiles. Los
                desbloqueos se guardan solo en este navegador y no se
                sincronizan.
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Demo local
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Se almacenan unicamente badgeSlug y unlockedAt. No hay userId,
                perfil, auth, MongoDB, analytics ni desbloqueo automatico.
              </p>
            </Card>
          </div>

          <LocalBadgesPanel badges={badges} />
        </section>
      </main>

      <Footer />
    </>
  );
}
