"use client";

import type React from "react";
import {
  Inbox, SearchX, AlertTriangle, Lock,
  Plus, RefreshCw, Filter,
} from "lucide-react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { EmptyState } from "@/components/ui/empty-state";

// ── Types ──────────────────────────────────────────────────────────────────

// ── Empty State ────────────────────────────────────────────────────────────

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
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
        <div className="border border-snt-neutral-divider-10 rounded-xl">
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
        <div className="border border-snt-neutral-divider-10 rounded-xl">
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
        <div className="border border-snt-neutral-divider-10 rounded-xl">
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
        <div className="border border-snt-neutral-divider-10 rounded-xl">
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
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="border border-dashed border-snt-neutral-divider-10 rounded-lg">
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

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function EmptyStateExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="No data yet"
        density="tall"
        code={`<EmptyState
  icon={Inbox}
  title="No scans yet"
  description="Run your first crawler to start collecting assets and security findings."
  primaryAction={{ label: "Start a scan", icon: Plus }}
  secondaryAction={{ label: "Read docs" }}
/>`}
        preview={
          <div className="w-full max-w-md">
            <EmptyState
              icon={Inbox}
              title="No scans yet"
              description="Run your first crawler to start collecting assets and security findings."
              primaryAction={{ label: "Start a scan", icon: Plus }}
              secondaryAction={{ label: "Read docs" }}
            />
          </div>
        }
      />
      <ExampleCard
        title="No results (search empty)"
        density="tall"
        code={`<EmptyState
  icon={SearchX}
  title="No findings match your filters"
  description="Try widening the severity range or clearing one of the active filters."
  secondaryAction={{ label: "Clear filters", icon: Filter }}
/>`}
        preview={
          <div className="w-full max-w-md">
            <EmptyState
              icon={SearchX}
              title="No findings match your filters"
              description="Try widening the severity range or clearing one of the active filters."
              secondaryAction={{ label: "Clear filters", icon: Filter }}
            />
          </div>
        }
      />
      <ExampleCard
        title="Error"
        density="tall"
        code={`<EmptyState
  icon={AlertTriangle}
  tone="alert"
  title="Couldn't load findings"
  description="The request failed while fetching data. Check your connection and try again."
  primaryAction={{ label: "Retry", icon: RefreshCw }}
/>`}
        preview={
          <div className="w-full max-w-md">
            <EmptyState
              icon={AlertTriangle}
              tone="alert"
              title="Couldn't load findings"
              description="The request failed while fetching data. Check your connection and try again."
              primaryAction={{ label: "Retry", icon: RefreshCw }}
            />
          </div>
        }
      />
      <ExampleCard
        title="Inline (small)"
        density="default"
        code={`<EmptyState
  size="sm"
  icon={Inbox}
  title="No enrichments found"
  description="This asset hasn't produced enrichment data yet."
/>`}
        preview={
          <div className="w-full max-w-md border border-dashed border-snt-neutral-divider-10 rounded-lg">
            <EmptyState
              size="sm"
              icon={Inbox}
              title="No enrichments found"
              description="This asset hasn't produced enrichment data yet."
            />
          </div>
        }
      />
    </div>
  );
}
