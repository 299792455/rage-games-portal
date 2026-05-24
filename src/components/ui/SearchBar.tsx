"use client";

import type { ChangeEvent, InputHTMLAttributes } from "react";

type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  onChange: (value: string) => void;
};

export function SearchBar({
  className,
  label = "Buscar juegos",
  name = "search",
  placeholder = "Buscar juegos dificiles...",
  value,
  onChange,
  ...props
}: SearchBarProps) {
  const classes = [
    "w-full rounded-[var(--radius-md)] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus-ring",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <label className="block w-full">
      <span className="sr-only">{label}</span>
      <input
        className={classes}
        name={name}
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  );
}

