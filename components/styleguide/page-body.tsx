"use client";

import { usePathname } from "next/navigation";

import { PageTOC } from "@/components/styleguide/page-toc";
import { InstallationTabs } from "@/components/styleguide/installation-tabs";
import { DeveloperNotes } from "@/components/styleguide/developer-notes";
import { useViewMode } from "@/components/styleguide/view-mode-provider";

// Page body below the hero band: the main content on the left and a sticky
// on-this-page TOC on the right (wide screens only). In Dev mode the shared
// Installation / Developer Notes panels render inside the content column too,
// so they sit under the same TOC and line up with the rest of the page.

export function PageBody({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode } = useViewMode();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 max-w-6xl mx-auto">
      <div className="flex gap-10">
        <div className="flex-1 min-w-0">
          {children}
          {mode === "dev" && (
            <>
              <InstallationTabs key={`install:${pathname}`} />
              <DeveloperNotes key={`devnote:${pathname}`} />
            </>
          )}
        </div>
        <aside className="hidden xl:block w-[208px] shrink-0">
          <div className="sticky top-[68px] max-h-[calc(100vh-92px)] overflow-y-auto s4e-scrollbar-hide">
            <PageTOC />
          </div>
        </aside>
      </div>
    </div>
  );
}
