import { spacingScale, spacingUsage } from "@/components/styleguide/spacing-data";
import { cn } from "@/lib/utils";

export function SpacingScale() {
  return (
    <div>
      {/* Visual bar chart */}
      <div className="flex items-end gap-3 sm:gap-6 pb-6 overflow-x-auto s4e-scrollbar-hide -mx-1 px-1">
        {spacingScale.map(({ label, token, barHeightClass }) => (
          <div key={token} className="flex flex-col items-center gap-3 shrink-0">
            <div
              className={cn(
                "w-10 sm:w-[60px] rounded-sm border border-s4e-brand-primary-200 bg-s4e-brand-primary-100",
                barHeightClass
              )}
            />
            <div className="text-center space-y-1">
              <div className="text-[12px] font-medium text-s4e-text-secondary">
                {label}
              </div>
              <div className="font-mono text-[10px] text-s4e-text-disabled">
                {token}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage table */}
      <div className="mt-10 border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        {spacingUsage.map(({ range, description }) => (
          <div
            key={range}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 md:gap-12 px-4 sm:px-6 md:px-8 py-4 sm:py-5 border-b border-s4e-neutral-divider-10 last:border-b-0"
          >
            <span className="sm:w-24 shrink-0 text-[14px] font-semibold text-s4e-brand-primary-500">
              {range}
            </span>
            <span className="text-[13px] sm:text-[14px] text-s4e-text-secondary">
              {description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
