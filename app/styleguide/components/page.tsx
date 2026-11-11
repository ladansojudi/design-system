import type { Metadata } from "next";
import Link from "next/link";

import { componentGroups } from "@/components/styleguide/nav-data";
import { ComponentPreview } from "@/sections/components-index/component-previews";
import { SiteFooter } from "@/components/styleguide/site-footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Components — Sentinel Design System",
  description: "Every Sentinel component, grouped by what it does: actions, forms, feedback, data display, navigation and overlays.",
};

const STATUS_STYLE = {
  alpha:      "bg-snt-bg-warning-subtle text-snt-text-primary",
  beta:       "bg-snt-bg-brand-subtle text-snt-text-brand",
  deprecated: "bg-snt-bg-error-subtle text-snt-text-error",
} as const;

export default function ComponentsIndexPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h1 className="text-snt-48 font-semibold tracking-tight text-snt-text-primary">Components</h1>
          <p className="mt-4 text-snt-18 leading-relaxed text-snt-text-secondary">
            Accessible building blocks for security products, grouped by what they do. Each one comes with usage
            guidance, specs, code and accessibility notes.
          </p>
        </header>

        <nav aria-label="Component groups" className="mt-8 flex flex-wrap gap-2">
          {componentGroups.map((g) => (
            <a
              key={g.label}
              href={`#${g.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="rounded-full border border-snt-border-default px-3 py-1 text-snt-12 font-medium text-snt-text-secondary transition-colors hover:border-snt-border-strong hover:text-snt-text-primary"
            >
              {g.label} <span className="tabular-nums text-snt-text-secondary">{g.items.length}</span>
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {componentGroups.map((group) => (
            <section key={group.label} aria-labelledby={`group-${group.label}`}>
              <h2
                id={group.label.toLowerCase().replace(/\s+/g, "-")}
                className="scroll-mt-6 text-snt-20 font-semibold tracking-tight text-snt-text-primary"
              >
                <span id={`group-${group.label}`}>{group.label}</span>
              </h2>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li
                    key={item.slug}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-xl border border-snt-border-default bg-snt-surface-app transition-colors",
                      "hover:border-snt-border-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-snt-focus-ring",
                      item.status === "deprecated" && "opacity-70",
                    )}
                  >
                    {/* Inert thumbnail: real components, never focusable inside the card link. */}
                    <div inert className="flex h-40 items-center justify-center overflow-hidden border-b border-snt-border-default bg-snt-bg-subtle p-5">
                      <ComponentPreview slug={item.slug} />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-snt-16 font-semibold text-snt-text-primary">
                          <Link href={`/styleguide/${item.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                            {item.label}
                          </Link>
                        </h3>
                        {item.status && item.status !== "stable" && (
                          <span className={cn("rounded px-1.5 py-0.5 text-snt-11 font-medium capitalize", STATUS_STYLE[item.status])}>
                            {item.status}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="mt-1.5 text-snt-14 leading-relaxed text-snt-text-secondary">{item.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
