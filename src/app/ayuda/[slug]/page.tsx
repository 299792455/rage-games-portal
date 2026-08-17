import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer, Header } from "@/components/layout";
import { Card } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo/metadata";

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
    title: "Cómo jugar",
    slug: "como-jugar",
    summary: "Elige un juego, abre su página y pulsa Play cuando esté listo.",
    sections: [
      {
        title: "Jugar gratis",
        body: "El portal ofrece juegos reales integrados para jugar gratis directamente desde el navegador.",
      },
      {
        title: "Sin descarga",
        body: "No necesitas instalar nada. Cada juego disponible se abre desde la integración autorizada de su proveedor.",
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
        body: "Cuando añades un juego a favoritos, se guarda directamente en este navegador. No necesitas crear una cuenta ni iniciar sesión.",
      },
      {
        title: "Disponible en este navegador",
        body: "Tus favoritos se guardan únicamente en el navegador que estás utilizando. Si accedes desde otro navegador o dispositivo, tendrás que volver a añadirlos.",
      },
    ],
  },
  {
    title: "El juego no carga",
    slug: "el-juego-no-carga",
    summary: "Un juego integrado puede fallar por conexión, navegador o restricciones del proveedor.",
    sections: [
      {
        title: "Comprobaciones rápidas",
        body: "Recarga la página, comprueba tu conexión y verifica si el juego recomienda usar un ordenador.",
      },
      {
        title: "Contenido externo",
        body: "Algunos proveedores pueden limitar temporalmente un juego o aplicar restricciones de compatibilidad fuera de su sitio.",
      },
    ],
  },
  {
    title: "Jugar en móvil",
    slug: "jugar-en-movil",
    summary: "Algunos retos funcionan bien en móvil y otros recomiendan desktop.",
    sections: [
      {
        title: "Mobile OK",
        body: "Mobile OK indica que el juego puede funcionar con controles táctiles o one touch.",
      },
      {
        title: "Desktop recomendado",
        body: "Desktop recomendado se usa para retos que necesitan teclado, mouse o precisión difícil en pantalla táctil.",
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
        body: "Puedes encontrar teclado, mouse, táctil, one touch o combinaciones según el reto.",
      },
      {
        title: "Elegir bien",
        body: "En juegos difíciles, usar el control recomendado puede cambiar mucho la experiencia.",
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
    summary: "Actualmente no se publica ningún ranking global de jugadores.",
    sections: [
      {
        title: "Sin usuarios reales",
        body: "Las clasificaciones de V1 no pertenecen a cuentas reales y no usan perfiles.",
      },
      {
        title: "Sin resultados locales",
        body: "Tus resultados locales no se envían ni se mezclan con clasificaciones globales.",
      },
    ],
  },
  {
    title: "Logros",
    slug: "badges",
    summary: "Los logros locales ayudan a seguir objetivos personales.",
    sections: [
      {
        title: "Progreso local",
        body: "Los logros se guardan localmente con badgeSlug y unlockedAt. Por ahora puedes marcarlos manualmente para seguir tu progreso personal.",
      },
      {
        title: "Sin cuenta",
        body: "No hay perfil público ni sincronización en V1. En una próxima actualización, el sistema evolucionará con cuentas, progreso automático, logros desbloqueables y rankings globales.",
      },
    ],
  },
  {
    title: "Anuncios",
    slug: "anuncios",
    summary: "Los espacios publicitarios están preparados y desactivados por defecto.",
    sections: [
      {
        title: "Sin publicidad real",
        body: "La V1 prepara ubicaciones visuales, pero no activa una red publicitaria real sin validación.",
      },
      {
        title: "Experiencia primero",
        body: "Los anuncios reales se evaluarán más adelante para no bloquear el juego de forma agresiva.",
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
        body: "Favoritos, recientes, continuar jugando, progreso local y logros locales se guardan en el navegador.",
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
    summary: "Prepara información clara si detectas un problema.",
    sections: [
      {
        title: "Qué indicar",
        body: "Anota el nombre del juego, el navegador, el dispositivo y qué estabas intentando hacer.",
      },
      {
        title: "Juego y proveedor",
        body: "Indica también el proveedor mostrado en la página para facilitar la revisión de la integración.",
      },
    ],
  },
  {
    title: "Contacto",
    slug: "contacto",
    summary: "El contacto del sitio se gestiona desde la página pública de contacto.",
    sections: [
      {
        title: "Sin formulario",
        body: "Por ahora no hay formulario activo en el sitio. Puedes usar el email indicado en la página de contacto.",
      },
      {
        title: "Contacto directo",
        body: "Usa la página de contacto para reportar problemas, sugerir juegos o enviar propuestas relacionadas con el sitio.",
      },
    ],
  },
];

const noindexHelpArticleSlugs = new Set([
  "como-jugar",
  "favoritos",
  "privacidad",
  "clasificaciones",
  "badges",
  "anuncios",
]);

export async function generateMetadata({
  params,
}: HelpArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = helpArticles.find(
    (currentArticle) => currentArticle.slug === slug,
  );

  if (!article) {
    notFound();
  }

  const metadata = createPageMetadata({
    title: article.title,
    description: article.summary,
    path: `/ayuda/${article.slug}`,
  });

  return noindexHelpArticleSlugs.has(article.slug)
    ? {
        ...metadata,
        robots: {
          index: false,
          follow: true,
        },
      }
    : metadata;
}

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
                Ver todos los artículos
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}
