export const FAVORITES_STORAGE_KEY = "rage-games-portal:favorites:v1";
export const FAVORITES_CHANGED_EVENT = "rage-games-portal:favorites-changed";

export type FavoriteChangeAction = "added" | "removed";

export type FavoriteChangeDetail = {
  slug: string;
  favorites: string[];
  isFavorite: boolean;
  action: FavoriteChangeAction;
};

const EMPTY_FAVORITES: string[] = [];
let favoriteSlugsSnapshot = EMPTY_FAVORITES;

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function areFavoriteSlugsEqual(firstSlugs: string[], secondSlugs: string[]) {
  return (
    firstSlugs.length === secondSlugs.length &&
    firstSlugs.every((slug, index) => slug === secondSlugs[index])
  );
}

function normalizeFavoriteSlugs(slugs: unknown): string[] {
  if (!Array.isArray(slugs)) {
    return [];
  }

  return Array.from(
    new Set(
      slugs
        .filter((slug): slug is string => typeof slug === "string")
        .map((slug) => slug.trim())
        .filter(Boolean),
    ),
  );
}

function setFavoriteSlugsSnapshot(slugs: string[]) {
  const normalizedSlugs = normalizeFavoriteSlugs(slugs);

  if (areFavoriteSlugsEqual(favoriteSlugsSnapshot, normalizedSlugs)) {
    return favoriteSlugsSnapshot;
  }

  favoriteSlugsSnapshot =
    normalizedSlugs.length > 0 ? normalizedSlugs : EMPTY_FAVORITES;

  return favoriteSlugsSnapshot;
}

function readFavoriteSlugsFromStorage(): string[] {
  if (!canUseLocalStorage()) {
    return EMPTY_FAVORITES;
  }

  try {
    const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedValue) {
      return EMPTY_FAVORITES;
    }

    return normalizeFavoriteSlugs(JSON.parse(storedValue));
  } catch {
    return EMPTY_FAVORITES;
  }
}

export function getFavoriteSlugs(): string[] {
  return setFavoriteSlugsSnapshot(readFavoriteSlugsFromStorage());
}

export function getServerFavoriteSlugs(): string[] {
  return EMPTY_FAVORITES;
}

export function saveFavoriteSlugs(slugs: string[]): string[] {
  const favorites = setFavoriteSlugsSnapshot(slugs);

  if (!canUseLocalStorage()) {
    return favorites;
  }

  try {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(favorites),
    );
  } catch {
    return favorites;
  }

  return favorites;
}

export function isFavoriteGame(slug: string): boolean {
  return getFavoriteSlugs().includes(slug);
}

export function subscribeToFavoriteChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleFavoriteChange() {
    getFavoriteSlugs();
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === FAVORITES_STORAGE_KEY) {
      handleFavoriteChange();
    }
  }

  window.addEventListener(FAVORITES_CHANGED_EVENT, handleFavoriteChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(FAVORITES_CHANGED_EVENT, handleFavoriteChange);
    window.removeEventListener("storage", handleStorage);
  };
}

export function toggleFavoriteSlug(slug: string): FavoriteChangeDetail {
  const favorites = getFavoriteSlugs();
  const isAlreadyFavorite = favorites.includes(slug);
  const nextFavorites = isAlreadyFavorite
    ? favorites.filter((favoriteSlug) => favoriteSlug !== slug)
    : [...favorites, slug];
  const savedFavorites = saveFavoriteSlugs(nextFavorites);
  const detail: FavoriteChangeDetail = {
    slug,
    favorites: savedFavorites,
    isFavorite: !isAlreadyFavorite,
    action: isAlreadyFavorite ? "removed" : "added",
  };

  dispatchFavoriteChange(detail);

  return detail;
}

export function dispatchFavoriteChange(detail: FavoriteChangeDetail) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<FavoriteChangeDetail>(FAVORITES_CHANGED_EVENT, {
      detail,
    }),
  );
}
