export const LOCAL_BADGES_STORAGE_KEY = "rage-games-portal:local-badges:v1";
export const LOCAL_BADGES_CHANGED_EVENT =
  "rage-games-portal:local-badges-changed";

export type LocalBadgeEntry = {
  badgeSlug: string;
  unlockedAt: string;
};

export type LocalBadgesChangeDetail = {
  badgeSlug: string | null;
  entries: LocalBadgeEntry[];
};

const EMPTY_LOCAL_BADGES: LocalBadgeEntry[] = [];
let localBadgesSnapshot = EMPTY_LOCAL_BADGES;

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function areLocalBadgeEntriesEqual(
  firstEntries: LocalBadgeEntry[],
  secondEntries: LocalBadgeEntry[],
) {
  return (
    firstEntries.length === secondEntries.length &&
    firstEntries.every((entry, index) => {
      const secondEntry = secondEntries[index];

      return (
        entry.badgeSlug === secondEntry.badgeSlug &&
        entry.unlockedAt === secondEntry.unlockedAt
      );
    })
  );
}

function normalizeLocalBadgeEntries(entries: unknown): LocalBadgeEntry[] {
  if (!Array.isArray(entries)) {
    return EMPTY_LOCAL_BADGES;
  }

  const entriesBySlug = new Map<string, LocalBadgeEntry>();

  entries.forEach((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("badgeSlug" in entry) ||
      !("unlockedAt" in entry) ||
      typeof entry.badgeSlug !== "string" ||
      typeof entry.unlockedAt !== "string"
    ) {
      return;
    }

    const badgeSlug = entry.badgeSlug.trim();
    const unlockedAt = entry.unlockedAt.trim();

    if (!badgeSlug || !unlockedAt) {
      return;
    }

    const currentEntry = entriesBySlug.get(badgeSlug);

    if (!currentEntry || unlockedAt < currentEntry.unlockedAt) {
      entriesBySlug.set(badgeSlug, {
        badgeSlug,
        unlockedAt,
      });
    }
  });

  return Array.from(entriesBySlug.values()).sort((firstEntry, secondEntry) =>
    firstEntry.badgeSlug.localeCompare(secondEntry.badgeSlug),
  );
}

function setLocalBadgesSnapshot(entries: LocalBadgeEntry[]) {
  const normalizedEntries = normalizeLocalBadgeEntries(entries);

  if (areLocalBadgeEntriesEqual(localBadgesSnapshot, normalizedEntries)) {
    return localBadgesSnapshot;
  }

  localBadgesSnapshot =
    normalizedEntries.length > 0 ? normalizedEntries : EMPTY_LOCAL_BADGES;

  return localBadgesSnapshot;
}

function readLocalBadgesFromStorage(): LocalBadgeEntry[] {
  if (!canUseLocalStorage()) {
    return EMPTY_LOCAL_BADGES;
  }

  try {
    const storedValue = window.localStorage.getItem(LOCAL_BADGES_STORAGE_KEY);

    if (!storedValue) {
      return EMPTY_LOCAL_BADGES;
    }

    return normalizeLocalBadgeEntries(JSON.parse(storedValue));
  } catch {
    return EMPTY_LOCAL_BADGES;
  }
}

export function getLocalBadgeEntries(): LocalBadgeEntry[] {
  return setLocalBadgesSnapshot(readLocalBadgesFromStorage());
}

export function getServerLocalBadgeEntries(): LocalBadgeEntry[] {
  return EMPTY_LOCAL_BADGES;
}

export function saveLocalBadgeEntries(
  entries: LocalBadgeEntry[],
): LocalBadgeEntry[] {
  const localBadgeEntries = setLocalBadgesSnapshot(entries);

  if (!canUseLocalStorage()) {
    return localBadgeEntries;
  }

  try {
    window.localStorage.setItem(
      LOCAL_BADGES_STORAGE_KEY,
      JSON.stringify(localBadgeEntries),
    );
  } catch {
    return localBadgeEntries;
  }

  return localBadgeEntries;
}

export function unlockDemoLocalBadge(badgeSlug: string) {
  const entries = getLocalBadgeEntries();
  const currentEntry = entries.find((entry) => entry.badgeSlug === badgeSlug);
  const entry = currentEntry ?? {
    badgeSlug,
    unlockedAt: new Date().toISOString(),
  };
  const nextEntries = saveLocalBadgeEntries([
    entry,
    ...entries.filter(
      (localBadgeEntry) => localBadgeEntry.badgeSlug !== badgeSlug,
    ),
  ]);
  const detail: LocalBadgesChangeDetail = {
    badgeSlug,
    entries: nextEntries,
  };

  dispatchLocalBadgesChange(detail);

  return detail;
}

export function resetLocalBadges() {
  const entries = saveLocalBadgeEntries([]);
  const detail: LocalBadgesChangeDetail = {
    badgeSlug: null,
    entries,
  };

  dispatchLocalBadgesChange(detail);

  return detail;
}

export function subscribeToLocalBadgesChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleLocalBadgesChange() {
    getLocalBadgeEntries();
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === LOCAL_BADGES_STORAGE_KEY) {
      handleLocalBadgesChange();
    }
  }

  window.addEventListener(LOCAL_BADGES_CHANGED_EVENT, handleLocalBadgesChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      LOCAL_BADGES_CHANGED_EVENT,
      handleLocalBadgesChange,
    );
    window.removeEventListener("storage", handleStorage);
  };
}

export function dispatchLocalBadgesChange(detail: LocalBadgesChangeDetail) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<LocalBadgesChangeDetail>(LOCAL_BADGES_CHANGED_EVENT, {
      detail,
    }),
  );
}
