"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { SentinelMark } from "@/components/styleguide/logo";
import { SearchTrigger } from "@/components/styleguide/command-palette";
import { FigmaMark } from "@/components/styleguide/open-in-figma";
import { FIGMA_FILE_URL } from "@/components/styleguide/figma-data";
import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { useMobileSidebar } from "@/components/styleguide/mobile-sidebar-provider";
import { sections, sectionForPath } from "@/components/styleguide/nav-data";

const GITHUB_URL = "https://github.com/ladansojudi/design-system";

function GitHubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

const iconLink =
  "inline-flex items-center justify-center size-9 rounded-md text-snt-text-secondary transition-colors " +
  "hover:text-snt-text-primary hover:bg-snt-bg-subtle " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring";

function ThemeToggle() {
  const { theme, setTheme } = usePreviewTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(iconLink, "cursor-pointer")}
    >
      {dark ? <Sun size={16} aria-hidden /> : <Moon size={16} aria-hidden />}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const active = sectionForPath(pathname)?.id;
  const { open, setOpen } = useMobileSidebar();

  return (
    <header className="sticky top-0 z-sticky shrink-0 border-b border-snt-border-default bg-snt-surface-app/90 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-toast focus:rounded-md focus:bg-snt-surface-app focus:px-3 focus:py-2 focus:text-snt-14 focus:shadow-snt-lg"
      >
        Skip to content
      </a>
      <div className="flex h-14 items-center gap-2 px-4 lg:px-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={cn(iconLink, "md:hidden -ml-1 cursor-pointer")}
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>

        <Link
          href="/styleguide/overview"
          className="mr-4 flex items-center gap-2 rounded-md text-snt-14 font-semibold tracking-tight text-snt-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
        >
          <SentinelMark size={20} />
          Sentinel
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {sections.map((s) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-14 items-center px-3 text-snt-14 font-medium transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-snt-focus-ring",
                      isActive ? "text-snt-text-primary" : "text-snt-text-secondary hover:text-snt-text-primary",
                    )}
                  >
                    {s.label}
                    {isActive && <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-snt-text-primary" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <SearchTrigger />
          <a href={FIGMA_FILE_URL} target="_blank" rel="noreferrer" className={cn(iconLink, "hidden sm:inline-flex")}>
            <FigmaMark size={15} />
            <span className="sr-only">Figma library (opens in a new tab)</span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={cn(iconLink, "hidden sm:inline-flex")}>
            <GitHubMark />
            <span className="sr-only">GitHub (opens in a new tab)</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
