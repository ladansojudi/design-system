"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Copyable } from "@/components/styleguide/copyable";
import { type Platform } from "@/components/styleguide/platform-provider";

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

// ── Snippets ──────────────────────────────────────────────────────────────

const LINE_SNIPPETS: Record<Platform, string> = {
  react: `<Skeleton className="h-3 w-48" />`,
  swift: `Skeleton(shape: .line)
    .frame(width: 192, height: 12)`,
  xml:   `<com.s4e.ui.Skeleton
    android:layout_width="192dp"
    android:layout_height="12dp"
    app:shape="line" />`,
};

const BLOCK_SNIPPETS: Record<Platform, string> = {
  react: `<Skeleton className="h-16 w-48" />`,
  swift: `Skeleton(shape: .block)
    .frame(width: 192, height: 64)`,
  xml:   `<com.s4e.ui.Skeleton
    android:layout_width="192dp"
    android:layout_height="64dp"
    app:shape="block" />`,
};

const AVATAR_SNIPPETS: Record<Platform, string> = {
  react: `<Skeleton className="h-10 w-10 rounded-full" />`,
  swift: `Skeleton(shape: .circle)
    .frame(width: 40, height: 40)`,
  xml:   `<com.s4e.ui.Skeleton
    android:layout_width="40dp"
    android:layout_height="40dp"
    app:shape="circle" />`,
};

const CARD_SNIPPETS: Record<Platform, string> = {
  react: `<div className="rounded-xl border p-5 space-y-3">
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
</div>`,
  swift: `VStack(alignment: .leading, spacing: 12) {
    HStack(spacing: 12) {
        Skeleton(shape: .circle).frame(width: 40, height: 40)
        VStack(alignment: .leading, spacing: 8) {
            Skeleton(shape: .line).frame(height: 12)
            Skeleton(shape: .line).frame(width: 96, height: 10)
        }
    }
    Skeleton(shape: .line).frame(height: 12)
    Skeleton(shape: .line).frame(height: 12)
    Skeleton(shape: .line).frame(height: 12)
}
.padding(20)`,
  xml: `<LinearLayout
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:padding="20dp">
    <LinearLayout android:orientation="horizontal">
        <com.s4e.ui.Skeleton
            android:layout_width="40dp"
            android:layout_height="40dp"
            app:shape="circle" />
        <com.s4e.ui.Skeleton
            android:layout_width="match_parent"
            android:layout_height="12dp"
            app:shape="line" />
    </LinearLayout>
    <com.s4e.ui.Skeleton
        android:layout_width="match_parent"
        android:layout_height="12dp"
        app:shape="line" />
</LinearLayout>`,
};

const LIST_SNIPPETS: Record<Platform, string> = {
  react: `<ul className="divide-y rounded-xl border">
  {items.map((_, i) => (
    <li key={i} className="flex items-center gap-4 px-4 py-3">
      <Skeleton className="w-8 h-8 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-2.5 w-1/3" />
      </div>
      <Skeleton className="w-16 h-6 rounded-md" />
    </li>
  ))}
</ul>`,
  swift: `List(0..<4) { _ in
    HStack(spacing: 16) {
        Skeleton(shape: .block).frame(width: 32, height: 32)
        VStack(alignment: .leading, spacing: 8) {
            Skeleton(shape: .line).frame(height: 12)
            Skeleton(shape: .line).frame(width: 96, height: 10)
        }
        Spacer()
        Skeleton(shape: .block).frame(width: 64, height: 24)
    }
}`,
  xml: `<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/skeleton_list"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager" />

<!-- item_skeleton_row.xml -->
<LinearLayout android:orientation="horizontal" android:padding="12dp">
    <com.s4e.ui.Skeleton
        android:layout_width="32dp"
        android:layout_height="32dp"
        app:shape="block" />
    <com.s4e.ui.Skeleton
        android:layout_width="0dp"
        android:layout_height="12dp"
        android:layout_weight="1"
        app:shape="line" />
</LinearLayout>`,
};

const TABLE_SNIPPETS: Record<Platform, string> = {
  react: `<div className="overflow-hidden rounded-xl border">
  <div className="bg-s4e-surface-table-header h-9" />
  {rows.map((_, i) => (
    <div key={i} className="grid grid-cols-12 gap-3 px-4 py-3 border-t">
      <Skeleton className="col-span-3 h-3" />
      <Skeleton className="col-span-4 h-3" />
      <Skeleton className="col-span-2 h-3" />
      <Skeleton className="col-span-2 h-3" />
      <Skeleton className="col-span-1 h-3" />
    </div>
  ))}
</div>`,
  swift: `VStack(spacing: 0) {
    Rectangle().frame(height: 36).foregroundColor(.tableHeader)
    ForEach(0..<5) { _ in
        HStack(spacing: 12) {
            Skeleton(shape: .line).frame(maxWidth: .infinity, maxHeight: 12)
            Skeleton(shape: .line).frame(maxWidth: .infinity, maxHeight: 12)
            Skeleton(shape: .line).frame(maxWidth: .infinity, maxHeight: 12)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
        Divider()
    }
}`,
  xml: `<androidx.recyclerview.widget.RecyclerView
    android:id="@+id/skeleton_table"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />

<!-- item_skeleton_table_row.xml -->
<LinearLayout android:orientation="horizontal" android:padding="12dp">
    <com.s4e.ui.Skeleton
        android:layout_width="0dp"
        android:layout_height="12dp"
        android:layout_weight="3"
        app:shape="line" />
    <com.s4e.ui.Skeleton
        android:layout_width="0dp"
        android:layout_height="12dp"
        android:layout_weight="4"
        app:shape="line" />
    <com.s4e.ui.Skeleton
        android:layout_width="0dp"
        android:layout_height="12dp"
        android:layout_weight="2"
        app:shape="line" />
</LinearLayout>`,
};

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
            <Copyable snippets={LINE_SNIPPETS}>
              <Skeleton className="h-3 w-48" />
            </Copyable>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Block</span>
            <Copyable snippets={BLOCK_SNIPPETS}>
              <Skeleton className="h-16 w-48" />
            </Copyable>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-16 text-[10px] uppercase tracking-widest text-s4e-text-disabled">Avatar</span>
            <Copyable snippets={AVATAR_SNIPPETS}>
              <Skeleton className="h-10 w-10 rounded-full" />
            </Copyable>
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Card placeholder</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
          <Copyable snippets={CARD_SNIPPETS} className="block w-full">
            <CardSkeleton />
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>List placeholder</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
          <Copyable snippets={LIST_SNIPPETS} className="block w-full">
            <ListSkeleton />
          </Copyable>
        </div>
      </div>

      <div>
        <SectionTitle>Table placeholder</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
          <Copyable snippets={TABLE_SNIPPETS} className="block w-full">
            <TableSkeleton />
          </Copyable>
        </div>
      </div>
    </div>
  );
}
