import type { Metadata } from "next";
import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

const contactEmail = "juegosdificilesportal@gmail.com";
const contactHref = `mailto:${contactEmail}`;

export const metadata: Metadata = {
  title: "Condiciones de uso | JuegosDificiles.com",
  description:
    "Consulta las condiciones de uso de JuegosDificiles.com, el acceso a juegos integrados, contenidos de terceros, funcionalidades locales, publicidad y límites de responsabilidad.",
};

const sections = [
  {
    title: "Objeto del sitio",
    paragraphs: [
      "JuegosDificiles.com ofrece acceso gratuito a una selección de juegos difíciles online.",
      "El sitio funciona como una plataforma de descubrimiento, organización editorial y acceso desde navegador. Nuestro objetivo es organizar juegos que encajan con una línea clara: retos difíciles, juegos de precisión, plataformas hardcore, juegos de reflejos, rage games y experiencias de retry.",
      "JuegosDificiles.com no es una tienda, no vende juegos y no exige pago para acceder al catálogo disponible.",
    ],
  },
  {
    title: "Acceso al sitio",
    paragraphs: [
      "El acceso al sitio es libre.",
      "Intentamos que JuegosDificiles.com esté disponible de forma estable, pero no podemos garantizar que el sitio o todos sus juegos estén accesibles de manera permanente.",
      "Algunos juegos pueden no funcionar correctamente según el navegador, el dispositivo, la conexión, la configuración del usuario o las condiciones técnicas del proveedor externo.",
      "También puede ocurrir que un juego deje de estar disponible, cambie su comportamiento o sea retirado por su plataforma de origen.",
    ],
  },
  {
    title: "Juegos integrados y contenidos de terceros",
    paragraphs: [
      "JuegosDificiles.com puede integrar juegos proporcionados por plataformas externas, como GamePix, OnlineGames.io, TwoPlayerGames u otros proveedores.",
      "Los juegos integrados pertenecen a sus respectivos creadores, estudios, editores, titulares de derechos o plataformas de distribución.",
      "JuegosDificiles.com no reclama la propiedad de los juegos de terceros integrados en el sitio.",
      "Cuando un juego se carga mediante iframe, embed u otra tecnología externa, su disponibilidad y funcionamiento pueden depender del proveedor correspondiente.",
      "Los contenidos integrados pueden estar sujetos a condiciones, políticas o reglas propias de esos terceros.",
    ],
  },
  {
    title: "Uso permitido",
    paragraphs: [
      "Puedes utilizar JuegosDificiles.com para navegar por el catálogo, abrir páginas de juegos, jugar desde el navegador y utilizar las funciones disponibles del sitio.",
      "El uso debe ser personal, normal y no abusivo.",
      "No está permitido utilizar el sitio para realizar ataques, intentos de intrusión, scraping abusivo, extracción automatizada masiva, sobrecarga del servicio, manipulación técnica, uso fraudulento, elusión de medidas de seguridad o cualquier comportamiento que pueda perjudicar el funcionamiento del sitio o de terceros.",
      "Tampoco está permitido utilizar el sitio para interferir con juegos integrados, proveedores externos o sistemas técnicos asociados.",
    ],
  },
  {
    title: "Datos locales y funcionalidades del sitio",
    paragraphs: [
      "JuegosDificiles.com puede ofrecer funciones locales en el navegador, como favoritos, juegos recientes, continuar jugando, scores locales o badges locales.",
      "Estas funciones pueden guardar información en el propio navegador del usuario.",
      "Si el usuario borra los datos del navegador, cambia de dispositivo o utiliza otro navegador, esas preferencias o datos locales pueden perderse.",
      "Los scores locales, badges locales u otras funciones guardadas en el navegador no constituyen rankings globales oficiales ni resultados verificados frente a otros jugadores.",
    ],
  },
  {
    title: "Futuras cuentas, perfiles o clasificaciones",
    paragraphs: [
      "Actualmente el sitio no ofrece cuentas de usuario, perfiles personales ni sistema de autenticación.",
      "Si se añaden cuentas, perfiles, rankings globales, sistemas de puntuación online u otras funciones similares, podrán aplicarse reglas específicas adicionales.",
      "Esas reglas podrán explicar cómo se usan esas funciones, qué datos se tratan, qué comportamientos están permitidos y qué limitaciones existen.",
    ],
  },
  {
    title: "Publicidad y servicios de terceros",
    paragraphs: [
      "JuegosDificiles.com puede mostrar publicidad en determinadas zonas del sitio.",
      "Algunos servicios externos, proveedores de juegos, herramientas técnicas o socios publicitarios pueden aplicar sus propias condiciones, políticas de privacidad o políticas de cookies.",
      "El uso de contenidos o servicios de terceros puede estar sujeto a esas condiciones externas.",
    ],
  },
  {
    title: "Responsabilidad y disponibilidad",
    paragraphs: [
      "JuegosDificiles.com hace esfuerzos razonables para mantener el sitio accesible, organizado y funcional.",
      "Sin embargo, el sitio puede evolucionar, cambiar su diseño, modificar sus funciones, actualizar categorías, cambiar el catálogo o retirar juegos cuando sea necesario.",
      "Algunos juegos pueden ser modificados, retirados o quedar temporalmente indisponibles por decisión de sus proveedores o por razones técnicas ajenas a JuegosDificiles.com.",
      "No garantizamos que todos los juegos estén siempre disponibles ni que funcionen igual en todos los navegadores o dispositivos.",
    ],
  },
];

