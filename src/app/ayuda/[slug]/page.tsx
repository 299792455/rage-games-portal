import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";

type HelpArticle = {
  title: string;
  slug: string;
  summary: string;
  sections: {
    title: string;
    body: string;
  }[];
};

type HelpArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const helpArticles: HelpArticle[] = [
  {
    title: "Como jugar",
    slug: "como-jugar",
    summary: "Elige un juego, abre su pagina y pulsa Play cuando este listo.",
    sections: [
      {
        title: "Jugar gratis",
        body: "El portal esta pensado para juegos gratis en navegador. En la fase placeholder, algunos juegos muestran que la integracion oficial sigue pendiente.",
      },
      {
        title: "Sin descarga",
        body: "No necesitas instalar nada. Cuando lleguen los providers oficiales, los juegos se abriran desde su integracion autorizada.",
      },
    ],
  },
  {
    title: "Favoritos",
    slug: "favoritos",
    summary: "Los favoritos se guardan solo en este navegador.",
    sections: [
      {
        title: "Almacenamiento local",
        body: "Al marcar un juego como favorito, se guarda su slug en localStorage. No se crea cuenta ni perfil.",
      },
      {
        title: "Sin sincronizacion",
        body: "Si cambias de navegador o dispositivo, esa lista local no se sincroniza en V1.",
      },
    ],
  },
  {
    title: "El juego no carga",
    slug: "el-juego-no-carga",
    summary: "Algunos juegos aun son placeholder y no tienen embed oficial.",
    sections: [
      {
        title: "Integracion pendiente",
        body: "Si ves un mensaje de integracion pendiente, no es un error: el juego espera aprobacion o conexion provider.",
      },
      {
        title: "Revisiones basicas",
        body: "Cuando haya embeds reales, prueba recargar la pagina, comprobar la conexion y revisar si el juego recomienda desktop.",
      },
    ],
  },
  {
    title: "Jugar en movil",
    slug: "jugar-en-movil",
    summary: "Algunos retos funcionan bien en movil y otros recomiendan desktop.",
    sections: [
      {
        title: "Mobile OK",
        body: "Mobile OK indica que el juego puede funcionar con controles tactiles o one touch.",
      },
      {
        title: "Desktop recomendado",
        body: "Desktop recomendado se usa para retos que necesitan teclado, mouse o precision dificil en pantalla tactil.",
      },
    ],
  },
  {
    title: "Controles",
    slug: "controles",
    summary: "Cada juego indica su tipo de control recomendado.",
    sections: [
      {
        title: "Tipos de control",
        body: "Puedes encontrar teclado, mouse, tactil, one touch o combinaciones segun el reto.",
      },
      {
        title: "Elegir bien",
        body: "En juegos dificiles, usar el control recomendado puede cambiar mucho la experiencia.",
      },
    ],
  },
  {
    title: "Dificultad",
    slug: "dificultad",
    summary: "La dificultad y el rage level ayudan a entender el reto.",
    sections: [
      {
        title: "Dificultad",
        body: "La dificultad resume precision, reflejos, memoria, trampas y margen de error.",
      },
      {
        title: "Rage level",
        body: "El rage level indica cuanto puede frustrar el juego por caidas, reinicios o trampas.",
      },
    ],
  },
  {
    title: "Clasificaciones",
    slug: "clasificaciones",
    summary: "Los rankings actuales son placeholder y anonimos.",
    sections: [
      {
        title: "Sin usuarios reales",
        body: "Las clasificaciones de V1 no pertenecen a cuentas reales y no usan perfiles.",
      },
      {
        title: "Sin scores locales",
        body: "Tus scores locales no se envian ni se mezclan con los leaderboards placeholder.",
      },
    ],
  },
  {
    title: "Badges",
    slug: "badges",
    summary: "Los badges locales son ligeros y de demostracion.",
    sections: [
      {
        title: "Demo local",
        body: "Los desbloqueos de badges se guardan en localStorage con badgeSlug y unlockedAt.",
      },
      {
        title: "Sin cuenta",
        body: "No hay UserBadge, perfil publico ni sincronizacion en V1.",
      },
    ],
  },
  {
    title: "Anuncios",
    slug: "anuncios",
    summary: "Los espacios de anuncios son placeholders al inicio.",
    sections: [
      {
        title: "Sin publicidad real",
        body: "La V1 prepara ubicaciones visuales, pero no activa una red publicitaria real sin validacion.",
      },
      {
        title: "Experiencia primero",
        body: "Los anuncios reales se evaluaran mas adelante para no bloquear el juego de forma agresiva.",
      },
    ],
  },
  {
    title: "Privacidad",
    slug: "privacidad",
    summary: "La V1 usa datos locales del navegador para funciones ligeras.",
    sections: [
      {
        title: "Datos locales",
        body: "Favoritos, recientes, continuar jugando, scores demo y badges locales se guardan en el navegador.",
      },
      {
        title: "Sin cuenta",
        body: "No hay email, userId, login ni perfil en la V1.",
      },
    ],
  },
  {
    title: "Reportar un juego",
    slug: "reportar-un-juego",
    summary: "Prepara informacion clara si detectas un problema.",
    sections: [
      {
        title: "Que indicar",
        body: "Anota el nombre del juego, el navegador, el dispositivo y que estabas intentando hacer.",
      },
      {
        title: "Fase placeholder",
        body: "Mientras no haya providers reales, muchos problemas seran solo integraciones pendientes.",
      },
    ],
  },
  {
    title: "Contacto",
    slug: "contacto",
    summary: "El contacto real se tratara sin formulario funcional en esta etapa.",
    sections: [
      {
        title: "Sin formulario",
        body: "Esta etapa no incluye envio de mensajes ni llamadas a servidor.",
      },
      {
        title: "Pagina futura",
        body: "La pagina de contacto publica se creara en su etapa validada, sin inventar datos de empresa.",
      },
    ],
  },
];

export function generateStaticParams() {
  return helpArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function HelpArticlePage({
  params,
}: HelpArticlePageProps) {
  const { slug } = await params;
  const article = helpArticles.find((currentArticle) => currentArticle.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                Centro de ayuda
              </p>
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                {article.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                {article.summary}
              </p>
            </div>

            <Card className="p-5" variant="glass">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-violet-200">
                Ayuda V1
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Contenido corto, sin formulario, sin cuenta y sin envio de datos.
              </p>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {article.sections.map((section) => (
              <Card className="p-6" key={section.title} variant="panel">
                <h2 className="text-2xl font-black text-white">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {section.body}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-6" variant="glass">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Navegacion
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Volver al centro de ayuda
                </h2>
              </div>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-4 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] transition hover:bg-cyan-200 focus-ring"
                href="/ayuda"
              >
                Ver todos los articulos
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
