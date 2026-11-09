"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useViewMode } from "@/components/styleguide/view-mode-provider";

// ── On-this-page table of contents ──────────────────────────────────────────
//
// Every section heading in the styleguide is rendered as a "▶▶" marker span
// followed by its title element. Rather than touch ~34 showcase files, we
// discover those headings from the DOM at runtime, assign each a stable id,
// and drive a scrollspy off them.
//
// A MutationObserver re-scans whenever <main> changes, so the list stays correct
// across view-mode switches (Design ↔ Dev swap the whole content tree) and after
// async panels like Installation / Developer Notes finish loading in Dev mode.

const MARKER = "▶▶";
const HEADER_OFFSET = 76; // sticky TopBar height + breathing room

type TocItem = { id: string; label: string; level: 1 | 2 };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function collectHeadings(): HTMLElement[] {
  const main = document.querySelector("main");
  if (!main) return [];
  const out: HTMLElement[] = [];
  main.querySelectorAll("span").forEach((marker) => {
    if (marker.textContent?.trim() !== MARKER) return;
    const heading = marker.nextElementSibling as HTMLElement | null;
    const text = heading?.textContent?.trim();
    if (!heading || !text) return;
    if (!heading.id) {
      // Subsection names repeat across groups ("Sizes" …) — keep ids unique.
      let id = slugify(text);
      for (let n = 2; document.getElementById(id); n++) id = `${slugify(text)}-${n}`;
      heading.id = id;
    }
    heading.style.scrollMarginTop = `${HEADER_OFFSET}px`;
    out.push(heading);
  });
  return out;
}

export function PageTOC() {
  const pathname = usePathname();
  const { mode } = useViewMode();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const signatureRef = useRef<string>("");

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    let io: IntersectionObserver | undefined;
    let raf = 0;
    signatureRef.current = "";

    const apply = () => {
      const headings = collectHeadings();
      const signature = headings.map((h) => h.id).join("|");
      // Skip churn from unrelated DOM mutations (hover states, ripples, etc.).
      if (signature === signatureRef.current) return;
      signatureRef.current = signature;

      // h2 = page group, anything else = subsection. Pages without groups stay flat.
      const grouped = headings.some((h) => h.tagName === "H2");
      setItems(
        headings.map((h) => ({
          id: h.id,
          label: h.textContent?.trim() ?? "",
          level: grouped && h.tagName !== "H2" ? 2 : 1,
        })),
      );
      setActive((prev) => (prev && headings.some((h) => h.id === prev) ? prev : headings[0]?.id ?? null));

      io?.disconnect();
      if (headings.length === 0) return;
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          if (visible[0]) setActive((visible[0].target as HTMLElement).id);
        },
        { rootMargin: `-${HEADER_OFFSET}px 0px -70% 0px`, threshold: 0 },
      );
      headings.forEach((h) => io!.observe(h));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    schedule(); // initial scan
    const mo = new MutationObserver(schedule);
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io?.disconnect();
    };
  }, [pathname, mode]);

  const onClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    history.replaceState(null, "", `#${id}`);
  }, []);

  // Not worth a panel for a single heading.
  if (items.length < 2) return null;

  return (
    <nav aria-label="On this page" className="text-snt-12">
      <div className="mb-3 text-snt-11 font-medium text-snt-text-secondary">
        On this page
      </div>
      <ul className="border-l border-snt-border-default">
        {items.map((it, i) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => onClick(e, it.id)}
                className={cn(
                  "block -ml-px border-l-2 py-1 leading-snug transition-colors",
                  it.level === 1 ? "pl-3 font-medium" : "pl-6",
                  it.level === 1 && i > 0 && "mt-2",
                  isActive
                    ? "border-snt-brand-primary-500 text-snt-text-brand"
                    : cn(
                        "border-transparent hover:border-snt-border-strong",
                        it.level === 1
                          ? "text-snt-text-primary"
                          : "text-snt-text-secondary hover:text-snt-text-primary",
                      ),
                )}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
