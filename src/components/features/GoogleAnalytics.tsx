"use client";

import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

import {
  getCookieConsent,
  getServerCookieConsent,
  subscribeToCookieConsentChanges,
} from "@/lib/local-storage/consent";
import {
  initializeGoogleTag,
  trackGooglePageView,
  updateGoogleConsentIfConfigured,
} from "@/lib/analytics/google-tag";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    subscribeToCookieConsentChanges,
    getCookieConsent,
    getServerCookieConsent,
  );
  const analyticsStorage = consent?.analytics_storage;

  useEffect(() => {
    if (!analyticsStorage) {
      return;
    }

    if (analyticsStorage !== "granted") {
      updateGoogleConsentIfConfigured("denied");
      return;
    }

    if (!initializeGoogleTag()) {
      return;
    }

    trackGooglePageView(pathname);
  }, [analyticsStorage, pathname]);

  return null;
}
