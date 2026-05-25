export const CONTINUE_PLAYING_STORAGE_KEY =
  "rage-games-portal:continue-playing:v1";
export const CONTINUE_PLAYING_CHANGED_EVENT =
  "rage-games-portal:continue-playing-changed";
export const CONTINUE_PLAYING_LIMIT = 8;

export type ContinuePlayingEntry = {
  slug: string;
  startedAt: string;
  updatedAt: string;
};

export type ContinuePlayingChangeDetail = {
  slug: string;
  entry: ContinuePlayingEntry;
  entries: ContinuePlayingEntry[];
};

const EMPTY_CONTINUE_PLAYING: ContinuePlayingEntry[] = [];
let continuePlayingSnapshot = EMPTY_CONTINUE_PLAYING;

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function areContinuePlayingEntriesEqual(
  firstEntries: ContinuePlayingEntry[],
  secondEntries: ContinuePlayingEntry[],
) {
  return (
    firstEntries.length === secondEntries.length &&
    firstEntries.every((entry, index) => {
      const secondEntry = secondEntries[index];

      return (
        entry.slug === secondEntry.slug &&
        entry.startedAt === secondEntry.startedAt &&
        entry.updatedAt === secondEntry.updatedAt
      );
    })
  );
}

function normalizeContinuePlayingEntries(
  entries: unknown,
): ContinuePlayingEntry[] {
  if (!Array.isArray(entries)) {
    return EMPTY_CONTINUE_PLAYING;
  }

  const entriesBySlug = new Map<string, ContinuePlayingEntry>();

  entries.forEach((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("slug" in entry) ||
      !("startedAt" in entry) ||
      !("updatedAt" in entry) ||
      typeof entry.slug !== "string" ||
      typeof entry.startedAt !== "string" ||
      typeof entry.updatedAt !== "string"
    ) {
      return;
    }

    const slug = entry.slug.trim();
    const startedAt = entry.startedAt.trim();
    const updatedAt = entry.updatedAt.trim();

    if (!slug || !startedAt || !updatedAt) {
      return;
    }

    const currentEntry = entriesBySlug.get(slug);

    if (!currentEntry || updatedAt > currentEntry.updatedAt) {
      entriesBySlug.set(slug, {
        slug,
        startedAt,
        updatedAt,
      });
    }
  });

  return Array.from(entriesBySlug.values())
    .sort((firstEntry, secondEntry) =>
      secondEntry.updatedAt.localeCompare(firstEntry.updatedAt),
    )
    .slice(0, CONTINUE_PLAYING_LIMIT);
}

function setContinuePlayingSnapshot(entries: ContinuePlayingEntry[]) {
  const normalizedEntries = normalizeContinuePlayingEntries(entries);

  if (
    areContinuePlayingEntriesEqual(continuePlayingSnapshot, normalizedEntries)
  ) {
    return continuePlayingSnapshot;
  }

  continuePlayingSnapshot =
    normalizedEntries.length > 0
      ? normalizedEntries
      : EMPTY_CONTINUE_PLAYING;

  return continuePlayingSnapshot;
}

function readContinuePlayingFromStorage(): ContinuePlayingEntry[] {
  if (!canUseLocalStorage()) {
    return EMPTY_CONTINUE_PLAYING;
  }

  try {
    const storedValue = window.localStorage.getItem(
      CONTINUE_PLAYING_STORAGE_KEY,
    );

    if (!storedValue) {
      return EMPTY_CONTINUE_PLAYING;
    }

    return normalizeContinuePlayingEntries(JSON.parse(storedValue));
  } catch {
    return EMPTY_CONTINUE_PLAYING;
  }
}

export function getContinuePlayingEntries(): ContinuePlayingEntry[] {
  return setContinuePlayingSnapshot(readContinuePlayingFromStorage());
}

export function getServerContinuePlayingEntries(): ContinuePlayingEntry[] {
  return EMPTY_CONTINUE_PLAYING;
}

export function saveContinuePlayingEntries(
  entries: ContinuePlayingEntry[],
): ContinuePlayingEntry[] {
  const continuePlayingEntries = setContinuePlayingSnapshot(entries);

  if (!canUseLocalStorage()) {
    return continuePlayingEntries;
  }

  try {
    window.localStorage.setItem(
      CONTINUE_PLAYING_STORAGE_KEY,
      JSON.stringify(continuePlayingEntries),
    );
  } catch {
    return continuePlayingEntries;
  }

  return continuePlayingEntries;
}

export function recordContinuePlayingGame(slug: string) {
  const currentEntries = getContinuePlayingEntries();
  const currentEntry = currentEntries.find((entry) => entry.slug === slug);
  const now = new Date().toISOString();
  const entry: ContinuePlayingEntry = {
    slug,
    startedAt: currentEntry?.startedAt ?? now,
    updatedAt: now,
  };
  const nextEntries = saveContinuePlayingEntries([
    entry,
    ...currentEntries.filter(
      (continuePlayingEntry) => continuePlayingEntry.slug !== slug,
    ),
  ]);
  const detail: ContinuePlayingChangeDetail = {
    slug,
    entry,
    entries: nextEntries,
  };

  dispatchContinuePlayingChange(detail);

  return detail;
}

export function subscribeToContinuePlayingChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleContinuePlayingChange() {
    getContinuePlayingEntries();
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === CONTINUE_PLAYING_STORAGE_KEY) {
      handleContinuePlayingChange();
    }
  }

  window.addEventListener(
    CONTINUE_PLAYING_CHANGED_EVENT,
    handleContinuePlayingChange,
  );
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      CONTINUE_PLAYING_CHANGED_EVENT,
      handleContinuePlayingChange,
    );
    window.removeEventListener("storage", handleStorage);
  };
}

export function dispatchContinuePlayingChange(
  detail: ContinuePlayingChangeDetail,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<ContinuePlayingChangeDetail>(
      CONTINUE_PLAYING_CHANGED_EVENT,
      {
        detail,
      },
    ),
  );
}
