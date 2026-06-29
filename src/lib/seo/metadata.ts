import type { Metadata } from "next";

import type { Category, Game } from "@/types";

import { DEFAULT_DESCRIPTION, SITE_NAME } from "./site";

type SeoImage = {
  url: string;
  alt: string;
};

type PageMetadataInput = {
  title: string;
  description?: string | null;
  path: `/${string}`;
  image?: SeoImage | null;
};

const DEFAULT_LOCALE = "es_ES";
const MAX_DESCRIPTION_LENGTH = 170;

function normalizeText(value: string | null | undefined) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

export function createSeoDescription(
  description: string | null | undefined,
  fallback = DEFAULT_DESCRIPTION,
) {
  const normalizedDescription = normalizeText(description) || fallback;

  if (normalizedDescription.length <= MAX_DESCRIPTION_LENGTH) {
    return normalizedDescription;
  }

  return `${normalizedDescription
    .slice(0, MAX_DESCRIPTION_LENGTH - 3)
    .trimEnd()}...`;
}

function normalizePath(path: `/${string}`) {
  return path === "/" ? "/" : path.replace(/\/+$/, "");
}

function getProviderImage(game: Game): SeoImage | null {
  if (game.thumbnail.kind !== "provider-image") {
    return null;
  }

  const imageUrl = normalizeText(game.thumbnail.src);

  if (!imageUrl) {
    return null;
  }

  return {
    url: imageUrl,
    alt: game.thumbnail.alt,
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
}: PageMetadataInput): Metadata {
  const seoDescription = createSeoDescription(description);
  const canonicalPath = normalizePath(path);
  const openGraphImages = image
    ? [
        {
          url: image.url,
          alt: image.alt,
        },
      ]
    : undefined;

  return {
    title,
    description: seoDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description: seoDescription,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: "website",
      url: canonicalPath,
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: seoDescription,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

export function createGameMetadata(game: Game): Metadata {
  return createPageMetadata({
    title: `${game.title} online gratis`,
    description: `Juega ${game.title} online gratis en el navegador, sin descargar. ${game.description}`,
    path: `/juegos/${game.slug}`,
    image: getProviderImage(game),
  });
}

export function createMissingGameMetadata(slug: string): Metadata {
  return createPageMetadata({
    title: "Juego no encontrado",
    description:
      "Este juego no esta disponible actualmente en Juegos Difíciles.",
    path: `/juegos/${slug}`,
  });
}

export function createCategoryMetadata(
  category: Category,
  gameCount: number,
): Metadata {
  const countText =
    gameCount > 0
      ? `Explora ${gameCount} juegos difíciles online gratis en esta categoría, sin descargar.`
      : "Explora juegos difíciles online gratis en esta categoría, sin descargar.";

  return createPageMetadata({
    title: `${category.name} online gratis`,
    description: `${category.description} ${countText}`,
    path: `/categorias/${category.slug}`,
  });
}

export function createMissingCategoryMetadata(slug: string): Metadata {
  return createPageMetadata({
    title: "Categoría no encontrada",
    description:
      "Esta categoría no esta disponible actualmente en Juegos Difíciles.",
    path: `/categorias/${slug}`,
  });
}
