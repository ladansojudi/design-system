"use client";

import { usePathname } from "next/navigation";
import { figmaUrlFor } from "@/components/styleguide/figma-data";

/** Top of a Specs tab: points designers to the Figma component first. */
export function FigmaNote({ component }: { component: string }) {
  const pathname = usePathname();
  // Components not in the Figma library yet get no note: the values below are the spec.
  if (!figmaUrlFor(pathname?.split("/").filter(Boolean)[1] ?? "")) return null;
  return (
    <div className="rounded-xl border border-snt-border-default bg-snt-bg-subtle px-5 py-4">
      <p className="max-w-xl text-snt-14 leading-relaxed text-snt-text-secondary">
        Reference values for reviewing and QA. To design with the {component.toLowerCase()}, use the component in the
        Figma library — it carries these values for you (see Open in Figma at the top of the page).
      </p>
    </div>
  );
}
