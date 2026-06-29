import type { Category, Game } from "@/types";

import { HOME_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export type JsonLdNode = Record<string, unknown>;

type PageJsonLdInput = {
  name: string;
  description: string;
  path: string;
};

type ItemListInput = {
  name: string;
  path: string;
  items: {
    name: string;
    path: string;
  }[];
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

const CONTEXT = "https://schema.org";
const LANGUAGE = "es";

function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
}

function compactJsonLd(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(([, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }

      if (Array.isArray(value) && value.length === 0) {
        return false;
      }

      return true;
    }),
  );
}

function withContext(node: JsonLdNode): JsonLdNode {
  return {
    "@context": CONTEXT,
    ...compactJsonLd(node),
  };
}

function getProviderImage(game: Game) {
  return game.thumbnail.kind === "provider-image" ? game.thumbnail.src : null;
}

function getProviderName(game: Game) {
  if (!game.provider || game.provider === "placeholder" || game.provider === "other") {
    return null;
  }

  const providerLabels: Record<string, string> = {
    gamepix: "GamePix",
    gamezop: "Gamezop",
    gamedistribution: "GameDistribution",
    "onlinegames.io": "OnlineGames.io",
    twoplayergames: "TwoPlayerGames",
  };

  return providerLabels[game.provider] ?? game.provider;
}

export function createWebsiteJsonLd(): JsonLdNode {
  return withContext({
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: HOME_DESCRIPTION,
    inLanguage: LANGUAGE,
  });
}

export function createOrganizationJsonLd(): JsonLdNode {
  return withContext({
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  });
}

export function createWebPageJsonLd({
  name,
  description,
  path,
}: PageJsonLdInput): JsonLdNode {
  return withContext({
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: LANGUAGE,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  });
}

export function createCollectionPageJsonLd({
  name,
  description,
  path,
}: PageJsonLdInput): JsonLdNode {
  return withContext({
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: LANGUAGE,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  });
}

export function createItemListJsonLd({
  name,
  path,
  items,
}: ItemListInput): JsonLdNode {
  return withContext({
    "@type": "ItemList",
    name,
    url: absoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "WebPage",
        name: item.name,
        url: absoluteUrl(item.path),
      },
    })),
  });
}

export function createVideoGameJsonLd(
  game: Game,
  category?: Category,
): JsonLdNode {
  const providerName = getProviderName(game);

  return withContext({
    "@type": "VideoGame",
    name: game.title,
    description: game.description,
    url: absoluteUrl(`/juegos/${game.slug}`),
    inLanguage: game.language,
    gamePlatform: "Navegador web",
    applicationCategory: "Game",
    genre: category?.name ?? game.category,
    keywords: game.tags.join(", "),
    image: getProviderImage(game),
    provider: providerName
      ? {
          "@type": "Organization",
          name: providerName,
        }
      : undefined,
  });
}

export function createBreadcrumbListJsonLd(
  items: BreadcrumbItem[],
): JsonLdNode {
  return withContext({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  });
}
