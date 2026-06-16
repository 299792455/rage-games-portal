import type { Metadata } from "next";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

const contactEmail = "juegosdificiles@gmail.com";
const contactHref = `mailto:${contactEmail}`;

export const metadata: Metadata = {
  title: "Política de privacidad | JuegosDificiles.com",
  description:
    "Consulta la política de privacidad de JuegosDificiles.com y cómo se tratan los datos relacionados con el contacto, la navegación, los juegos integrados, analytics, publicidad y cookies.",
};

const dataTypes = [
  "Datos enviados voluntariamente por email, como la dirección de correo, el contenido del mensaje y la información incluida por el usuario.",
  "Datos técnicos de navegación, como información del navegador, dispositivo, sistema operativo, páginas visitadas, fecha y hora de acceso, errores técnicos, dirección IP u otros datos necesarios para mantener el sitio.",
  "Datos relacionados con el uso del sitio, como páginas consultadas, juegos visitados o interacción con funciones disponibles.",
  "Datos relacionados con juegos integrados mediante proveedores externos, cuando el contenido se carga a través de iframes, enlaces embed u otras tecnologías similares.",
  "Datos analíticos agregados o técnicos para comprender el uso general del sitio y mejorar la experiencia.",
  "Datos publicitarios cuando la publicidad esté activa en el sitio.",
];

const purposes = [
  "Responder a mensajes recibidos por email.",
  "Revisar problemas comunicados por usuarios.",
  "Mantener, proteger y mejorar el sitio.",
  "Detectar errores técnicos o problemas de carga.",
  "Mejorar la navegación y la experiencia de usuario.",
  "Organizar y presentar mejor el catálogo de juegos.",
  "Medir el uso general de páginas y contenidos.",
  "Analizar el rendimiento del sitio.",
  "Mostrar o medir publicidad cuando esté activa en el sitio.",
  "Gestionar preferencias de cookies y consentimiento cuando corresponda.",
];

