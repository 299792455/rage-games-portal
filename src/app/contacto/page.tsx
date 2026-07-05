import type { Metadata } from "next";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

const contactEmail = "juegosdificilesportal@gmail.com";
const contactHref = `mailto:${contactEmail}`;

export const metadata: Metadata = {
  title: "Contacto | JuegosDificiles.com",
  description:
    "Contacta con JuegosDificiles.com para reportar problemas con juegos, sugerir nuevos retos o enviar propuestas relacionadas con el sitio.",
};

const contactSections = [
  {
    title: "Reportar un problema",
    paragraphs: [
      "Si un juego no carga, funciona mal o muestra un comportamiento extraño, envíanos el nombre del juego y una breve descripción del problema.",
      "También ayuda incluir el dispositivo, el navegador y qué estabas intentando hacer cuando apareció el fallo.",
    ],
  },
  {
    title: "Sugerir un juego",
    paragraphs: [
      "Si conoces un juego difícil, rage game, juego de habilidad, plataformas hardcore o reto de reflejos que encaja con JuegosDificiles.com, puedes enviarnos la sugerencia.",
      "Revisaremos si encaja con la línea editorial del catálogo antes de añadirlo.",
    ],
  },
  {
    title: "Colaboraciones",
    paragraphs: [
      "Para propuestas relacionadas con contenidos, integraciones, proveedores de juegos o colaboraciones, puedes escribirnos indicando el motivo del contacto y la información principal de la propuesta.",
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_340px] lg:items-end lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Contacto
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Contacto
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                ¿Tienes una pregunta, has encontrado un problema o quieres
                sugerir un juego difícil para el catálogo? Puedes contactar con
                JuegosDificiles.com por email.
              </p>
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Email de contacto
            </p>
            <a
              className="mt-4 block break-words text-2xl font-black text-white transition hover:text-cyan-100 focus-ring"
              href={contactHref}
            >
              {contactEmail}
            </a>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Intentaremos revisar los mensajes relacionados con errores, juegos
              que no cargan, sugerencias de nuevos retos, contenidos del sitio o
              posibles colaboraciones.
            </p>
          </Card>
        </section>

        <section className="container-page pb-16">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="grid gap-5 lg:grid-cols-3">
              {contactSections.map((section) => (
                <Card className="p-6" key={section.title} variant="panel">
                  <h2 className="text-2xl font-black text-white">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-6 text-slate-400">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 md:p-8" variant="glass">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-white">
                    Formulario de contacto
                  </h2>
                  <p className="text-sm leading-6 text-slate-400">
                    Por ahora no hay formulario activo en el sitio. El contacto
                    se realiza únicamente por email.
                  </p>
                </div>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                  href={contactHref}
                >
                  Escribir por email
                </a>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
