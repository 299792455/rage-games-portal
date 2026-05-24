import type { Game } from "@/types";

import { DifficultyBadge } from "./DifficultyBadge";
import { RageLevel } from "./RageLevel";

type GameCardProps = {
  game: Game;
  href?: string;
  showFavoriteAction?: boolean;
  className?: string;
};

export function GameCard({
  game,
  href,
  showFavoriteAction = true,
  className,
}: GameCardProps) {
  const classes = [
    "group block overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-slate-950/70 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:shadow-[0_0_28px_rgba(34,211,238,0.16)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <a href={href ?? `/juegos/${game.slug}`} className="block focus-ring">
        <div className="relative aspect-[16/10] overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.28),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.24),transparent_32%),linear-gradient(135deg,rgba(15,23,42,1),rgba(76,5,25,0.8))]">
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-100">
            {game.thumbnail.src}
          </div>
          {showFavoriteAction ? (
            <span
              aria-label="Favorito local pendiente"
              className="absolute right-3 top-3 h-9 w-9 rounded-full border border-white/15 bg-black/35 text-sm font-bold text-white/80"
              role="img"
            >
              +
            </span>
          ) : null}
        </div>

        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">
              {game.category}
            </p>
            <h3 className="line-clamp-2 text-lg font-bold text-white">
              {game.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-6 text-slate-400">
              {game.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <DifficultyBadge level={game.difficultyLevel} />
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {game.inputType}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
            <RageLevel level={game.rageLevel} />
            <span className="text-xs font-semibold text-slate-500">
              {game.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}
