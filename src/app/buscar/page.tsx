import Link from "next/link";

import { Footer, Header } from "@/components/layout";
import { AdSlot, Card, CategoryChip, GameCard } from "@/components/ui";
import { categories, games } from "@/data";
import type { DifficultyLevel, Game, InputType } from "@/types";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type SortKey = "novedad" | "nota" | "dificultad";

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Novedad", value: "novedad" },
  { label: "Nota", value: "nota" },
  { label: "Dificultad", value: "dificultad" },
];

const difficultyOptions: { label: string; value: DifficultyLevel }[] = [
  { label: "Dificil", value: 3 },
  { label: "Extremo", value: 4 },
  { label: "Imposible", value: 5 },
];

const inputOptions: { label: string; value: InputType }[] = [
  { label: "Teclado", value: "keyboard" },
  { label: "Mouse", value: "mouse" },
  { label: "Tactil", value: "touch" },
  { label: "One touch", value: "one-touch" },
  { label: "Teclado + mouse", value: "keyboard-mouse" },
];

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function normalize(value: string | undefined) {
  return value?.trim().toLowerCase() ?? "";
}

function createSearchHref(
  currentParams: Record<string, string | string[] | undefined>,
  updates: Record<string, string | undefined>,
) {
  const nextParams = new URLSearchParams();

  Object.entries(currentParams).forEach(([key, value]) => {
    const normalizedValue = Array.isArray(value) ? value[0] : value;

    if (normalizedValue) {
      nextParams.set(key, normalizedValue);
    }
  });

  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }
  });

  const query = nextParams.toString();

  return query ? `/buscar?${query}` : "/buscar";
}

