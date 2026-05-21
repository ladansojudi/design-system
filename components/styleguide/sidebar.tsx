"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobileSidebar } from "@/components/styleguide/mobile-sidebar-provider";

type NavGroup = {
  label: string;
  items: { slug: string; label: string }[];
};

const navGroups: NavGroup[] = [
  {
    label: "FOUNDATIONS",
    items: [
      { slug: "principles",       label: "Design Principles" },
      { slug: "accessibility",    label: "Accessibility" },
      { slug: "contribution",     label: "Contribution Guide" },
      { slug: "component-status", label: "Component Status" },
      { slug: "colors",           label: "Colors & tokens" },
      { slug: "typography",       label: "Typography" },
      { slug: "spacing",          label: "Spacing & grid" },
      { slug: "layout-behavior",  label: "Layout & Behavior" },
    ],
  },
  {
    label: "ATOMS",
    items: [
      { slug: "shadow",         label: "Shadow" },
      { slug: "icons",          label: "Icons" },
      { slug: "button",         label: "Button" },
      { slug: "text-field",     label: "Text field" },
      { slug: "textarea",       label: "Textarea" },
      { slug: "checkbox",       label: "Checkbox" },
      { slug: "select",         label: "Select" },
      { slug: "severity-badge", label: "Severity badge" },
      { slug: "switch-radio",   label: "Switch · Radio" },
      { slug: "toast-tooltip",  label: "Toast · Tooltip" },
      { slug: "badge-tag",      label: "Badge · Tag" },
      { slug: "alert",          label: "Alert" },
      { slug: "banner",         label: "Banner" },
      { slug: "spinner",        label: "Spinner" },
      { slug: "skeleton",       label: "Skeleton" },
    ],
  },
  {
    label: "PATTERNS",
    items: [
      { slug: "dashboard", label: "Dashboard" },
    ],
  },
  {
    label: "MOLECULES",
    items: [
      { slug: "search-bar", label: "Search bar" },
      { slug: "tabs",       label: "Tabs" },
      { slug: "breadcrumb", label: "Breadcrumb" },
      { slug: "filter-bar", label: "Filter bar" },
    ],
  },
  {
    label: "ORGANISMS",
    items: [
      { slug: "sidebar",     label: "Sidebar" },
      { slug: "top-bar",     label: "Top bar" },
      { slug: "text-space",  label: "Text Space" },
      { slug: "data-table",  label: "Data table" },
      { slug: "cards",       label: "Cards" },
      { slug: "chart",       label: "Chart" },
      { slug: "modal",       label: "Modal" },
      { slug: "empty-state", label: "Empty state" },
      { slug: "gauge",       label: "Gauge" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useMobileSidebar();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}
      <aside
        className={cn(
          "flex flex-col h-full border-r border-s4e-neutral-divider-10 bg-s4e-neutral-grey-00",
          "fixed inset-y-0 left-0 z-40 w-[260px] transition-transform duration-200 ease-out",
          "md:static md:z-auto md:w-[230px] md:min-w-[230px] md:translate-x-0 md:transition-none",
          open ? "translate-x-0 shadow-xl" : "-translate-x-full",
        )}
      >
        <div className="h-[52px] px-4 flex flex-col justify-center border-b border-s4e-neutral-divider-10 shrink-0">
          <div className="text-[12px] font-semibold tracking-tight text-s4e-text-primary">
            Design System
          </div>
          <div className="mt-0.5 text-[10.5px] text-s4e-text-secondary">
            by Laden Sojudi
          </div>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <nav className="py-1">
            {navGroups.map((group) => (
              <div key={group.label}>
                <div className="px-4 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-s4e-text-disabled">
                  {group.label}
                </div>
                {group.items.map((item) => {
                  const href = `/styleguide/${item.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={item.slug}
                      href={href}
                      className={cn(
                        "flex items-center w-full text-[12px] px-4 py-[4px] border-l-2 transition-colors duration-100",
                        isActive
                          ? "text-s4e-brand-primary-500 border-l-s4e-brand-primary-500 bg-s4e-surface-row-hover"
                          : "text-s4e-text-secondary border-l-transparent hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="px-4 py-2.5 border-t border-s4e-neutral-divider-10 shrink-0 space-y-1">
          <div className="flex items-center">
            <span className="s4e-pulse-dot inline-block size-[6px] rounded-full bg-s4e-scale-green-500 shrink-0" />
            <span className="ml-2 text-[11px] text-s4e-text-secondary">Work in progress</span>
          </div>
          <a
            href="mailto:ladansojudi2@gmail.com"
            className="block text-[10px] text-s4e-text-disabled hover:text-s4e-brand-primary-500 transition-colors truncate"
          >
            ladansojudi2@gmail.com
          </a>
        </div>
      </aside>
    </>
  );
}