const relatedLinks = [
  {
    href: "/privacidad",
    label: "Política de privacidad",
    description: "Información sobre el tratamiento de datos personales.",
  },
  {
    href: "/cookies",
    label: "Política de cookies",
    description: "Información sobre cookies y tecnologías similares.",
  },
  {
    href: "/contacto",
    label: "Contacto",
    description: "Canal para consultas relacionadas con el sitio.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_340px] lg:items-end lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Condiciones
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Condiciones de uso
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Estas condiciones regulan el uso de JuegosDificiles.com, un
                sitio gratuito dedicado a reunir juegos difíciles online, rage
                games, juegos de habilidad y retos para jugar directamente desde
                el navegador.
              </p>
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Última actualización: 16 de junio de 2026
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Al acceder y utilizar el sitio, aceptas hacer un uso normal,
              personal y respetuoso de la plataforma.
            </p>
          </Card>
        </section>

        <section className="container-page pb-16">
          <div className="mx-auto max-w-4xl space-y-6">
            {sections.map((section) => (
              <Card className="p-6 md:p-8" key={section.title} variant="panel">
                <ArticleSection section={section} />
              </Card>
            ))}

            <Card className="p-6 md:p-8" variant="glass">
              <section className="space-y-5">
                <h2 className="text-3xl font-black text-white">
                  Relación con otras páginas
                </h2>
                <p className="text-base leading-8 text-slate-300">
                  Estas condiciones se complementan con otras páginas
                  informativas del sitio.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  {relatedLinks.map((link) => (
                    <Link
                      className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-ring"
                      href={link.href}
                      key={link.href}
                    >
                      <span className="block text-sm font-black text-white">
                        {link.label}
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-slate-400">
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </Card>

            <Card className="p-6 text-center md:p-8" variant="glass">
              <div className="mx-auto max-w-2xl space-y-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Condiciones de uso
                </p>
                <h2 className="text-3xl font-black text-white">
                  Consultas sobre estas condiciones
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  Para cualquier consulta relacionada con estas condiciones de
                  uso, puedes escribirnos por email.
                </p>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                  href={contactHref}
                >
                  {contactEmail}
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

function ArticleSection({
  section,
}: {
  section: {
    title: string;
    paragraphs: string[];
  };
}) {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-black text-white">{section.title}</h2>
      <div className="space-y-5 text-base leading-8 text-slate-300">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
