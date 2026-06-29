type AdSlotType = "banner" | "block" | "interstitial";

type AdSlotProps = {
  label?: string;
  type?: AdSlotType;
  className?: string;
  enabled?: boolean;
};

const sizeClasses: Record<AdSlotType, string> = {
  banner: "min-h-24",
  block: "min-h-48",
  interstitial: "min-h-64",
};

export function AdSlot({
  label = "Espacio publicitario placeholder",
  type = "banner",
  className,
  enabled = false,
}: AdSlotProps) {
  if (enabled !== true) {
    return null;
  }

  const classes = [
    "ad-placeholder-surface flex w-full items-center justify-center rounded-[var(--radius-md)] px-4 py-6 text-center",
    sizeClasses[type],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={classes} data-ad-placeholder="true">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </span>
    </aside>
  );
}

