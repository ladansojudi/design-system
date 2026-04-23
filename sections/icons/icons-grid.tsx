"use client";

import * as React from "react";
import { Check, Search, X } from "lucide-react";
import { iconGroups, type IconComponent } from "@/components/styleguide/icon-data";
import { cn } from "@/lib/utils";

function IconItem({
  name,
  icon: Icon,
}: {
  name: string;
  icon: IconComponent;
}) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleCopy() {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1200);
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "group flex flex-col items-center gap-2.5 p-3 rounded-lg transition-colors duration-100",
        "hover:bg-s4e-surface-row-hover"
      )}
    >
      <div className="flex items-center justify-center size-8">
        {copied ? (
          <Check size={20} className="text-s4e-scale-green-500" />
        ) : (
          <Icon size={20} className="text-s4e-text-primary" />
        )}
      </div>
      <span
        className={cn(
          "font-mono text-[10px] text-center leading-tight break-all",
          copied
            ? "text-s4e-scale-green-500"
            : "text-s4e-text-disabled group-hover:text-s4e-text-secondary"
        )}
      >
        {copied ? "Copied" : name}
      </span>
    </button>
  );
}

export function IconsGrid() {
  const [query, setQuery] = React.useState("");
  const q = query.toLowerCase().trim();

  const filtered = iconGroups
    .map((group) => ({
      ...group,
      icons: q
        ? group.icons.filter((e) => e.name.toLowerCase().includes(q))
        : group.icons,
    }))
    .filter((group) => group.icons.length > 0);

  const totalFiltered = filtered.reduce((n, g) => n + g.icons.length, 0);

  return (
    <div>
      {/* Search */}
      <div className="relative mb-10">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-s4e-text-disabled pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons…"
          className={cn(
            "w-full h-9 pl-8 pr-8 rounded-lg text-sm",
            "bg-s4e-neutral-grey-100 border border-s4e-neutral-divider-10",
            "text-s4e-text-primary placeholder:text-s4e-text-disabled",
            "outline-none focus:border-s4e-brand-primary-500 transition-colors duration-100"
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-s4e-text-disabled hover:text-s4e-text-primary transition-colors duration-100"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Results count when searching */}
      {q && (
        <p className="text-xs text-s4e-text-disabled mb-6">
          {totalFiltered} icon{totalFiltered !== 1 ? "s" : ""} found for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Icon groups */}
      {filtered.length > 0 ? (
        <div className="space-y-12">
          {filtered.map((group) => (
            <section key={group.name}>
              <div className="pb-3 mb-1 border-b border-s4e-neutral-divider-10">
                <h2 className="text-[13px] font-semibold text-s4e-text-primary">
                  {group.name}
                </h2>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))]">
                {group.icons.map((entry) => (
                  <IconItem key={entry.name} name={entry.name} icon={entry.icon} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-sm text-s4e-text-disabled">
          No icons match &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
