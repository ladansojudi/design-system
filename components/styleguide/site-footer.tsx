import Link from "next/link";
import { SentinelMark } from "@/components/styleguide/logo";
import { FIGMA_FILE_URL } from "@/components/styleguide/figma-data";
import { sections } from "@/components/styleguide/nav-data";
import { version } from "@/package.json";

const GITHUB_URL = "https://github.com/ladansojudi/design-system";

const RESOURCES = [
  { label: "Figma library", href: FIGMA_FILE_URL, external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Changelog", href: `${GITHUB_URL}/blob/main/CHANGELOG.md`, external: true },
  { label: "llms.txt", href: "/llms.txt", external: false },
];

const linkClass = "text-snt-14 text-snt-text-secondary transition-colors hover:text-snt-text-primary";

export function SiteFooter() {
  return (
    <footer className="border-t border-snt-border-default">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/styleguide/overview" className="inline-flex items-center gap-2 text-snt-14 font-semibold text-snt-text-primary">
            <SentinelMark size={18} /> Sentinel
          </Link>
          <p className="mt-3 max-w-xs text-snt-14 leading-relaxed text-snt-text-secondary">
            An open design system for cybersecurity products. Designed and built by Ladan Sojudi.
          </p>
          <p className="mt-4 font-mono text-snt-12 text-snt-text-secondary">v{version}</p>
        </div>
        <nav aria-label="Footer: system">
          <h2 className="text-snt-12 font-semibold text-snt-text-primary">System</h2>
          <ul className="mt-3 space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <Link href={s.href} className={linkClass}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer: resources">
          <h2 className="text-snt-12 font-semibold text-snt-text-primary">Resources</h2>
          <ul className="mt-3 space-y-2">
            {RESOURCES.map((r) => (
              <li key={r.label}>
                {r.external ? (
                  <a href={r.href} target="_blank" rel="noreferrer" className={`relative ${linkClass}`}>
                    {r.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <a href={r.href} className={linkClass}>{r.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
