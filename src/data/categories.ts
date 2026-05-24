import type { Category } from "@/types";

const CATALOG_DATE = "2026-05-24T00:00:00.000Z";

export const categories: Category[] = [
  {
    name: "Juegos imposibles",
    slug: "juegos-imposibles",
    description:
      "Retos extremos con saltos precisos, trampas duras y muy poco margen de error.",
    icon: "impossible",
    order: 1,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "Rage Games",
    slug: "rage-games",
    description:
      "Juegos frustrantes y memorables pensados para fallar, respirar y volver a intentarlo.",
    icon: "rage",
    order: 2,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "Die & Retry",
    slug: "die-and-retry",
    description:
      "Desafios de aprendizaje rapido donde cada intento revela una trampa nueva.",
    icon: "retry",
    order: 3,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "Plataformas hardcore",
    slug: "plataformas-hardcore",
    description:
      "Plataformas exigentes con timing estricto, rutas estrechas y precision constante.",
    icon: "platforms",
    order: 4,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "Juegos con trampas",
    slug: "juegos-con-trampas",
    description:
      "Juegos con trampas ocultas, reglas falsas y sorpresas preparadas para el retry.",
    icon: "traps",
    order: 5,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "One Touch",
    slug: "one-touch",
    description:
      "Retos de un solo toque con decisiones rapidas, ritmo directo y mucho riesgo.",
    icon: "one-touch",
    order: 6,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "Reflejos",
    slug: "reflejos",
    description:
      "Juegos de reaccion inmediata con obstaculos veloces, patrones cortos y tension constante.",
    icon: "reflex",
    order: 7,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
  {
    name: "Speedrun",
    slug: "speedrun",
    description:
      "Retos rapidos para optimizar rutas, recortar errores y repetir hasta clavar el tiempo.",
    icon: "speedrun",
    order: 8,
    language: "es",
    createdAt: CATALOG_DATE,
    updatedAt: CATALOG_DATE,
  },
];
