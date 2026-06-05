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

type TocItem = { id: string; label: string };

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
    if (!heading.id) heading.id = slugify(text);
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

      setItems(headings.map((h) => ({ id: h.id, label: h.textContent?.trim() ?? "" })));
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
    <nav aria-label="On this page" className="text-[12px]">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-s4e-text-disabled">
        On this page
      </div>
      <ul className="border-l border-s4e-neutral-divider-10">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => onClick(e, it.id)}
                className={cn(
                  "block -ml-px border-l-2 pl-3 py-1 leading-snug transition-colors",
                  isActive
                    ? "border-s4e-brand-primary-500 text-s4e-brand-primary-500 font-medium"
                    : "border-transparent text-s4e-text-secondary hover:text-s4e-text-primary hover:border-s4e-neutral-grey-300",
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
