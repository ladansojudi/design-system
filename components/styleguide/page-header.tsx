import Link from "next/link";

export type ComponentStatus = "alpha" | "beta" | "stable" | "deprecated";

const STATUS_STYLES: Record<ComponentStatus, { label: string; cls: string }> = {
  alpha:      { label: "Alpha",      cls: "bg-s4e-scale-yellow-500/12 text-s4e-scale-yellow-700 border-s4e-scale-yellow-500/20" },
  beta:       { label: "Beta",       cls: "bg-s4e-brand-primary-500/12 text-s4e-brand-primary-500 border-s4e-brand-primary-500/20" },
  stable:     { label: "Stable",     cls: "bg-s4e-scale-green-500/12 text-s4e-scale-green-600 border-s4e-scale-green-500/20" },
  deprecated: { label: "Deprecated", cls: "bg-s4e-scale-red-500/12 text-s4e-scale-red-600 border-s4e-scale-red-500/20" },
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
    <header className="mb-2 sm:mb-4">
      {/* Breadcrumb path */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-1.5 text-[12px] text-s4e-text-disabled">
          <li>
            <Link
              href="/"
              className="hover:text-s4e-text-primary transition-colors"
            >
              Design System
            </Link>
          </li>
          <li aria-hidden className="text-s4e-neutral-grey-300">/</li>
          <li className="text-s4e-text-secondary">{category}</li>
          <li aria-hidden className="text-s4e-neutral-grey-300">/</li>
          <li className="text-s4e-text-primary font-medium">{title}</li>
        </ol>
      </nav>

      {/* Title row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h1 className="text-[28px] sm:text-[32px] font-semibold text-s4e-text-primary leading-[1.15] tracking-tight">
          {title}
        </h1>
        {status && (
          <span
            className={`inline-flex items-center text-[10.5px] font-medium uppercase tracking-[0.06em] px-2 py-[3px] rounded-[5px] border ${STATUS_STYLES[status].cls}`}
          >
            {STATUS_STYLES[status].label}
          </span>
        )}
        {version && (
          <span className="text-[11px] font-mono text-s4e-text-disabled px-1.5 py-0.5 rounded border border-s4e-neutral-divider-10">
            v{version}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-[15px] leading-[1.6] text-s4e-text-secondary max-w-[640px]">
          {description}
        </p>
      )}
    </header>
  );
}
