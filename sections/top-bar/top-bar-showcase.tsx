"use client";

import type React from "react";
import { useState } from "react";
import { Bell, CircleHelp, FileSearch, LogOut, Menu as MenuIcon, Moon, RefreshCw, Search, Settings, ShieldAlert, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CommandPalette } from "@/components/ui/command-palette";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-4 text-snt-16 font-semibold tracking-tight text-snt-text-primary">{children}</h3>;
}

const iconButton =
  "relative flex size-8 items-center justify-center rounded-md text-snt-text-secondary transition-colors hover:bg-snt-bg-subtle hover:text-snt-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring [&_svg]:size-4";

// ── Ask AI ─────────────────────────────────────────────────────────────────

function AskAIButton() {
  return (
    <button
      type="button"
      className="snt-ai-button inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-snt-12 font-medium focus-visible:outline-none"
    >
      <Sparkles size={14} aria-hidden className="snt-ai-icon" />
      Ask AI
      <kbd className="hidden rounded border border-snt-border-default px-1 font-mono text-snt-10 text-snt-text-secondary @3xl:inline">⌘J</kbd>
    </button>
  );
}

// ── Top bar ────────────────────────────────────────────────────────────────

function TopBar({ onSearch }: { onSearch?: () => void }) {
  return (
    <div className="@container">
    <header className="flex h-14 items-center gap-3 rounded-xl border border-snt-border-default bg-snt-surface-app px-3 shadow-snt-control">
      {/* Left: navigation + where you are */}
      <button type="button" aria-label="Open navigation" className={cn(iconButton, "@xl:hidden")}>
        <MenuIcon aria-hidden />
      </button>
      <Breadcrumb aria-label="Breadcrumb" className="hidden min-w-0 shrink-0 whitespace-nowrap @xl:block [&_ol]:flex-nowrap">
        <BreadcrumbItem href="#">Scans</BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem isCurrent>Weekly external scan</BreadcrumbItem>
      </Breadcrumb>

      {/* Centre: global search */}
      <button
        type="button"
        onClick={onSearch}
        aria-label="Search (⌘K)"
        className="mx-auto hidden h-8 w-full max-w-sm items-center gap-2 rounded-md border border-snt-border-default bg-snt-bg-subtle px-2.5 text-left text-snt-12 text-snt-text-secondary transition-colors hover:border-snt-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring @2xl:flex"
      >
        <Search size={14} aria-hidden className="shrink-0" />
        <span className="flex-1 truncate">Search assets, findings, CVEs…</span>
        <kbd className="rounded border border-snt-border-default bg-snt-surface-app px-1.5 py-0.5 font-mono text-snt-10">⌘K</kbd>
      </button>

      {/* Right: environment, helpers, account */}
      <div className="ml-auto flex items-center gap-1 @2xl:ml-0">
        <button type="button" onClick={onSearch} aria-label="Search" className={cn(iconButton, "@2xl:hidden")}>
          <Search aria-hidden />
        </button>
        <AskAIButton />
        <span aria-hidden className="mx-1 h-5 w-px bg-snt-border-default" />
        <button type="button" aria-label="Help and documentation" className={cn(iconButton, "hidden @lg:flex")}>
          <CircleHelp aria-hidden />
        </button>
        <button type="button" aria-label="Notifications, 3 unread" className={iconButton}>
          <Bell aria-hidden />
          <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-snt-severity-critical px-1 text-snt-10 font-semibold leading-none text-snt-text-white ring-2 ring-snt-surface-app">3</span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Account menu"
            className="ml-1 flex size-8 items-center justify-center rounded-full bg-snt-bg-brand-subtle text-snt-12 font-semibold text-snt-text-link transition-colors hover:ring-2 hover:ring-snt-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
          >
            SD
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Selin Demir · Security analyst</DropdownMenuLabel>
            <DropdownMenuItem><User />Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings />Settings</DropdownMenuItem>
            <DropdownMenuItem><Moon />Appearance</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive><LogOut />Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

/** Static top bar, for the Anatomy preview. */
export function TopBarAnatomyPreview() {
  return (
    <div className="mx-auto w-[860px] max-w-full">
      <TopBar />
    </div>
  );
}

export function TopBarShowcase() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [last, setLast] = useState("");
  const go = (label: string) => () => setLast(label);

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Interactive</SectionTitle>
        <div className="rounded-xl border border-snt-border-default bg-snt-bg-subtle/40 px-4 py-8 sm:px-6">
          <p className="mb-4 text-center text-snt-12 text-snt-text-secondary">
            Open the search or the account menu. {last && <>Last action: <b className="text-snt-text-primary">{last}</b></>}
          </p>
          <div><TopBar onSearch={() => setSearchOpen(true)} /></div>
        </div>
        <CommandPalette
          open={searchOpen}
          onOpenChange={setSearchOpen}
          placeholder="Search assets, findings, CVEs…"
          items={[
            { id: "a1", label: "payments-api.production.example.com", group: "Assets", icon: <FileSearch />, onSelect: go("Opened asset") },
            { id: "a2", label: "storefront.production.example.com", group: "Assets", icon: <FileSearch />, onSelect: go("Opened asset") },
            { id: "f1", label: "SQL injection in /api/orders", group: "Findings", icon: <ShieldAlert />, onSelect: go("Opened finding") },
            { id: "f2", label: "Remote code execution in Apache Log4j", group: "Findings", icon: <ShieldAlert />, keywords: ["CVE-2021-44228"], onSelect: go("Opened finding") },
            { id: "s1", label: "Re-run last scan", group: "Actions", icon: <RefreshCw />, onSelect: go("Scan started") },
          ]}
        />
      </div>

      <div>
        <SectionTitle>Ask AI</SectionTitle>
        <div className="flex flex-wrap items-center gap-6 rounded-xl border border-snt-border-default px-4 py-8 sm:px-6">
          <div className="space-y-2">
            <p className="text-snt-12 font-medium text-snt-text-secondary">Rest</p>
            <AskAIButton />
          </div>
          <p className="max-w-sm text-snt-12 leading-relaxed text-snt-text-secondary">
            Quiet at rest: a hairline gradient border. On hover or keyboard focus the border brightens and slides and the sparkle twinkles. With reduced motion only the colour changes.
          </p>
        </div>
      </div>
    </div>
  );
}
