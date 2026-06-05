import { PageHeader, type ComponentStatus } from "@/components/styleguide/page-header";
import { cn } from "@/lib/utils";

// Full-bleed hero band that sits at the top of a styleguide page: a faint brand
// tint behind the breadcrumb / title / description and the page tabs, closed off
// by a full-width divider at the tab baseline. The band spans the whole content
// area; the per-page body (content + on-this-page TOC) renders below it.

interface PageHeroProps {
  category:     string;
  title:        string;
  description?: string;
  status?:      ComponentStatus;
  version?:     string;
  /** Right-aligned actions in the title row (e.g. "Open in Figma"). */
  actions?:     React.ReactNode;
  /** Page-level tabs (e.g. <ViewModeTabs />) rendered flush to the band's foot. */
  tabs?:        React.ReactNode;
  /** Full-width inner content (no max-width) — for wide pages like Dashboard. */
  fluid?:       boolean;
}

export function PageHero({ tabs, fluid, ...header }: PageHeroProps) {
  return (
    <div className="bg-s4e-brand-primary-500/[0.05] border-b border-s4e-neutral-divider-10">
      <div
        className={cn(
          "px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10",
          fluid ? "" : "max-w-6xl mx-auto",
          tabs ? "" : "pb-6 sm:pb-8",
        )}
      >
        <PageHeader {...header} />
        {tabs && <div className="mt-10 sm:mt-12">{tabs}</div>}
      </div>
    </div>
  );
}
