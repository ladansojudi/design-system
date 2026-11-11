import { shadowScale } from "@/components/styleguide/shadow-data";
import { cn } from "@/lib/utils";

export function ShadowScale() {
  return (
    <div>
      {/* Visual swatches */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 py-8 px-6 rounded-xl bg-snt-surface-page">
        {shadowScale.map(({ label, utility }) => (
          <div key={label} className="flex flex-col items-center gap-4">
            <div
              className={cn(
                "h-20 w-20 rounded-xl bg-snt-surface-app border border-snt-neutral-divider-10",
                utility,
              )}
            />
            <span className="text-[12px] font-semibold text-snt-text-primary">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Token & usage table */}
      <div className="mt-10 border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-[80px_1fr_1.6fr] gap-6 px-4 sm:px-6 py-3 bg-snt-surface-table-header text-[10px] uppercase tracking-widest font-medium text-snt-text-disabled">
          <span>Level</span>
          <span>Token</span>
          <span>Usage</span>
        </div>
        {shadowScale.map(({ label, token, utility, use }) => (
          <div
            key={token}
            className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr_1.6fr] gap-3 sm:gap-6 px-4 sm:px-6 py-4 border-t border-snt-neutral-divider-10 sm:items-center first:border-t-0 sm:first:border-t"
          >
            <span className="text-[14px] font-semibold text-snt-brand-primary-500">
              {label}
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-mono text-[12px] text-snt-text-primary truncate">
                {token}
              </span>
              <span className="font-mono text-[11px] text-snt-text-disabled truncate">
                {utility}
              </span>
            </div>
            <span className="col-start-2 sm:col-start-auto text-[12px] sm:text-[14px] text-snt-text-secondary">{use}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
