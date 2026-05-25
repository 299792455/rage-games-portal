export const RECENTLY_PLAYED_STORAGE_KEY =
  "rage-games-portal:recently-played:v1";
export const RECENTLY_PLAYED_CHANGED_EVENT =
  "rage-games-portal:recently-played-changed";
export const RECENTLY_PLAYED_LIMIT = 12;

export type RecentlyPlayedEntry = {
  slug: string;
  lastPlayedAt: string;
};

export type RecentlyPlayedChangeDetail = {
  slug: string;
  lastPlayedAt: string;
  entries: RecentlyPlayedEntry[];
};

const EMPTY_RECENTLY_PLAYED: RecentlyPlayedEntry[] = [];
let recentlyPlayedSnapshot = EMPTY_RECENTLY_PLAYED;

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function areRecentlyPlayedEntriesEqual(
  firstEntries: RecentlyPlayedEntry[],
  secondEntries: RecentlyPlayedEntry[],
) {
  return (
    firstEntries.length === secondEntries.length &&
    firstEntries.every((entry, index) => {
      const secondEntry = secondEntries[index];

      return (
        entry.slug === secondEntry.slug &&
        entry.lastPlayedAt === secondEntry.lastPlayedAt
      );
    })
  );
}

function normalizeRecentlyPlayedEntries(
  entries: unknown,
): RecentlyPlayedEntry[] {
  if (!Array.isArray(entries)) {
    return EMPTY_RECENTLY_PLAYED;
  }

  const entriesBySlug = new Map<string, RecentlyPlayedEntry>();

  entries.forEach((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("slug" in entry) ||
      !("lastPlayedAt" in entry) ||
      typeof entry.slug !== "string" ||
      typeof entry.lastPlayedAt !== "string"
    ) {
      return;
    }

    const slug = entry.slug.trim();
    const lastPlayedAt = entry.lastPlayedAt.trim();

    if (!slug || !lastPlayedAt) {
      return;
    }

    const currentEntry = entriesBySlug.get(slug);

    if (!currentEntry || lastPlayedAt > currentEntry.lastPlayedAt) {
      entriesBySlug.set(slug, {
        slug,
        lastPlayedAt,
      });
    }
  });

  return Array.from(entriesBySlug.values())
    .sort((firstEntry, secondEntry) =>
      secondEntry.lastPlayedAt.localeCompare(firstEntry.lastPlayedAt),
    )
    .slice(0, RECENTLY_PLAYED_LIMIT);
}

function setRecentlyPlayedSnapshot(entries: RecentlyPlayedEntry[]) {
  const normalizedEntries = normalizeRecentlyPlayedEntries(entries);

  if (
    areRecentlyPlayedEntriesEqual(recentlyPlayedSnapshot, normalizedEntries)
  ) {
    return recentlyPlayedSnapshot;
  }

  recentlyPlayedSnapshot =
    normalizedEntries.length > 0
      ? normalizedEntries
      : EMPTY_RECENTLY_PLAYED;

  return recentlyPlayedSnapshot;
}

function readRecentlyPlayedFromStorage(): RecentlyPlayedEntry[] {
  if (!canUseLocalStorage()) {
    return EMPTY_RECENTLY_PLAYED;
  }

  try {
    const storedValue = window.localStorage.getItem(
      RECENTLY_PLAYED_STORAGE_KEY,
    );

    if (!storedValue) {
      return EMPTY_RECENTLY_PLAYED;
    }

    return normalizeRecentlyPlayedEntries(JSON.parse(storedValue));
  } catch {
    return EMPTY_RECENTLY_PLAYED;
  }
}

export function getRecentlyPlayedEntries(): RecentlyPlayedEntry[] {
  return setRecentlyPlayedSnapshot(readRecentlyPlayedFromStorage());
}

export function getServerRecentlyPlayedEntries(): RecentlyPlayedEntry[] {
  return EMPTY_RECENTLY_PLAYED;
}

export function saveRecentlyPlayedEntries(
  entries: RecentlyPlayedEntry[],
): RecentlyPlayedEntry[] {
  const recentlyPlayedEntries = setRecentlyPlayedSnapshot(entries);

  if (!canUseLocalStorage()) {
    return recentlyPlayedEntries;
  }

  try {
    window.localStorage.setItem(
      RECENTLY_PLAYED_STORAGE_KEY,
      JSON.stringify(recentlyPlayedEntries),
    );
  } catch {
    return recentlyPlayedEntries;
  }

  return recentlyPlayedEntries;
}

export function recordRecentlyPlayedGame(slug: string) {
  const lastPlayedAt = new Date().toISOString();
  const currentEntries = getRecentlyPlayedEntries();
  const nextEntries = saveRecentlyPlayedEntries([
    {
      slug,
      lastPlayedAt,
    },
    ...currentEntries.filter((entry) => entry.slug !== slug),
  ]);
  const detail: RecentlyPlayedChangeDetail = {
    slug,
    lastPlayedAt,
    entries: nextEntries,
  };

  dispatchRecentlyPlayedChange(detail);

  return detail;
}

export function subscribeToRecentlyPlayedChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleRecentlyPlayedChange() {
    getRecentlyPlayedEntries();
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === RECENTLY_PLAYED_STORAGE_KEY) {
      handleRecentlyPlayedChange();
    }
  }

  window.addEventListener(
    RECENTLY_PLAYED_CHANGED_EVENT,
    handleRecentlyPlayedChange,
  );
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      RECENTLY_PLAYED_CHANGED_EVENT,
      handleRecentlyPlayedChange,
    );
    window.removeEventListener("storage", handleStorage);
  };
}

export function dispatchRecentlyPlayedChange(
  detail: RecentlyPlayedChangeDetail,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<RecentlyPlayedChangeDetail>(
      RECENTLY_PLAYED_CHANGED_EVENT,
      {
        detail,
      },
    ),
  );
}
