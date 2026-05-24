type FooterLink = {
  label: string;
  href: string;
};

const catalogLinks: FooterLink[] = [
  { label: "Juegos", href: "/juegos" },
  { label: "Categorias", href: "/categorias" },
  { label: "Populares", href: "/populares" },
  { label: "Nuevos", href: "/nuevos" },
  { label: "Favoritos", href: "/favoritos" },
];

const supportLinks: FooterLink[] = [
  { label: "Ayuda", href: "/ayuda" },
  { label: "Contacto", href: "/contacto" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
  { label: "Terminos", href: "/terminos" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </h2>
      <ul className="space-y-2 text-sm text-slate-300">
        {links.map((link) => (
          <li key={link.href}>
            <a className="transition hover:text-cyan-100 focus-ring" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="text-lg font-black text-white">Rage Games Portal</p>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Juegos dificiles, rage games y retos de retry para jugar gratis en
            el navegador.
          </p>
        </div>

        <FooterColumn links={catalogLinks} title="Catalogo" />
        <FooterColumn links={supportLinks} title="Soporte" />
        <FooterColumn links={legalLinks} title="Legal" />
      </div>
    </footer>
  );
}

