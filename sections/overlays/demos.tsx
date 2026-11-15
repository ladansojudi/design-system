"use client";

import * as React from "react";
import { Copy, FileSearch, MoreHorizontal, Pencil, RefreshCw, Settings, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerBody, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CommandPalette } from "@/components/ui/command-palette";
import { Pagination } from "@/components/ui/pagination";
import { buttonVariants } from "@/components/ui/button";
import { SeverityBadge } from "@/components/ui/severity-badge";

export function PaginationDemo({ pageCount = 20, initial = 1, size }: { pageCount?: number; initial?: number; size?: "sm" | "md" }) {
  const [page, setPage] = React.useState(initial);
  return <Pagination page={page} pageCount={pageCount} onPageChange={setPage} size={size} />;
}

export function DrawerDemo({ side = "right" }: { side?: "left" | "right" }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button intent="neutral" variant="outline" onClick={() => setOpen(true)}>
        {side === "right" ? "Open finding" : "Open from left"}
      </Button>
      <Drawer open={open} onOpenChange={setOpen} side={side}>
        <DrawerHeader onClose={() => setOpen(false)}>
          <DrawerTitle>SQL injection in /api/orders</DrawerTitle>
          <DrawerDescription>Found by the last scan · 2 hours ago</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-4 text-snt-14 text-snt-text-secondary">
          <SeverityBadge severity="critical" />
          <p>The <code className="font-mono text-snt-12">id</code> parameter is concatenated into a query without parameterisation. An attacker can read or change any order.</p>
          <p>Fix: use a prepared statement and validate <code className="font-mono text-snt-12">id</code> as an integer.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button intent="neutral" variant="outline" onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={() => setOpen(false)}>Mark as fixed</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export function DropdownMenuDemo({ align = "start" }: { align?: "start" | "end" }) {
  const [last, setLast] = React.useState("");
  const pick = (v: string) => () => setLast(v);
  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger className={buttonVariants({ intent: "neutral", variant: "outline" })}>
          Actions <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          <DropdownMenuLabel>Scan</DropdownMenuLabel>
          <DropdownMenuItem onSelect={pick("Re-run scan")} shortcut="⌘R"><RefreshCw />Re-run scan</DropdownMenuItem>
          <DropdownMenuItem onSelect={pick("View report")}><FileSearch />View report</DropdownMenuItem>
          <DropdownMenuItem onSelect={pick("Duplicate")}><Copy />Duplicate</DropdownMenuItem>
          <DropdownMenuItem disabled><Settings />Settings (locked)</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive onSelect={pick("Delete scan")}><Trash2 />Delete scan</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="text-snt-12 text-snt-text-secondary" aria-live="polite">{last ? `Chose: ${last}` : "Nothing chosen yet"}</span>
    </div>
  );
}

export function CommandPaletteDemo() {
  const [open, setOpen] = React.useState(false);
  const [last, setLast] = React.useState("");
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const item = (id: string, label: string, group: string, icon: React.ReactNode, hint?: string) => ({
    id, label, group, icon, hint, onSelect: () => setLast(label),
  });
  return (
    <div className="flex items-center gap-3">
      <Button intent="neutral" variant="outline" onClick={() => setOpen(true)}>
        Search… <kbd className="font-mono text-snt-12 text-snt-text-secondary">⌘K</kbd>
      </Button>
      <span className="text-snt-12 text-snt-text-secondary" aria-live="polite">{last ? `Ran: ${last}` : "Nothing run yet"}</span>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={[
          item("scans", "Go to Scans", "Navigate", <FileSearch />, "G S"),
          item("findings", "Go to Findings", "Navigate", <ShieldAlert />, "G F"),
          item("settings", "Open settings", "Navigate", <Settings />),
          item("rescan", "Re-run last scan", "Actions", <RefreshCw />),
          item("rename", "Rename project", "Actions", <Pencil />),
        ]}
      />
    </div>
  );
}
