import type { ConsentStorageStatus } from "@/types";

type DataLayerCommand = [command: string, ...parameters: unknown[]];

type GoogleConsentModeState = {
  analytics_storage: ConsentStorageStatus;
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
};

declare global {
  interface Window {
    dataLayer?: DataLayerCommand[];
    gtag?: (...args: DataLayerCommand) => void;
  }
}

const GOOGLE_TAG_SCRIPT_ID = "google-tag-script";
const GOOGLE_TAG_SCRIPT_URL = "https://www.googletagmanager.com/gtag/js";

let isGoogleTagConfigured = false;
let isGoogleConsentDefaultSet = false;
let lastTrackedPagePath: string | null = null;
let hasWarnedMissingMeasurementId = false;

function canUseBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function createConsentModeState(
  analyticsStorage: ConsentStorageStatus,
): GoogleConsentModeState {
  return {
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

function ensureDataLayer() {
  if (!canUseBrowser()) {
    return null;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...args: DataLayerCommand) => {
      window.dataLayer?.push(args);
    });

  return window.gtag;
}

function warnMissingMeasurementId() {
  if (
    process.env.NODE_ENV !== "development" ||
    hasWarnedMissingMeasurementId
  ) {
    return;
  }

  hasWarnedMissingMeasurementId = true;
  console.warn(
    "NEXT_PUBLIC_GA_MEASUREMENT_ID no esta definido. Google Analytics no se cargara.",
  );
}

export function getGoogleMeasurementId() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
  return measurementId ? measurementId : null;
}

export function applyDefaultGoogleConsent() {
  if (isGoogleConsentDefaultSet) {
    return;
  }

  const gtag = ensureDataLayer();

  if (!gtag) {
    return;
  }

  gtag("consent", "default", createConsentModeState("denied"));
  isGoogleConsentDefaultSet = true;
}

export function updateGoogleConsent(
  analyticsStorage: ConsentStorageStatus,
) {
  const gtag = ensureDataLayer();

  if (!gtag) {
    return;
  }

  gtag("consent", "update", createConsentModeState(analyticsStorage));
}

export function updateGoogleConsentIfConfigured(
  analyticsStorage: ConsentStorageStatus,
) {
  if (!isGoogleTagConfigured) {
    return;
  }

  updateGoogleConsent(analyticsStorage);
}

function loadGoogleTagScript(measurementId: string) {
  if (!canUseBrowser()) {
    return;
  }

  if (document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.id = GOOGLE_TAG_SCRIPT_ID;
  script.src = `${GOOGLE_TAG_SCRIPT_URL}?id=${encodeURIComponent(
    measurementId,
  )}`;

  document.head.appendChild(script);
}

export function initializeGoogleTag() {
  const measurementId = getGoogleMeasurementId();

  if (!measurementId) {
    warnMissingMeasurementId();
    return false;
  }

  const gtag = ensureDataLayer();

  if (!gtag) {
    return false;
  }

  applyDefaultGoogleConsent();
  updateGoogleConsent("granted");
  loadGoogleTagScript(measurementId);

  if (!isGoogleTagConfigured) {
    gtag("js", new Date());
    gtag("config", measurementId, {
      send_page_view: false,
    });
    isGoogleTagConfigured = true;
  }

  return true;
}

export function trackGooglePageView(pathname: string) {
  const measurementId = getGoogleMeasurementId();

  if (!measurementId || !pathname || lastTrackedPagePath === pathname) {
    return;
  }

  const gtag = ensureDataLayer();

  if (!gtag) {
    return;
  }

  gtag("event", "page_view", {
    page_path: pathname,
    page_location: `${window.location.origin}${pathname}`,
    page_title: document.title,
    send_to: measurementId,
  });
  lastTrackedPagePath = pathname;
}
