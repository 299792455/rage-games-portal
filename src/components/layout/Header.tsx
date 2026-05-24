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
  { label: "Categorias", href: "/categorias" },
  { label: "Populares", href: "/populares" },
  { label: "Clasificaciones", href: "/clasificaciones" },
  { label: "Ayuda", href: "/ayuda" },
];

export function Header({ navItems = defaultNavItems, searchSlot }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="container-page flex min-h-20 flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-3 focus-ring" href="/">
          <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/35 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[var(--glow-cyan)]">
            RG
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-black text-white">
              Rage Games
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Portal
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

        {searchSlot ? <div className="w-full lg:max-w-xs">{searchSlot}</div> : null}
      </div>
    </header>
  );
}
