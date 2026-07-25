"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useId, useState } from "react";

type HeaderNavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  navItems?: HeaderNavItem[];
  searchSlot?: ReactNode;
};

const defaultNavItems: HeaderNavItem[] = [
  { label: "Juegos", href: "/juegos" },
  { label: "Categorías", href: "/categorias" },
  { label: "Populares", href: "/populares" },
  { label: "Favoritos", href: "/favoritos" },
  { label: "Ayuda", href: "/ayuda" },
];

type HeaderSearchFormProps = {
  onSearchSubmit?: (query: string) => void;
};

function HeaderSearchForm({ onSearchSubmit }: HeaderSearchFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!onSearchSubmit) {
      return;
    }

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim().slice(0, 120);

    onSearchSubmit(query);
  }

  return (
    <form
      action="/buscar"
      className="flex w-full gap-2"
      method="GET"
      onSubmit={handleSubmit}
      role="search"
    >
      <label className="min-w-0 flex-1">
        <span className="sr-only">Buscar juegos</span>
        <input
          autoComplete="off"
          className="h-10 w-full rounded-[var(--radius-md)] border border-white/10 bg-slate-950/70 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus-ring"
          maxLength={120}
          name="q"
          placeholder="Buscar juegos..."
          type="search"
        />
      </label>
      <button
        className="inline-flex h-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/35 bg-cyan-300/10 px-3 text-xs font-black uppercase tracking-[0.12em] text-cyan-100 transition hover:bg-cyan-300/20 focus-ring"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}

export function Header({ navItems = defaultNavItems, searchSlot }: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  function closeMobileMenu() {
    setIsMenuOpen(false);
  }

  function handleMobileSearchSubmit(query: string) {
    router.push(query ? `/buscar?q=${encodeURIComponent(query)}` : "/buscar");
    closeMobileMenu();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="container-page flex min-h-16 items-center justify-between gap-4 py-3 lg:min-h-20 lg:py-4">
        <Link className="flex items-center gap-3 focus-ring" href="/">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-cyan-300/35 bg-slate-950 shadow-[var(--glow-cyan)]">
            <Image
              alt="Logo Juegos Difíciles"
              className="h-full w-full object-cover"
              height={44}
              priority
              src="/apple-touch-icon.png"
              width={44}
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-black text-white">
              JuegosDificiles.com
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Juegos difíciles online
            </span>
          </span>
        </Link>

        <nav
          aria-label="Navegacion principal"
          className="hidden flex-wrap items-center gap-2 text-sm font-semibold text-slate-300 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white focus-ring"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden w-full lg:block lg:max-w-xs">
          {searchSlot ?? <HeaderSearchForm />}
        </div>

        <button
          aria-controls={mobileMenuId}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 transition hover:bg-cyan-300/20 focus-ring lg:hidden"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          type="button"
        >
          <span className="sr-only">{isMenuOpen ? "Cerrar" : "Abrir"}</span>
          <span
            aria-hidden="true"
            className="flex h-5 w-5 flex-col justify-center gap-1.5"
          >
            <span
              className={[
                "h-0.5 w-5 rounded-full bg-current transition",
                isMenuOpen ? "translate-y-2 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 w-5 rounded-full bg-current transition",
                isMenuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 w-5 rounded-full bg-current transition",
                isMenuOpen ? "-translate-y-2 -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <>
          <button
            aria-label="Cerrar menu"
            className="fixed inset-0 top-16 z-40 bg-slate-950/75 backdrop-blur-sm lg:hidden"
            onClick={closeMobileMenu}
            type="button"
          />
          <div className="fixed inset-x-4 top-20 z-50 rounded-[var(--radius-lg)] border border-cyan-300/20 bg-slate-950/95 p-4 shadow-[0_0_42px_rgba(34,211,238,0.16)] lg:hidden">
            <nav
              aria-label="Navegacion movil"
              className="grid gap-2 text-sm font-bold text-slate-200"
              id={mobileMenuId}
            >
              {navItems.map((item) => (
                <Link
                  className="min-h-11 rounded-[var(--radius-md)] px-3 py-3 transition hover:bg-white/5 hover:text-white focus-ring"
                  href={item.href}
                  key={item.href}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-white/10 pt-4">
              {searchSlot ?? (
                <HeaderSearchForm onSearchSubmit={handleMobileSearchSubmit} />
              )}
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
