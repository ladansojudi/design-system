export type ComponentStatus = "alpha" | "beta" | "stable" | "deprecated";

const STATUS_STYLES: Record<ComponentStatus, { label: string; cls: string }> = {
  alpha:      { label: "Alpha",      cls: "bg-s4e-scale-yellow-500/15 text-s4e-scale-yellow-700" },
  beta:       { label: "Beta",       cls: "bg-s4e-brand-primary-500/15 text-s4e-brand-primary-500" },
  stable:     { label: "Stable",     cls: "bg-s4e-scale-green-500/15 text-s4e-scale-green-600" },
  deprecated: { label: "Deprecated", cls: "bg-s4e-scale-red-500/15 text-s4e-scale-red-600" },
};

interface PageHeaderProps {
  category:     string;
  title:        string;
  description?: string;
  status?:      ComponentStatus;
  version?:     string;
}

export function PageHeader({ category, title, description, status, version }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10">
      <p className="text-[11px] sm:text-xs uppercase tracking-widest text-s4e-text-disabled mb-1">
        {category}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-s4e-text-primary">{title}</h1>
        {status && (
          <span
            className={`inline-block text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] ${STATUS_STYLES[status].cls}`}
          >
            {STATUS_STYLES[status].label}
          </span>
        )}
        {version && (
          <span className="text-[10px] font-mono text-s4e-text-disabled">v{version}</span>
        )}
      </div>
      {description && (
        <p className="mt-2 text-[13px] sm:text-sm leading-relaxed text-s4e-text-secondary max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
