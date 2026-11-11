"use client";

import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { FigmaMark } from "@/components/styleguide/open-in-figma";
import { figmaUrlFor } from "@/components/styleguide/figma-data";

/** Top of a Specs tab: points designers to the Figma component first. */
export function FigmaNote({ component }: { component: string }) {
  const pathname = usePathname();
  const href = figmaUrlFor(pathname?.split("/").filter(Boolean)[1] ?? "");
  // Components not in the Figma library yet get no note: the values below are the spec.
  if (!href) return null;
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-snt-border-default bg-snt-bg-subtle px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-xl text-snt-14 leading-relaxed text-snt-text-secondary">
        Reference values for reviewing and QA. To design with the {component.toLowerCase()}, use the component in the
        Figma library — it carries these values for you.
      </p>
      {(
        <a href={href} target="_blank" rel="noreferrer" className={`relative shrink-0 ${buttonVariants({ intent: "neutral", variant: "outline", size: "sm" })}`}>
          <FigmaMark />
          Open in Figma
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
