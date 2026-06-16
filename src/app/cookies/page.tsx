import type { Metadata } from "next";
import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

const contactEmail = "juegosdificiles@gmail.com";
const contactHref = `mailto:${contactEmail}`;

export const metadata: Metadata = {
  title: "Política de cookies | JuegosDificiles.com",
  description:
    "Consulta la política de cookies de JuegosDificiles.com y cómo se utilizan cookies, almacenamiento local, juegos integrados, analytics, publicidad y tecnologías similares.",
};

const sections = [
  {
    title: "Qué son las cookies y tecnologías similares",
    paragraphs: [
      "Las cookies son pequeños archivos o identificadores que un sitio web puede almacenar en el navegador del usuario.",
      "También pueden existir tecnologías similares, como almacenamiento local, almacenamiento de sesión, identificadores técnicos, píxeles, SDKs, iframes o mecanismos propios de servicios externos.",
      "Estas tecnologías pueden servir para que un sitio funcione correctamente, recordar preferencias, medir el uso de las páginas, cargar contenidos externos o mostrar publicidad.",
    ],
  },
  {
    title: "Cookies necesarias o técnicas",
    paragraphs: [
      "JuegosDificiles.com puede utilizar cookies o tecnologías técnicas necesarias para permitir el funcionamiento básico del sitio.",
      "Estas tecnologías pueden ser necesarias para cargar páginas, mantener preferencias esenciales, mejorar la seguridad, recordar ajustes técnicos o permitir que determinadas funciones se comporten correctamente.",
      "Este tipo de almacenamiento no debe confundirse con cookies publicitarias o de medición avanzada.",
    ],
  },
  {
    title: "Almacenamiento local del navegador",
    paragraphs: [
      "Algunas funciones del sitio pueden utilizar almacenamiento local del navegador.",
      "Esto puede incluir favoritos, juegos recientes, continuar jugando, scores locales o badges locales.",
      "Estos datos se guardan en el propio navegador del usuario y permiten que ciertas funciones funcionen sin necesidad de crear una cuenta.",
      "El usuario puede borrar estos datos desde la configuración de su navegador o limpiando los datos del sitio.",
    ],
  },
  {
    title: "Juegos integrados y cookies de terceros",
    paragraphs: [
      "JuegosDificiles.com puede integrar juegos mediante iframes, enlaces embed u otras tecnologías proporcionadas por plataformas externas.",
      "Entre los proveedores actualmente presentes o previstos pueden encontrarse GamePix, OnlineGames.io y TwoPlayerGames.",
      "Cuando se carga un juego integrado, el proveedor externo puede utilizar sus propias cookies, almacenamiento local, identificadores técnicos u otras tecnologías similares.",
      "Estas tecnologías pueden depender del propio proveedor, del navegador, del dispositivo, de la configuración del usuario y de las políticas aplicables al servicio externo.",
      "JuegosDificiles.com no controla por completo las cookies o tecnologías que puedan utilizar los proveedores externos dentro de sus propios contenidos integrados.",
      "Recomendamos revisar las políticas de cookies y privacidad de cada proveedor cuando interactúes con sus juegos.",
    ],
  },
  {
    title: "Analytics",
    paragraphs: [
      "JuegosDificiles.com puede utilizar una herramienta de analytics, como Umami u otra solución equivalente, para comprender el uso global del sitio.",
      "El analytics puede ayudar a conocer qué páginas se visitan, qué juegos reciben más atención, cómo navegan los usuarios y si existen problemas técnicos.",
      "La configuración concreta de analytics podrá variar según la solución técnica utilizada por el sitio.",
      "Cuando sea necesario, el uso de analytics se gestionará de acuerdo con las preferencias de consentimiento disponibles en el sitio.",
    ],
  },
  {
    title: "Publicidad",
    paragraphs: [
      "JuegosDificiles.com puede mostrar publicidad en determinadas zonas del sitio.",
      "Cuando la publicidad esté activa, algunos socios publicitarios pueden utilizar cookies, identificadores o tecnologías similares para mostrar anuncios, limitar su repetición, medir impresiones, detectar interacciones o analizar el rendimiento de campañas.",
      "La presencia de publicidad puede implicar tecnologías propias de terceros. Estas tecnologías estarán sujetas a la configuración de consentimiento aplicable y a las políticas de los socios correspondientes.",
    ],
  },
  {
    title: "Gestión del consentimiento",
    paragraphs: [
      "El sitio ofrece o podrá ofrecer mecanismos visibles para aceptar, rechazar o configurar las preferencias de cookies cuando resulte necesario.",
      "Estos mecanismos pueden permitir gestionar determinadas categorías de cookies y tecnologías similares.",
      "Algunas tecnologías pueden ser necesarias para el funcionamiento básico del sitio, mientras que otras pueden depender del consentimiento del usuario.",
      "Ciertas preferencias pueden guardarse localmente en el navegador para recordar la elección del usuario.",
    ],
  },
  {
    title: "Cómo cambiar o retirar el consentimiento",
    paragraphs: [
      "El usuario podrá cambiar o retirar sus preferencias mediante el mecanismo habilitado en el sitio o desde la configuración de su navegador.",
      "Además, el usuario puede gestionar o eliminar cookies y datos locales desde la configuración de su navegador.",
      "Cada navegador ofrece opciones distintas para borrar cookies, bloquear cookies de terceros, limpiar datos de sitios web o gestionar almacenamiento local.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_340px] lg:items-end lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Cookies
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Política de cookies
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Esta política explica cómo JuegosDificiles.com puede utilizar
                cookies, almacenamiento local y tecnologías similares cuando
                visitas el sitio, navegas por el catálogo o juegas a títulos
                integrados en el navegador.
              </p>
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Última actualización: 16 de junio de 2026
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Esta página resume las tecnologías que pueden intervenir en el
              funcionamiento del sitio, los juegos integrados, analytics,
              publicidad y preferencias del navegador.
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
                  Relación con la política de privacidad
                </h2>
                <div className="space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    Esta política de cookies complementa la política de
                    privacidad de JuegosDificiles.com.
                  </p>
                  <p>
                    La política de privacidad explica de forma general qué datos
                    pueden tratarse, con qué finalidades y cómo contactar para
                    consultas relacionadas con privacidad.
                  </p>
                  <p>
                    Puedes consultar la política de privacidad en{" "}
                    <Link
                      className="font-bold text-cyan-100 transition hover:text-cyan-200 focus-ring"
                      href="/privacidad"
                    >
                      /privacidad
                    </Link>
                    .
                  </p>
                </div>
              </section>
            </Card>

            <Card className="p-6 text-center md:p-8" variant="glass">
              <div className="mx-auto max-w-2xl space-y-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Contacto
                </p>
                <h2 className="text-3xl font-black text-white">
                  Consultas sobre cookies
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  Para cualquier consulta relacionada con esta política de
                  cookies, puedes escribirnos por email.
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
