import type { ReactNode } from "react";
import Link from "next/link";

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
  { label: "Clasificaciones", href: "/clasificaciones" },
  { label: "Ayuda", href: "/ayuda" },
];

function HeaderSearchForm() {
  return (
    <form action="/buscar" className="flex w-full gap-2" method="GET" role="search">
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
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="container-page flex min-h-20 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-3 focus-ring" href="/">
          <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/35 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[var(--glow-cyan)]">
            JD
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
          className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300"
        >
          {navItems.map((item) => (
            <a
              className="rounded-full px-3 py-2 transition hover:bg-white/5 hover:text-white focus-ring"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="w-full lg:max-w-xs">
          {searchSlot ?? <HeaderSearchForm />}
        </div>
      </div>
    </header>
  );
}
