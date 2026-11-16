"use client";

import { ArrowRight, Copy, FileSearch, RefreshCw, Search, Settings, ShieldAlert, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DrawerBody, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SeverityBadge } from "@/components/ui/severity-badge";


// Static, in-flow replicas of overlays that normally render in a portal, so the
// Anatomy markers can sit on real elements.

export function DropdownMenuAnatomyPreview() {
  return (
    <div className="mx-auto w-56 space-y-1">
      <button type="button" aria-haspopup="menu" aria-expanded className={buttonVariants({ intent: "neutral", variant: "outline" }) + " w-full"}>
        Actions
      </button>
      <div role="menu" aria-label="Actions" className="rounded-lg border border-snt-border-default bg-snt-surface-app p-1 shadow-snt-md">
        <DropdownMenuLabel>Scan</DropdownMenuLabel>
        <DropdownMenuItem shortcut="⌘R"><RefreshCw />Re-run scan</DropdownMenuItem>
        <DropdownMenuItem><Copy />Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive><Trash2 />Delete scan</DropdownMenuItem>
      </div>
    </div>
  );
}

export function DrawerAnatomyPreview() {
  return (
    <div className="mx-auto flex h-[360px] w-[360px] max-w-full flex-col overflow-hidden rounded-xl border border-snt-border-default bg-snt-surface-app shadow-snt-xl">
      <DrawerHeader onClose={() => {}}>
        <DrawerTitle>SQL injection</DrawerTitle>
        <DrawerDescription>Found 2 hours ago</DrawerDescription>
      </DrawerHeader>
      <DrawerBody className="space-y-3 text-snt-14 text-snt-text-secondary">
        <SeverityBadge severity="critical" />
        <p>The id parameter is concatenated into a query.</p>
      </DrawerBody>
      <DrawerFooter>
        <Button intent="neutral" variant="outline" size="sm">Close</Button>
        <Button size="sm">Mark as fixed</Button>
      </DrawerFooter>
    </div>
  );
}

export function CommandPaletteAnatomyPreview() {
  return (
    <div className="mx-auto w-[460px] max-w-full overflow-hidden rounded-xl border border-snt-border-default bg-snt-surface-app shadow-snt-xl">
      <div className="flex items-center gap-2 border-b border-snt-border-default px-4">
        <Search size={14} aria-hidden className="text-snt-text-secondary" />
        <input aria-label="Search" readOnly value="scan" className="h-12 w-full bg-transparent text-snt-14 text-snt-text-primary focus:outline-none" />
      </div>
      <ul role="listbox" aria-label="Results" className="p-1.5">
        <li role="presentation" className="px-2.5 pb-1 pt-2 text-snt-11 font-medium uppercase tracking-wide text-snt-text-secondary">Navigate</li>
        <li role="option" aria-selected className="flex items-center gap-2.5 rounded-md bg-snt-bg-subtle px-2.5 py-2 text-snt-14 text-snt-text-primary">
          <FileSearch size={16} aria-hidden /> <span className="flex-1">Go to Scans</span>
          <span className="font-mono text-snt-12 text-snt-text-secondary">G S</span>
        </li>
        <li role="option" aria-selected={false} className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-snt-14 text-snt-text-primary">
          <ShieldAlert size={16} aria-hidden /> <span className="flex-1">Go to Findings</span>
        </li>
        <li role="option" aria-selected={false} className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-snt-14 text-snt-text-primary">
          <Settings size={16} aria-hidden /> <span className="flex-1">Open settings</span>
        </li>
      </ul>
      <div className="flex items-center gap-4 border-t border-snt-border-default px-4 py-2 text-snt-12 text-snt-text-secondary">
        <span><kbd className="font-mono">↑↓</kbd> navigate</span>
        <span><kbd className="font-mono">↵</kbd> select</span>
        <span><kbd className="font-mono">esc</kbd> close</span>
      </div>
    </div>
  );
}

export function ButtonAnatomyPreview() {
  return (
    <div className="mx-auto w-fit">
      <Button>
        <span>Start scan</span>
        <ArrowRight />
      </Button>
    </div>
  );
}
