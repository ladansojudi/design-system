"use client";

import type React from "react";
import { Fragment } from "react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { Breadcrumb as UIBreadcrumb, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// ── Breadcrumb ─────────────────────────────────────────────────────────────

type CrumbItem =
  | { type: "link"; label: string; state?: "default" | "hover" | "visited" }
  | { type: "current"; label: string };

function Breadcrumb({ items }: { items: CrumbItem[] }) {
  // Renders the shipped components; "hover" is a forced visual state for docs.
  return (
    <UIBreadcrumb>
      {items.map((item, i) => (
        <Fragment key={i}>
          {i > 0 && <BreadcrumbSeparator />}
          {item.type === "link" ? (
            <BreadcrumbItem
              href="#"
              visited={item.state === "visited"}
              className={item.state === "hover" ? "text-snt-brand-primary-500 underline underline-offset-2" : undefined}
            >
              {item.label}
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem isCurrent>{item.label}</BreadcrumbItem>
          )}
        </Fragment>
      ))}
    </UIBreadcrumb>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function BreadcrumbShowcase() {
  return (
    <div className="space-y-10">

      {/* Depth */}
      <div>
        <SectionTitle>Depth</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-5">
          <Breadcrumb items={[
            { type: "link",    label: "Root"    },
            { type: "current", label: "Current" },
          ]} />
          <Breadcrumb items={[
            { type: "link",    label: "Root"    },
            { type: "link",    label: "Link"    },
            { type: "current", label: "Current" },
          ]} />
          <Breadcrumb items={[
            { type: "link",    label: "Root"    },
            { type: "link",    label: "Link"    },
            { type: "link",    label: "Link"    },
            { type: "current", label: "Current" },
          ]} />
        </div>
      </div>

      {/* States */}
      <div>
        <SectionTitle>States</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5 space-y-5">

          <div className="space-y-1.5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">Default</p>
            <Breadcrumb items={[
              { type: "link",    label: "Root"    },
              { type: "link",    label: "Link"    },
              { type: "current", label: "Current" },
            ]} />
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">Hover</p>
            <Breadcrumb items={[
              { type: "link",    label: "Root", state: "hover" },
              { type: "link",    label: "Link"                  },
              { type: "current", label: "Current"               },
            ]} />
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">Visited</p>
            <Breadcrumb items={[
              { type: "link",    label: "Root", state: "visited" },
              { type: "link",    label: "Link"                    },
              { type: "current", label: "Current"                 },
            ]} />
          </div>

        </div>
      </div>

    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function BreadcrumbExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Three levels"
        density="tight"
        code={`<Breadcrumb>
  <BreadcrumbLink href="/">Root</BreadcrumbLink>
  <BreadcrumbLink href="/link">Link</BreadcrumbLink>
  <BreadcrumbItem current>Current</BreadcrumbItem>
</Breadcrumb>`}
        preview={
          <Breadcrumb items={[
            { type: "link",    label: "Root"    },
            { type: "link",    label: "Link"    },
            { type: "current", label: "Current" },
          ]} />
        }
      />
      <ExampleCard
        title="Two levels"
        density="tight"
        code={`<Breadcrumb>
  <BreadcrumbLink href="/">Root</BreadcrumbLink>
  <BreadcrumbItem current>Current</BreadcrumbItem>
</Breadcrumb>`}
        preview={
          <Breadcrumb items={[
            { type: "link",    label: "Root"    },
            { type: "current", label: "Current" },
          ]} />
        }
      />
      <ExampleCard
        title="With visited link"
        density="tight"
        code={`<Breadcrumb>
  <BreadcrumbLink href="/" state="visited">Root</BreadcrumbLink>
  <BreadcrumbLink href="/link">Link</BreadcrumbLink>
  <BreadcrumbItem current>Current</BreadcrumbItem>
</Breadcrumb>`}
        preview={
          <Breadcrumb items={[
            { type: "link",    label: "Root", state: "visited" },
            { type: "link",    label: "Link"                    },
            { type: "current", label: "Current"                 },
          ]} />
        }
      />
    </div>
  );
}
