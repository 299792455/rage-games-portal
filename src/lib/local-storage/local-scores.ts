export const LOCAL_SCORES_STORAGE_KEY = "rage-games-portal:local-scores:v1";
export const LOCAL_SCORES_CHANGED_EVENT =
  "rage-games-portal:local-scores-changed";

export type LocalScoreEntry = {
  gameSlug: string;
  score: number | null;
  bestScore: number | null;
  bestTime: number | null;
  attempts: number;
  createdAt: string;
  updatedAt: string;
};

export type LocalScoreChangeDetail = {
  gameSlug: string;
  entry: LocalScoreEntry;
  entries: LocalScoreEntry[];
};

const EMPTY_LOCAL_SCORES: LocalScoreEntry[] = [];
let localScoresSnapshot = EMPTY_LOCAL_SCORES;

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function normalizeNullableNumber(value: unknown) {
  return isFiniteNumber(value) && value >= 0 ? value : null;
}

function normalizeAttempts(value: unknown) {
  return isFiniteNumber(value) && value >= 0 ? Math.floor(value) : 0;
}

function areLocalScoreEntriesEqual(
  firstEntries: LocalScoreEntry[],
  secondEntries: LocalScoreEntry[],
) {
  return (
    firstEntries.length === secondEntries.length &&
    firstEntries.every((entry, index) => {
      const secondEntry = secondEntries[index];

      return (
        entry.gameSlug === secondEntry.gameSlug &&
        entry.score === secondEntry.score &&
        entry.bestScore === secondEntry.bestScore &&
        entry.bestTime === secondEntry.bestTime &&
        entry.attempts === secondEntry.attempts &&
        entry.createdAt === secondEntry.createdAt &&
        entry.updatedAt === secondEntry.updatedAt
      );
    })
  );
}

function normalizeLocalScoreEntries(entries: unknown): LocalScoreEntry[] {
  if (!Array.isArray(entries)) {
    return EMPTY_LOCAL_SCORES;
  }

  const entriesBySlug = new Map<string, LocalScoreEntry>();

  entries.forEach((entry) => {
    if (
      typeof entry !== "object" ||
      entry === null ||
      !("gameSlug" in entry) ||
      !("createdAt" in entry) ||
      !("updatedAt" in entry) ||
      typeof entry.gameSlug !== "string" ||
      typeof entry.createdAt !== "string" ||
      typeof entry.updatedAt !== "string"
    ) {
      return;
    }

    const gameSlug = entry.gameSlug.trim();
    const createdAt = entry.createdAt.trim();
    const updatedAt = entry.updatedAt.trim();

    if (!gameSlug || !createdAt || !updatedAt) {
      return;
    }

    const normalizedEntry: LocalScoreEntry = {
      gameSlug,
      score: "score" in entry ? normalizeNullableNumber(entry.score) : null,
      bestScore:
        "bestScore" in entry ? normalizeNullableNumber(entry.bestScore) : null,
      bestTime:
        "bestTime" in entry ? normalizeNullableNumber(entry.bestTime) : null,
      attempts: "attempts" in entry ? normalizeAttempts(entry.attempts) : 0,
      createdAt,
      updatedAt,
    };
    const currentEntry = entriesBySlug.get(gameSlug);

    if (!currentEntry || updatedAt > currentEntry.updatedAt) {
      entriesBySlug.set(gameSlug, normalizedEntry);
    }
  });

  return Array.from(entriesBySlug.values()).sort((firstEntry, secondEntry) =>
    firstEntry.gameSlug.localeCompare(secondEntry.gameSlug),
  );
}

function setLocalScoresSnapshot(entries: LocalScoreEntry[]) {
  const normalizedEntries = normalizeLocalScoreEntries(entries);

  if (areLocalScoreEntriesEqual(localScoresSnapshot, normalizedEntries)) {
    return localScoresSnapshot;
  }

  localScoresSnapshot =
    normalizedEntries.length > 0 ? normalizedEntries : EMPTY_LOCAL_SCORES;

  return localScoresSnapshot;
}

function readLocalScoresFromStorage(): LocalScoreEntry[] {
  if (!canUseLocalStorage()) {
    return EMPTY_LOCAL_SCORES;
  }

  try {
    const storedValue = window.localStorage.getItem(LOCAL_SCORES_STORAGE_KEY);

    if (!storedValue) {
      return EMPTY_LOCAL_SCORES;
    }

    return normalizeLocalScoreEntries(JSON.parse(storedValue));
  } catch {
    return EMPTY_LOCAL_SCORES;
  }
}

