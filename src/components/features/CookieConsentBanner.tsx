"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import { Button } from "@/components/ui";
import {
  acceptAnalyticsConsent,
  getCookieConsent,
  getServerCookieConsent,
  rejectAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeToCookieConsentChanges,
} from "@/lib/local-storage/consent";

export function CookieConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeToCookieConsentChanges,
    getCookieConsent,
    getServerCookieConsent,
  );
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);

  if (consent) {
    return null;
  }

  function handleAcceptAnalytics() {
    acceptAnalyticsConsent();
  }

  function handleReject() {
    rejectAnalyticsConsent();
  }

  function handleSavePreferences() {
    saveAnalyticsConsent(isAnalyticsEnabled ? "granted" : "denied");
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <section
        aria-label="Preferencias de cookies"
        className="mx-auto max-w-5xl rounded-[var(--radius-lg)] border border-cyan-300/25 bg-slate-950/95 p-5 shadow-[0_0_42px_rgba(34,211,238,0.18)] backdrop-blur-xl md:p-6"
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">
              Privacidad y cookies
            </p>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">
                Control de cookies
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-300">
                Usamos almacenamiento necesario para que el sitio funcione. Con
                tu permiso, prepararemos analytics para medir el uso global del
                sitio cuando GA4 / Google Tag se integre en la siguiente etapa.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-400">
              <Link
                className="text-cyan-100 transition hover:text-cyan-200 focus-ring"
                href="/cookies"
              >
                Política de cookies
              </Link>
              <Link
                className="text-cyan-100 transition hover:text-cyan-200 focus-ring"
                href="/privacidad"
              >
                Política de privacidad
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button onClick={handleAcceptAnalytics} size="sm">
              Aceptar analytics
            </Button>
            <Button onClick={handleReject} size="sm" variant="ghost">
              Rechazar
            </Button>
            <Button
              aria-expanded={isPreferencesOpen}
              onClick={() => setIsPreferencesOpen((currentValue) => !currentValue)}
              size="sm"
              variant="secondary"
            >
              Configurar
            </Button>
          </div>
        </div>

        {isPreferencesOpen ? (
          <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-black text-white">Necesarias</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Siempre activas. Permiten funciones básicas y preferencias
                    locales del navegador.
                  </p>
                </div>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-black text-cyan-100">
                  Activas
                </span>
              </div>
            </div>

            <div className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-black text-white">Analytics</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Nos ayudará a entender el uso general del sitio cuando GA4 /
                    Google Tag se integre en la etapa correspondiente.
                  </p>
                </div>
                <button
                  aria-pressed={isAnalyticsEnabled}
                  className={[
                    "relative h-7 w-12 shrink-0 rounded-full border transition focus-ring",
                    isAnalyticsEnabled
                      ? "border-cyan-300/60 bg-cyan-300/80"
                      : "border-white/15 bg-slate-800",
                  ].join(" ")}
                  onClick={() =>
                    setIsAnalyticsEnabled((currentValue) => !currentValue)
                  }
                  type="button"
                >
                  <span
                    className={[
                      "absolute top-1 h-5 w-5 rounded-full bg-white transition",
                      isAnalyticsEnabled ? "left-6" : "left-1",
                    ].join(" ")}
                  />
                  <span className="sr-only">
                    {isAnalyticsEnabled
                      ? "Desactivar analytics"
                      : "Activar analytics"}
                  </span>
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <Button onClick={handleSavePreferences} size="sm" variant="primary">
                Guardar preferencias
              </Button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