const sections = [
  {
    title: "Juegos integrados y servicios de terceros",
    paragraphs: [
      "JuegosDificiles.com puede integrar juegos de terceros mediante iframes, enlaces embed u otras tecnologías proporcionadas por plataformas externas.",
      "Entre los proveedores actualmente presentes o previstos pueden encontrarse GamePix, OnlineGames.io y TwoPlayerGames.",
      "Cuando interactúas con un juego integrado, es posible que el proveedor del juego reciba o trate datos técnicos relacionados con la carga del juego, el dispositivo, el navegador o la interacción con el contenido integrado.",
      "JuegosDificiles.com no controla por completo los tratamientos realizados por esas plataformas externas. Cada proveedor puede aplicar sus propias condiciones, tecnologías y políticas de privacidad.",
      "Recomendamos revisar las políticas de privacidad de los proveedores externos cuando interactúes con sus juegos.",
    ],
  },
  {
    title: "Analytics",
    paragraphs: [
      "JuegosDificiles.com puede utilizar una herramienta de analytics, como Umami u otra solución equivalente, para comprender el uso global del sitio.",
      "Estos datos pueden ayudarnos a saber qué páginas se visitan, qué juegos reciben más atención, qué errores pueden aparecer y cómo mejorar la experiencia general.",
      "El analytics se configurará de forma proporcional y, cuando sea necesario, se gestionará de acuerdo con las preferencias de consentimiento del usuario.",
      "La configuración concreta de la herramienta de analítica podrá variar según la solución técnica utilizada por el sitio.",
    ],
  },
  {
    title: "Publicidad",
    paragraphs: [
      "JuegosDificiles.com puede mostrar publicidad en determinadas zonas del sitio.",
      "Cuando se muestre publicidad en el sitio, algunos socios publicitarios pueden utilizar cookies, identificadores o tecnologías similares para mostrar anuncios, limitar su repetición, medir impresiones o analizar su rendimiento.",
      "La configuración concreta de la publicidad y sus tecnologías asociadas se explicará con más detalle en la página de cookies.",
    ],
  },
  {
    title: "Cookies y tecnologías similares",
    paragraphs: [
      "El sitio puede utilizar cookies, almacenamiento local u otras tecnologías similares para funciones necesarias, preferencias, medición de audiencia, contenidos integrados o publicidad.",
      "La información detallada sobre tipos de cookies, finalidades, duración y gestión del consentimiento se tratará en la página /cookies.",
      "Esta política de privacidad ofrece una visión general, pero no sustituye a la política específica de cookies.",
    ],
  },
  {
    title: "Derechos del usuario",
    paragraphs: [
      "Cuando sea aplicable, puedes solicitar información sobre los datos personales que podamos tratar sobre ti.",
      "También puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento o portabilidad cuando corresponda.",
      "Para ejercer estos derechos o realizar una consulta relacionada con privacidad, puedes escribir a juegosdificiles@gmail.com.",
      "Podemos necesitar información adicional para verificar la solicitud si resulta necesario.",
    ],
  },
  {
    title: "Conservación de datos",
    paragraphs: [
      "Los mensajes enviados por email se conservarán durante el tiempo necesario para responder y gestionar la solicitud.",
      "Los datos técnicos o analíticos se conservarán durante el tiempo necesario para cumplir su finalidad, mantener la seguridad, analizar el funcionamiento del sitio o respetar preferencias de configuración.",
      "Los plazos concretos pueden variar según la finalidad del tratamiento, la herramienta utilizada y las necesidades técnicas o legales aplicables.",
    ],
  },
  {
    title: "Cambios en esta política",
    paragraphs: [
      "Esta política de privacidad puede actualizarse si el sitio evoluciona, si se incorporan nuevas funciones, si cambian los proveedores externos o si se activan herramientas como analytics, publicidad o sistemas de consentimiento.",
      "La versión publicada en esta página será la referencia vigente en cada momento.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_340px] lg:items-end lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Privacidad
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Política de privacidad
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                En JuegosDificiles.com nos tomamos en serio la privacidad de los
                usuarios. Esta política explica qué datos podemos tratar cuando
                visitas el sitio, juegas a juegos integrados, navegas por
                nuestras páginas o contactas con nosotros por email.
              </p>
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
              Última actualización: 16 de junio de 2026
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Sitio de juegos gratuitos online centrado en juegos difíciles,
              rage games, juegos de habilidad y retos para navegador.
            </p>
          </Card>
        </section>

        <section className="container-page pb-16">
          <div className="mx-auto max-w-4xl space-y-6">
            <Card className="p-6 md:p-8" variant="panel">
              <section className="space-y-5">
                <h2 className="text-3xl font-black text-white">
                  Responsable y contacto
                </h2>
                <div className="space-y-5 text-base leading-8 text-slate-300">
                  <p>
                    A efectos de contacto relacionado con esta política, puedes
                    escribir a JuegosDificiles.com en{" "}
                    <a
                      className="font-bold text-cyan-100 transition hover:text-cyan-200 focus-ring"
                      href={contactHref}
                    >
                      {contactEmail}
                    </a>
                    .
                  </p>
                </div>
              </section>
            </Card>

            <Card className="p-6 md:p-8" variant="glass">
              <section className="space-y-5">
                <h2 className="text-3xl font-black text-white">
                  Datos que podemos tratar
                </h2>
                <p className="text-base leading-8 text-slate-300">
                  Al usar JuegosDificiles.com, podemos tratar distintos tipos de
                  datos según cómo interactúes con el sitio.
                </p>
                <ul className="space-y-3">
                  {dataTypes.map((item) => (
                    <li
                      className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-300"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-base leading-8 text-slate-300">
                  El sitio puede generar datos relacionados con el uso de sus
                  funciones locales, como favoritos, juegos recientes, continuar
                  jugando, scores locales o badges locales. Cuando estas
                  funciones se guardan en el navegador, permanecen en el
                  dispositivo del usuario y no implican necesariamente el envío
                  de esos datos a nuestros servidores.
                </p>
              </section>
            </Card>

            <Card className="p-6 md:p-8" variant="panel">
              <section className="space-y-5">
                <h2 className="text-3xl font-black text-white">
                  Finalidades del tratamiento
                </h2>
                <p className="text-base leading-8 text-slate-300">
                  Podemos tratar datos para las siguientes finalidades:
                </p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {purposes.map((purpose) => (
                    <li
                      className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-slate-300"
                      key={purpose}
                    >
                      {purpose}
                    </li>
                  ))}
                </ul>
                <p className="text-base leading-8 text-slate-300">
                  Actualmente el sitio no ofrece cuentas de usuario, perfiles
                  personales ni sistema de autenticación.
                </p>
              </section>
            </Card>

            {sections.map((section) => (
              <Card className="p-6 md:p-8" key={section.title} variant="panel">
                <ArticleSection section={section} />
              </Card>
            ))}

            <Card className="p-6 text-center md:p-8" variant="glass">
              <div className="mx-auto max-w-2xl space-y-5">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Contacto
                </p>
                <h2 className="text-3xl font-black text-white">
                  Consultas sobre privacidad
                </h2>
                <p className="text-sm leading-6 text-slate-400">
                  Para cualquier consulta relacionada con esta política de
                  privacidad, puedes escribirnos por email.
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