function createEmptyLocalScoreEntry(gameSlug: string): LocalScoreEntry {
  const now = new Date().toISOString();

  return {
    gameSlug,
    score: null,
    bestScore: null,
    bestTime: null,
    attempts: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function upsertLocalScoreEntry(
  gameSlug: string,
  updateEntry: (entry: LocalScoreEntry) => LocalScoreEntry,
) {
  const entries = getLocalScoreEntries();
  const currentEntry =
    entries.find((entry) => entry.gameSlug === gameSlug) ??
    createEmptyLocalScoreEntry(gameSlug);
  const updatedEntry = updateEntry(currentEntry);
  const nextEntries = saveLocalScoreEntries([
    updatedEntry,
    ...entries.filter((entry) => entry.gameSlug !== gameSlug),
  ]);
  const detail: LocalScoreChangeDetail = {
    gameSlug,
    entry: updatedEntry,
    entries: nextEntries,
  };

  dispatchLocalScoreChange(detail);

  return detail;
}

export function getLocalScoreEntries(): LocalScoreEntry[] {
  return setLocalScoresSnapshot(readLocalScoresFromStorage());
}

export function getServerLocalScoreEntries(): LocalScoreEntry[] {
  return EMPTY_LOCAL_SCORES;
}

export function getLocalScoreEntry(gameSlug: string) {
  return getLocalScoreEntries().find((entry) => entry.gameSlug === gameSlug);
}

export function saveLocalScoreEntries(
  entries: LocalScoreEntry[],
): LocalScoreEntry[] {
  const localScoreEntries = setLocalScoresSnapshot(entries);

  if (!canUseLocalStorage()) {
    return localScoreEntries;
  }

  try {
    window.localStorage.setItem(
      LOCAL_SCORES_STORAGE_KEY,
      JSON.stringify(localScoreEntries),
    );
  } catch {
    return localScoreEntries;
  }

  return localScoreEntries;
}

export function addDemoAttempt(gameSlug: string) {
  return upsertLocalScoreEntry(gameSlug, (entry) => ({
    ...entry,
    attempts: entry.attempts + 1,
    updatedAt: new Date().toISOString(),
  }));
}

export function recordDemoScore(gameSlug: string) {
  return upsertLocalScoreEntry(gameSlug, (entry) => {
    const score = Math.max(250, (entry.attempts + 1) * 175);

    return {
      ...entry,
      score,
      bestScore: Math.max(entry.bestScore ?? 0, score),
      updatedAt: new Date().toISOString(),
    };
  });
}

export function recordDemoBestTime(gameSlug: string) {
  return upsertLocalScoreEntry(gameSlug, (entry) => {
    const demoTime = Math.max(12, 90 - entry.attempts * 3);
    const bestTime =
      entry.bestTime === null ? demoTime : Math.min(entry.bestTime, demoTime);

    return {
      ...entry,
      bestTime,
      updatedAt: new Date().toISOString(),
    };
  });
}

export function resetLocalScoreEntry(gameSlug: string) {
  const entries = getLocalScoreEntries();
  const resetEntry = createEmptyLocalScoreEntry(gameSlug);
  const nextEntries = saveLocalScoreEntries([
    resetEntry,
    ...entries.filter((entry) => entry.gameSlug !== gameSlug),
  ]);
  const detail: LocalScoreChangeDetail = {
    gameSlug,
    entry: resetEntry,
    entries: nextEntries,
  };

  dispatchLocalScoreChange(detail);

  return detail;
}

export function subscribeToLocalScoreChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleLocalScoreChange() {
    getLocalScoreEntries();
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === LOCAL_SCORES_STORAGE_KEY) {
      handleLocalScoreChange();
    }
  }

  window.addEventListener(LOCAL_SCORES_CHANGED_EVENT, handleLocalScoreChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      LOCAL_SCORES_CHANGED_EVENT,
      handleLocalScoreChange,
    );
    window.removeEventListener("storage", handleStorage);
  };
}

export function dispatchLocalScoreChange(detail: LocalScoreChangeDetail) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<LocalScoreChangeDetail>(LOCAL_SCORES_CHANGED_EVENT, {
      detail,
    }),
  );
}
