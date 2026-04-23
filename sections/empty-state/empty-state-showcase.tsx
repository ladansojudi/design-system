"use client";

import type React from "react";
import {
  Inbox, SearchX, AlertTriangle, Lock,
  Plus, RefreshCw, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type EmptyStateTone = "neutral" | "warning" | "alert";
type EmptyStateSize = "sm" | "md";

type EmptyStateAction = {
  label:    string;
  icon?:    React.ComponentType<{ size?: number; className?: string }>;
  onClick?: () => void;
};

type EmptyStateProps = {
  icon:              React.ComponentType<{ size?: number; className?: string }>;
  title:             string;
  description?:      string;
  tone?:             EmptyStateTone;
  size?:             EmptyStateSize;
  primaryAction?:    EmptyStateAction;
  secondaryAction?:  EmptyStateAction;
};

// ── Empty State ────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon,
  title,
  description,
  tone = "neutral",
  size = "md",
  primaryAction,
  secondaryAction,
}: EmptyStateProps) {
  const toneIconWrap = {
    neutral: "bg-s4e-neutral-grey-100 text-s4e-text-secondary",
    warning: "bg-s4e-scale-yellow-50 text-s4e-scale-yellow-600",
    alert:   "bg-s4e-scale-red-50 text-s4e-scale-red-600",
  }[tone];

  const iconBox   = size === "sm" ? "w-10 h-10"   : "w-14 h-14";
  const iconSize  = size === "sm" ? 18            : 24;
  const titleSize = size === "sm" ? "text-[13px]" : "text-[15px]";
  const descSize  = size === "sm" ? "text-[12px]" : "text-[13px]";
  const pad       = size === "sm" ? "px-6 py-8"   : "px-6 py-12";

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center",
      pad,
    )}>
      <div className={cn(
        "rounded-full flex items-center justify-center mb-4 shrink-0",
        iconBox,
        toneIconWrap,
      )}>
        <Icon size={iconSize} />
      </div>

      <div className={cn("font-semibold text-s4e-text-primary", titleSize)}>
        {title}
      </div>

      {description && (
        <p className={cn(
          "mt-1.5 max-w-sm text-s4e-text-secondary leading-relaxed",
          descSize,
        )}>
          {description}
        </p>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="mt-5 flex items-center gap-2">
          {primaryAction && (
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-s4e-brand-primary-500 text-s4e-text-white text-[12px] font-medium hover:bg-s4e-brand-primary-600 transition-colors"
            >
              {primaryAction.icon && <primaryAction.icon size={13} />}
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-app text-s4e-text-primary text-[12px] font-medium hover:bg-s4e-neutral-grey-100 transition-colors"
            >
              {secondaryAction.icon && <secondaryAction.icon size={13} />}
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function EmptyStateShowcase() {
  return (
    <div className="space-y-10">

      {/* Zero data — first run */}
      <div>
        <SectionTitle>No Data Yet</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl">
          <EmptyState
            icon={Inbox}
            title="No scans yet"
            description="Run your first crawler to start collecting assets and security findings."
            primaryAction={{ label: "Start a scan", icon: Plus }}
            secondaryAction={{ label: "Read docs" }}
          />
        </div>
      </div>

      {/* No results — filter */}
      <div>
        <SectionTitle>No Results</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl">
          <EmptyState
            icon={SearchX}
            title="No findings match your filters"
            description="Try widening the severity range or clearing one of the active filters."
            secondaryAction={{ label: "Clear filters", icon: Filter }}
          />
        </div>
      </div>

      {/* Error */}
      <div>
        <SectionTitle>Error</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl">
          <EmptyState
            icon={AlertTriangle}
            tone="alert"
            title="Couldn't load findings"
            description="The request failed while fetching data. Check your connection and try again."
            primaryAction={{ label: "Retry", icon: RefreshCw }}
          />
        </div>
      </div>

      {/* Restricted */}
      <div>
        <SectionTitle>Restricted Access</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl">
          <EmptyState
            icon={Lock}
            tone="warning"
            title="You don't have permission to view this"
            description="Ask a workspace admin to grant you access to the Threat Intelligence module."
            secondaryAction={{ label: "Request access" }}
          />
        </div>
      </div>

      {/* Small / inline variant */}
      <div>
        <SectionTitle>Inline (Small)</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="border border-dashed border-s4e-neutral-divider-10 rounded-lg">
            <EmptyState
              size="sm"
              icon={Inbox}
              title="No enrichments found"
              description="This asset hasn't produced enrichment data yet."
            />
          </div>
        </div>
      </div>

    </div>
  );
}
