"use client";

import { Menu, X } from "lucide-react";

import { ThemeTabs } from "@/components/styleguide/theme-tabs";
import { useMobileSidebar } from "@/components/styleguide/mobile-sidebar-provider";

export function TopBar() {
  const { open, setOpen } = useMobileSidebar();

  return (
    <div className="sticky top-0 z-sticky bg-s4e-surface-app border-b border-s4e-neutral-divider-10 h-[52px] px-4 md:px-8 flex items-center justify-between md:justify-end gap-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="md:hidden inline-flex items-center justify-center size-9 rounded-md border border-s4e-neutral-divider-10 text-s4e-text-secondary hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100 transition-colors"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      <ThemeTabs />
    </div>
  );
}