function filterGames(
  catalogGames: Game[],
  params: Record<string, string | string[] | undefined>,
) {
  const query = normalize(getParam(params, "q"));
  const category = getParam(params, "categoria");
  const difficulty = Number(getParam(params, "dificultad"));
  const input = getParam(params, "control");
  const device = getParam(params, "dispositivo");
  const traps = getParam(params, "trampas");
  const speedrun = getParam(params, "speedrun");

  return catalogGames.filter((game) => {
    const matchesQuery =
      !query ||
      [
        game.title,
        game.description,
        game.category,
        game.inputType,
        ...game.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesCategory = !category || game.category === category;
    const matchesDifficulty =
      !difficulty || game.difficultyLevel === difficulty;
    const matchesInput = !input || game.inputType === input;
    const matchesDevice =
      !device ||
      (device === "mobile-ok" && game.isMobileFriendly) ||
      (device === "desktop-recommended" && game.isDesktopRecommended);
    const matchesTraps = !traps || game.hasHiddenTraps;
    const matchesSpeedrun = !speedrun || game.speedrunFriendly;

    return (
      matchesQuery &&
      matchesCategory &&
      matchesDifficulty &&
      matchesInput &&
      matchesDevice &&
      matchesTraps &&
      matchesSpeedrun
    );
  });
}

function sortGames(catalogGames: Game[], sort: string | undefined) {
  return [...catalogGames].sort((firstGame, secondGame) => {
    if (sort === "novedad") {
      return (
        new Date(secondGame.createdAt).getTime() -
        new Date(firstGame.createdAt).getTime()
      );
    }

    if (sort === "nota") {
      return secondGame.rating - firstGame.rating;
    }

    if (sort === "dificultad") {
      return secondGame.difficultyLevel - firstGame.difficultyLevel;
    }

    return (
      new Date(secondGame.createdAt).getTime() -
      new Date(firstGame.createdAt).getTime()
    );
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getParam(params, "q") ?? "";
  const sort = getParam(params, "orden") ?? "novedad";
  const results = sortGames(filterGames(games, params), sort);
  const activeCategory = getParam(params, "categoria");
  const activeDifficulty = getParam(params, "dificultad");
  const activeInput = getParam(params, "control");
  const activeDevice = getParam(params, "dispositivo");

  return (
    <>
      <Header />

      <main className="rage-grid-bg">
        <section className="container-page space-y-8 py-12 lg:py-16">
          <div className="max-w-4xl space-y-5">
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              Busqueda interna
            </p>
            <div className="space-y-4">
              <h1 className="text-5xl font-black leading-[0.95] text-white md:text-6xl">
                Buscar juegos dificiles
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Encuentra juegos por nombre, categoria, tags, controles,
                dificultad, compatibilidad movil o tipo de reto.
              </p>
            </div>
          </div>

          <Card className="p-6" variant="glass">
            <form action="/buscar" className="grid gap-4 lg:grid-cols-[1fr_auto]">
              <label className="block">
                <span className="sr-only">Buscar juegos</span>
                <input
                  className="w-full rounded-[var(--radius-md)] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus-ring"
                  defaultValue={query}
                  name="q"
                  placeholder="Busca por nombre, tag o tipo de reto..."
                  type="search"
                />
              </label>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)]"
                type="submit"
              >
                Buscar
              </button>
            </form>
          </Card>
        </section>

        <section className="container-page grid gap-5 py-6 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-5">
            <Card className="p-5" variant="panel">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
                  Refinar
                </p>
                <Link
                  className="text-xs font-bold text-slate-400 hover:text-cyan-100 focus-ring"
                  href="/buscar"
                >
                  Limpiar
                </Link>
              </div>

              <div className="mt-5 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Categorias
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <CategoryChip
                        active={activeCategory === category.slug}
                        href={createSearchHref(params, {
                          categoria:
                            activeCategory === category.slug
                              ? undefined
                              : category.slug,
                        })}
                        key={category.slug}
                      >
                        {category.name}
                      </CategoryChip>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Dificultad
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {difficultyOptions.map((option) => (
                      <Link
                        className={[
                          "rounded-full border px-3 py-1 text-xs font-bold transition focus-ring",
                          activeDifficulty === String(option.value)
                            ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35",
                        ].join(" ")}
                        href={createSearchHref(params, {
                          dificultad:
                            activeDifficulty === String(option.value)
                              ? undefined
                              : String(option.value),
                        })}
                        key={option.value}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Controles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {inputOptions.map((option) => (
                      <Link
                        className={[
                          "rounded-full border px-3 py-1 text-xs font-bold transition focus-ring",
                          activeInput === option.value
                            ? "border-violet-300/50 bg-violet-300/15 text-violet-100"
                            : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-300/35",
                        ].join(" ")}
                        href={createSearchHref(params, {
                          control:
                            activeInput === option.value
                              ? undefined
                              : option.value,
                        })}
                        key={option.value}
                      >
                        {option.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                    Dispositivo y reto
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-bold transition focus-ring",
                        activeDevice === "mobile-ok"
                          ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35",
                      ].join(" ")}
                      href={createSearchHref(params, {
                        dispositivo:
                          activeDevice === "mobile-ok"
                            ? undefined
                            : "mobile-ok",
                      })}
                    >
                      Mobile OK
                    </Link>
                    <Link
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-bold transition focus-ring",
                        activeDevice === "desktop-recommended"
                          ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35",
                      ].join(" ")}
                      href={createSearchHref(params, {
                        dispositivo:
                          activeDevice === "desktop-recommended"
                            ? undefined
                            : "desktop-recommended",
                      })}
                    >
                      Desktop recomendado
                    </Link>
                    <Link
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300 transition hover:border-rose-300/35 focus-ring"
                      href={createSearchHref(params, { trampas: "1" })}
                    >
                      Trampas ocultas
                    </Link>
                    <Link
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300 transition hover:border-rose-300/35 focus-ring"
                      href={createSearchHref(params, { speedrun: "1" })}
                    >
                      Speedrun friendly
                    </Link>
                  </div>
                </div>
              </div>
            </Card>

            <AdSlot label="AdSlot placeholder - buscar" type="block" />
          </aside>

          <section className="space-y-6">
            <Card className="p-5" variant="panel">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-bold text-white">
                    {results.length} resultados
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Busqueda por URL, sin guardar historial ni preferencias.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <Link
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-bold transition focus-ring",
                        sort === option.value
                          ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35",
                      ].join(" ")}
                      href={createSearchHref(params, { orden: option.value })}
                      key={option.value}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            {results.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((game) => (
                  <GameCard game={game} key={game.slug} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center" variant="glass">
                <h2 className="text-2xl font-black text-white">
                  Ningun reto encontrado
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Cambia el texto de busqueda, elimina algun filtro o vuelve al
                  catalogo completo para descubrir mas juegos.
                </p>
                <Link
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-md)] border border-cyan-300/40 bg-cyan-300 px-5 text-sm font-black text-slate-950 shadow-[var(--glow-cyan)] focus-ring"
                  href="/juegos"
                >
                  Ver catalogo
                </Link>
              </Card>
            )}
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
