"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Skeleton primitive ────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block rounded-md bg-s4e-neutral-grey-200 s4e-pulse-dot",
        className,
      )}
    />
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-s4e-neutral-divider-10 p-5 space-y-3 bg-s4e-surface-row">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-2.5 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-11/12" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}

function ListSkeleton() {
  return (
    <ul className="divide-y divide-s4e-neutral-divider-10 border border-s4e-neutral-divider-10 rounded-xl">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 px-4 py-3">
          <Skeleton className="w-8 h-8 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-2.5 w-1/3" />
          </div>
          <Skeleton className="w-16 h-6 rounded-md" />
        </li>
      ))}
    </ul>
  );
}

function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-s4e-neutral-divider-10">
      <div className="bg-s4e-surface-table-header h-9" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-12 gap-3 px-4 py-3 border-t border-s4e-neutral-divider-10">
          <Skeleton className="col-span-3 h-3" />
          <Skeleton className="col-span-4 h-3" />
          <Skeleton className="col-span-2 h-3" />
          <Skeleton className="col-span-2 h-3" />
          <Skeleton className="col-span-1 h-3" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Primitives</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-16 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Line</span>
            <Skeleton className="h-3 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Block</span>
            <Skeleton className="h-16 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Avatar</span>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Card placeholder</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
          <CardSkeleton />
        </div>
      </div>

      <div>
        <SectionTitle>List placeholder</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
          <ListSkeleton />
        </div>
      </div>

      <div>
        <SectionTitle>Table placeholder</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
          <TableSkeleton />
        </div>
      </div>
    </div>
  );
}
