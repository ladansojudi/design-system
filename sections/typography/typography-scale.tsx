import { typographyScale } from "@/components/styleguide/typography-data";
import { cn } from "@/lib/utils";

const PREVIEW = "Almost before we knew it, we had left the ground.";

const WEIGHTS = [
  { label: "Regular", className: "font-normal" },
  { label: "Medium", className: "font-medium" },
  { label: "SemiBold", className: "font-semibold" },
  { label: "Bold", className: "font-bold" },
] as const;

export function TypographyScale() {
  return (
    <div>
      {/* Font showcase — Inter + Aa specimens on one row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-10 border-b border-s4e-neutral-divider-10">
        <div>
          <h2 className="text-2xl font-bold text-s4e-brand-primary-500">Inter</h2>
          <p className="mt-4 text-[12px] font-mono leading-relaxed text-s4e-text-secondary break-all">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            1234567890
          </p>
        </div>

        <div className="flex items-end gap-6 sm:gap-10 md:shrink-0 overflow-x-auto s4e-scrollbar-hide -mx-1 px-1">
          {WEIGHTS.map(({ label, className }) => (
            <div key={label} className="flex flex-col items-center gap-2 shrink-0">
              <span
                className={cn(
                  "text-[48px] sm:text-[72px] leading-none text-s4e-text-primary",
                  className
                )}
              >
                Aa
              </span>
              <span className="text-[11px] text-s4e-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Type specimens */}
      <div className="mt-8 border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        {typographyScale.map((entry, i) => (
          <div
            key={`${entry.name}-${i}`}
            className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-6 border-b border-s4e-neutral-divider-10 last:border-b-0 px-4 sm:px-6 md:px-8 py-5 md:py-6"
          >
            <div className="shrink-0 pt-1">
              <div className="text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">
                {entry.name}
              </div>
              <div className="mt-2 space-y-0.5">
                <div className="font-mono text-[10px] text-s4e-text-disabled">
                  {entry.specs.size} · {entry.specs.weight}
                </div>
                <div className="font-mono text-[10px] text-s4e-text-disabled">
                  lh {entry.specs.lineHeight}
                  {entry.specs.letterSpacing
                    ? ` · ls ${entry.specs.letterSpacing}`
                    : ""}
                  {entry.specs.transform ? ` · ${entry.specs.transform}` : ""}
                </div>
              </div>
            </div>

            <div
              className={cn(
                "text-s4e-text-primary min-w-0 truncate",
                entry.className
              )}
            >
              {PREVIEW}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
