import type { MetadataRoute } from "next";

import { categories, games } from "@/data";
import { SITE_URL } from "@/lib/seo/site";

const BASE_URL = SITE_URL.replace(/\/$/, "");

function createUrl(path: string) {
  return `${BASE_URL}${path}`;
}

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: createUrl("/"),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: createUrl("/juegos"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: createUrl("/categorias"),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: createUrl("/nuevos"),
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    url: createUrl("/populares"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: createUrl("/ayuda"),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: createUrl("/ayuda/el-juego-no-carga"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/ayuda/jugar-en-movil"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/ayuda/controles"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/ayuda/dificultad"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/ayuda/reportar-un-juego"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/ayuda/contacto"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/sobre-nosotros"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/contacto"),
    changeFrequency: "monthly",
    priority: 0.4,
  },
  {
    url: createUrl("/privacidad"),
    changeFrequency: "monthly",
    priority: 0.3,
  },
  {
    url: createUrl("/cookies"),
    changeFrequency: "monthly",
    priority: 0.3,
  },
  {
    url: createUrl("/terminos"),
    changeFrequency: "monthly",
    priority: 0.3,
  },
];

const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
  url: createUrl(`/categorias/${category.slug}`),
  lastModified: new Date(category.updatedAt),
  changeFrequency: "weekly",
  priority: 0.7,
}));

const gameRoutes: MetadataRoute.Sitemap = games
  .filter((game) => game.isActive)
  .map((game) => ({
    url: createUrl(`/juegos/${game.slug}`),
    lastModified: new Date(game.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...categoryRoutes, ...gameRoutes];
}
