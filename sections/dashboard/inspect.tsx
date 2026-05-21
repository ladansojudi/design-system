"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Inspectable — every composed dashboard region is permanently labelled with a
 * chip that links to the source component's styleguide page. Click any region
 * to jump to where its code lives.
 */
export function Inspectable({
  slug,
  label,
  children,
  className,
}: {
  slug:   string;
  label:  string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative group rounded-xl ring-1 ring-dashed ring-s4e-brand-primary-500/30 transition-shadow",
        "hover:ring-2 hover:ring-s4e-brand-primary-500/70",
        className,
      )}
    >
      <Link
        href={`/styleguide/${slug}`}
        className="absolute -top-2.5 left-3 z-dropdown inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-s4e-brand-primary-500 text-s4e-text-on-accent text-[10px] font-medium shadow-s4e-sm hover:bg-s4e-brand-primary-600 transition-colors"
      >
        {label}
        <ArrowUpRight size={11} />
      </Link>
      {children}
    </div>
  );
}
