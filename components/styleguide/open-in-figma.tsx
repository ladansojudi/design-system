"use client";

import { usePathname } from "next/navigation";
import { figmaUrlFor } from "@/components/styleguide/figma-data";

// "Open in Figma" for the current styleguide page. Resolves the Figma page from
// the route (/styleguide/<slug>) via figma-data.ts and hides itself on pages
// that have no Figma counterpart.

export function FigmaMark({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

export function OpenInFigma() {
  const pathname = usePathname();
  const slug = pathname?.split("/").filter(Boolean)[1] ?? "";
  const href = figmaUrlFor(slug);
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded text-snt-12 font-medium text-snt-text-secondary hover:text-snt-text-primary transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
    >
      <FigmaMark size={12} />
      Open in Figma
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
