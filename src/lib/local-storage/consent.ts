import type { ConsentStorageStatus, CookieConsent } from "@/types";

export const COOKIE_CONSENT_STORAGE_KEY = "rage-games-portal:consent:v1";
export const COOKIE_CONSENT_CHANGED_EVENT =
  "rage-games-portal:consent-changed";

export type CookieConsentChangeDetail = {
  consent: CookieConsent;
};

let cookieConsentSnapshot: CookieConsent | null = null;
let cookieConsentRawSnapshot: string | null = null;

function canUseLocalStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

function isConsentStorageStatus(value: unknown): value is ConsentStorageStatus {
  return value === "granted" || value === "denied";
}

function createCookieConsent(
  analyticsStorage: ConsentStorageStatus,
): CookieConsent {
  return {
    version: 1,
    necessary: true,
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    updatedAt: new Date().toISOString(),
  };
}

function normalizeCookieConsent(value: unknown): CookieConsent | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  if (
    !("version" in value) ||
    !("analytics_storage" in value) ||
    !("updatedAt" in value) ||
    value.version !== 1 ||
    !isConsentStorageStatus(value.analytics_storage) ||
    typeof value.updatedAt !== "string" ||
    !value.updatedAt.trim()
  ) {
    return null;
  }

  return {
    version: 1,
    necessary: true,
    analytics_storage: value.analytics_storage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    updatedAt: value.updatedAt,
  };
}

function readCookieConsentFromStorage(): CookieConsent | null {
  if (!canUseLocalStorage()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (!storedValue) {
      cookieConsentRawSnapshot = null;
      return null;
    }

    if (storedValue === cookieConsentRawSnapshot) {
      return cookieConsentSnapshot;
    }

    cookieConsentRawSnapshot = storedValue;

    return normalizeCookieConsent(JSON.parse(storedValue));
  } catch {
    return null;
  }
}

function setCookieConsentSnapshot(
  consent: CookieConsent | null,
  rawValue?: string | null,
) {
  cookieConsentSnapshot = consent;

  if (rawValue !== undefined) {
    cookieConsentRawSnapshot = rawValue;
  }

  return cookieConsentSnapshot;
}

export function getCookieConsent(): CookieConsent | null {
  return setCookieConsentSnapshot(readCookieConsentFromStorage());
}

export function getServerCookieConsent(): CookieConsent | null {
  return null;
}

export function saveCookieConsent(consent: CookieConsent): CookieConsent {
  const normalizedConsent =
    normalizeCookieConsent(consent) ??
    createCookieConsent(consent.analytics_storage);

  setCookieConsentSnapshot(normalizedConsent);
  const serializedConsent = JSON.stringify(normalizedConsent);

  if (!canUseLocalStorage()) {
    return normalizedConsent;
  }

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serializedConsent);
    setCookieConsentSnapshot(normalizedConsent, serializedConsent);
  } catch {
    return normalizedConsent;
  }

  dispatchCookieConsentChange(normalizedConsent);

  return normalizedConsent;
}

export function acceptAnalyticsConsent(): CookieConsent {
  return saveCookieConsent(createCookieConsent("granted"));
}

export function rejectAnalyticsConsent(): CookieConsent {
  return saveCookieConsent(createCookieConsent("denied"));
}

export function saveAnalyticsConsent(
  analyticsStorage: ConsentStorageStatus,
): CookieConsent {
  return saveCookieConsent(createCookieConsent(analyticsStorage));
}

export function subscribeToCookieConsentChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  function handleCookieConsentChange() {
    getCookieConsent();
    onStoreChange();
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) {
      handleCookieConsentChange();
    }
  }

  window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, handleCookieConsentChange);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(
      COOKIE_CONSENT_CHANGED_EVENT,
      handleCookieConsentChange,
    );
    window.removeEventListener("storage", handleStorage);
  };
}

export function dispatchCookieConsentChange(consent: CookieConsent) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<CookieConsentChangeDetail>(COOKIE_CONSENT_CHANGED_EVENT, {
      detail: {
        consent,
      },
    }),
  );
}
