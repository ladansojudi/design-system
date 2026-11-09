"use client";

import type React from "react";
import { ArrowRight, ChevronDown, Download, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Copyable } from "@/components/styleguide/copyable";
import { ExampleCard } from "@/components/styleguide/example-card";
import { type Platform } from "@/components/styleguide/platform-provider";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────

type Intent = "default" | "primary" | "destructive";
type Style  = "solid" | "outline" | "ghost";
type Size   = "sm" | "md" | "lg";

const INTENT_LABEL: Record<Intent, string> = {
  default:     "Default",
  primary:     "Primary",
  destructive: "Destructive",
};

const STYLE_LABEL: Record<Style, string> = {
  solid:   "Solid",
  outline: "Outline",
  ghost:   "Ghost",
};

const SIZE_TO_SWIFT: Record<Size, string> = { sm: ".small", md: ".regular", lg: ".large" };

// ── Class system (Tailwind-style: base + size + intent×style) ─────────────

const ICON_SIZE: Record<Size, number> = { sm: 13, md: 14, lg: 16 };

// ── Button primitive ───────────────────────────────────────────────────────

function Btn({
  intent  = "primary",
  style   = "solid",
  size    = "md",
  iconPos = "none",
  loading = false,
  disabled,
  label,
  iconOnly,
  Icon,
  className,
}: {
  intent?:   Intent;
  style?:    Style;
  size?:     Size;
  iconPos?:  "none" | "left" | "right";
  loading?:  boolean;
  disabled?: boolean;
  label?:    string;
  iconOnly?: boolean;
  Icon?:     React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
}) {
  // The shipped Button — the matrix shows exactly what the component renders.
  const IconEl = Icon ?? ArrowRight;
  const icon = <IconEl size={ICON_SIZE[size]} aria-hidden />;
  return (
    <Button
      intent={intent}
      variant={style}
      size={size}
      loading={loading}
      disabled={disabled}
      iconOnly={iconOnly}
      aria-label={iconOnly ? (label ?? "Action") : undefined}
      className={className}
    >
      {iconOnly ? icon : (
        <>
          {iconPos === "left" && icon}
          {label ?? "Button"}
          {iconPos === "right" && icon}
        </>
      )}
    </Button>
  );
}

// ── Layout helpers ─────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[100px_minmax(0,1fr)] gap-6 items-center py-4 border-b border-snt-neutral-divider-10 last:border-b-0">
      <span className="text-[10px] font-medium uppercase tracking-widest text-snt-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// ── Snippet builders ───────────────────────────────────────────────────────
//
// Each helper returns one snippet per platform for the same visual variant.
// React = current actual API. Swift / XML = aspirational target APIs for the
// future native libraries, kept consistent so the chips read as a contract.

function variantSnippets(intent: Intent, style: Style, label = STYLE_LABEL[style]): Record<Platform, string> {
  return {
    react: `<Button intent="${intent}" variant="${style}">${label}</Button>`,
    swift: `Button("${label}") { /* action */ }\n    .buttonStyle(.sentinel(.${intent}, .${style}))`,
    xml:   `<com.sentinel.ui.Button\n    android:text="${label}"\n    app:intent="${intent}"\n    app:variant="${style}" />`,
  };
}

function sizeSnippets(style: Style, size: Size, label: string): Record<Platform, string> {
  return {
    react: `<Button intent="primary" variant="${style}" size="${size}">${label}</Button>`,
    swift: `Button("${label}") { /* action */ }\n    .buttonStyle(.sentinel(.primary, .${style}))\n    .controlSize(${SIZE_TO_SWIFT[size]})`,
    xml:   `<com.sentinel.ui.Button\n    android:text="${label}"\n    app:intent="primary"\n    app:variant="${style}"\n    app:size="${size}" />`,
  };
}

function disabledSnippets(style: Style, label: string): Record<Platform, string> {
  return {
    react: `<Button intent="primary" variant="${style}" disabled>${label}</Button>`,
    swift: `Button("${label}") { /* action */ }\n    .buttonStyle(.sentinel(.primary, .${style}))\n    .disabled(true)`,
    xml:   `<com.sentinel.ui.Button\n    android:text="${label}"\n    android:enabled="false"\n    app:intent="primary"\n    app:variant="${style}" />`,
  };
}

function loadingSnippets(intent: Intent, label: string): Record<Platform, string> {
  return {
    react: `<Button intent="${intent}" loading>${label}</Button>`,
    swift: `Button("${label}") { /* action */ }\n    .buttonStyle(.sentinel(.${intent}, .solid))\n    .sentinelLoading(true)`,
    xml:   `<com.sentinel.ui.Button\n    android:text="${label}"\n    app:intent="${intent}"\n    app:loading="true" />`,
  };
}

function leadingIconSnippets(intent: Intent, style: Style, label: string, react: string, sf: string, drawable: string): Record<Platform, string> {
  return {
    react: `<Button intent="${intent}"${style !== "solid" ? ` variant="${style}"` : ""}><${react} size={14} /> ${label}</Button>`,
    swift: `Button { /* action */ } label: {\n    Label("${label}", systemImage: "${sf}")\n}\n.buttonStyle(.sentinel(.${intent}, .${style}))`,
    xml:   `<com.sentinel.ui.Button\n    android:text="${label}"\n    app:intent="${intent}"\n    app:variant="${style}"\n    app:iconStart="@drawable/${drawable}" />`,
  };
}

function trailingIconSnippets(intent: Intent, style: Style, label: string, react: string, sf: string, drawable: string): Record<Platform, string> {
  return {
    react: `<Button intent="${intent}"${style !== "solid" ? ` variant="${style}"` : ""}>${label} <${react} size={14} /></Button>`,
    swift: `Button { /* action */ } label: {\n    HStack(spacing: 6) {\n        Text("${label}")\n        Image(systemName: "${sf}")\n    }\n}\n.buttonStyle(.sentinel(.${intent}, .${style}))`,
    xml:   `<com.sentinel.ui.Button\n    android:text="${label}"\n    app:intent="${intent}"\n    app:variant="${style}"\n    app:iconEnd="@drawable/${drawable}" />`,
  };
}

function iconOnlySnippets(intent: Intent, style: Style, size: Size, aria: string, react: string, sf: string, drawable: string): Record<Platform, string> {
  const sizePart = size === "md" ? "" : ` size="${size}"`;
  return {
    react: `<Button intent="${intent}"${style !== "solid" ? ` variant="${style}"` : ""}${sizePart} iconOnly aria-label="${aria}"><${react} size={${ICON_SIZE[size]}} /></Button>`,
    swift: `Button { /* action */ } label: {\n    Image(systemName: "${sf}")\n}\n.buttonStyle(.sentinel(.${intent}, .${style}))\n.controlSize(${SIZE_TO_SWIFT[size]})\n.sentinelIconOnly()\n.accessibilityLabel("${aria}")`,
    xml:   `<com.sentinel.ui.Button\n    android:contentDescription="${aria}"\n    app:intent="${intent}"\n    app:variant="${style}"\n    app:size="${size}"\n    app:iconOnly="@drawable/${drawable}" />`,
  };
}

// Multi-line group snippets — same shape across all platforms

const SEGMENTED_SNIPPETS: Record<Platform, string> = {
  react: `<ButtonGroup>
  <Button variant="ghost">Day</Button>
  <Button intent="default">Week</Button>
  <Button variant="ghost">Month</Button>
</ButtonGroup>`,
  swift: `Picker("Period", selection: $period) {
    Text("Day").tag(0)
    Text("Week").tag(1)
    Text("Month").tag(2)
}
.pickerStyle(.segmented)`,
  xml: `<com.google.android.material.button.MaterialButtonToggleGroup
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:singleSelection="true">
    <com.sentinel.ui.Button android:text="Day"   app:variant="ghost"   />
    <com.sentinel.ui.Button android:text="Week"  app:intent="default"  />
    <com.sentinel.ui.Button android:text="Month" app:variant="ghost"   />
</com.google.android.material.button.MaterialButtonToggleGroup>`,
};

const SPLIT_SNIPPETS: Record<Platform, string> = {
  react: `<SplitButton>
  <Button intent="primary"><Download size={14} /> Export CSV</Button>
  <Button intent="primary" iconOnly aria-label="More export options">
    <ChevronDown size={14} />
  </Button>
</SplitButton>`,
  swift: `HStack(spacing: 0) {
    Button { /* primary */ } label: {
        Label("Export CSV", systemImage: "square.and.arrow.down")
    }
    Menu { /* more options */ } label: {
        Image(systemName: "chevron.down")
    }
    .sentinelIconOnly()
    .accessibilityLabel("More export options")
}
.buttonStyle(.sentinel(.primary, .solid))`,
  xml: `<LinearLayout
    android:orientation="horizontal"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">
    <com.sentinel.ui.Button
        android:text="Export CSV"
        app:intent="primary"
        app:iconStart="@drawable/ic_download" />
    <com.sentinel.ui.Button
        android:contentDescription="More export options"
        app:intent="primary"
        app:iconOnly="@drawable/ic_chevron_down" />
</LinearLayout>`,
};

const TOOLBAR_SNIPPETS: Record<Platform, string> = {
  react: `<ButtonGroup variant="toolbar">
  <Button variant="ghost" iconOnly aria-label="Edit"><Pencil size={13} /></Button>
  <Button intent="destructive" variant="ghost" iconOnly aria-label="Delete"><Trash2 size={13} /></Button>
  <Button variant="ghost" iconOnly aria-label="More"><MoreHorizontal size={13} /></Button>
</ButtonGroup>`,
  swift: `HStack(spacing: 0) {
    Button { } label: { Image(systemName: "pencil") }
        .buttonStyle(.sentinel(.default, .ghost))
        .sentinelIconOnly()
        .accessibilityLabel("Edit")
    Button { } label: { Image(systemName: "trash") }
        .buttonStyle(.sentinel(.destructive, .ghost))
        .sentinelIconOnly()
        .accessibilityLabel("Delete")
    Button { } label: { Image(systemName: "ellipsis") }
        .buttonStyle(.sentinel(.default, .ghost))
        .sentinelIconOnly()
        .accessibilityLabel("More")
}`,
  xml: `<LinearLayout
    android:orientation="horizontal"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">
    <com.sentinel.ui.Button
        android:contentDescription="Edit"
        app:variant="ghost"
        app:iconOnly="@drawable/ic_pencil" />
    <com.sentinel.ui.Button
        android:contentDescription="Delete"
        app:intent="destructive"
        app:variant="ghost"
        app:iconOnly="@drawable/ic_trash" />
    <com.sentinel.ui.Button
        android:contentDescription="More"
        app:variant="ghost"
        app:iconOnly="@drawable/ic_more" />
</LinearLayout>`,
};

const FULLWIDTH_SNIPPETS: Record<Platform, string> = {
  react: `<Button intent="primary" size="lg" className="w-full">Continue to checkout</Button>`,
  swift: `Button("Continue to checkout") { /* action */ }
    .buttonStyle(.sentinel(.primary, .solid))
    .controlSize(.large)
    .frame(maxWidth: .infinity)`,
  xml: `<com.sentinel.ui.Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Continue to checkout"
    app:intent="primary"
    app:size="lg" />`,
};

// ── Sections ───────────────────────────────────────────────────────────────

function CopyableVariant({ intent, style }: { intent: Intent; style: Style }) {
  return (
    <Copyable
      snippets={variantSnippets(intent, style)}
      svgPath={`/svg/button/${intent}-${style}.svg`}
    >
      <Btn intent={intent} style={style} label={STYLE_LABEL[style]} />
    </Copyable>
  );
}

function VariantsMatrix() {
  const intents = Object.keys(INTENT_LABEL) as Intent[];
  const styles  = Object.keys(STYLE_LABEL)  as Style[];
  return (
    <div>
      <SectionTitle>Variants</SectionTitle>
      <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
        Hover any variant and click the chip to copy its JSX.
      </p>

      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-4">
        {intents.map((intent) => (
          <PropertyRow key={intent} label={INTENT_LABEL[intent]}>
            {styles.map((style) => (
              <CopyableVariant key={style} intent={intent} style={style} />
            ))}
          </PropertyRow>
        ))}
      </div>
    </div>
  );
}

// ── Per-cell expand (kept for possible future use; not rendered today) ─────

function SizesCard() {
  const rows: { style: Style; styleLabel: string }[] = [
    { style: "solid",   styleLabel: "Solid"   },
    { style: "outline", styleLabel: "Outline" },
    { style: "ghost",   styleLabel: "Ghost"   },
  ];
  const cells: { size: Size; label: string }[] = [
    { size: "sm", label: "Small"  },
    { size: "md", label: "Medium" },
    { size: "lg", label: "Large"  },
  ];
  return (
    <div>
      <SectionTitle>Sizes</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-4">
        {rows.map(({ style, styleLabel }) => (
          <PropertyRow key={style} label={styleLabel}>
            {cells.map(({ size, label }) => (
              <Copyable key={size} snippets={sizeSnippets(style, size, label)}>
                <Btn intent="primary" style={style} size={size} label={label} />
              </Copyable>
            ))}
          </PropertyRow>
        ))}
      </div>
    </div>
  );
}

function StatesCard() {
  const styles: Style[] = ["solid", "outline", "ghost"];
  const loadings: { intent: Intent; label: string }[] = [
    { intent: "primary",     label: "Saving…"   },
    { intent: "default",     label: "Working…"  },
    { intent: "destructive", label: "Deleting…" },
  ];
  return (
    <div>
      <SectionTitle>States</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-4">
        <PropertyRow label="Default">
          {styles.map((style) => (
            <Copyable key={style} snippets={variantSnippets("primary", style, "Default")}>
              <Btn intent="primary" style={style} label="Default" />
            </Copyable>
          ))}
        </PropertyRow>
        <PropertyRow label="Disabled">
          {styles.map((style) => (
            <Copyable key={style} snippets={disabledSnippets(style, "Disabled")}>
              <Btn intent="primary" style={style} disabled label="Disabled" />
            </Copyable>
          ))}
        </PropertyRow>
        <PropertyRow label="Loading">
          {loadings.map(({ intent, label }) => (
            <Copyable key={intent} snippets={loadingSnippets(intent, label)}>
              <Btn intent={intent} loading label={label} />
            </Copyable>
          ))}
        </PropertyRow>
      </div>
    </div>
  );
}

function IconCard() {
  return (
    <div>
      <SectionTitle>With icon</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-4">
        <PropertyRow label="Leading">
          <Copyable snippets={leadingIconSnippets("default", "solid", "Export", "Download", "square.and.arrow.down", "ic_download")}>
            <Btn intent="default" iconPos="left" Icon={Download} label="Export" />
          </Copyable>
          <Copyable snippets={leadingIconSnippets("primary", "solid", "Export", "Download", "square.and.arrow.down", "ic_download")}>
            <Btn intent="primary" iconPos="left" Icon={Download} label="Export" />
          </Copyable>
          <Copyable snippets={leadingIconSnippets("destructive", "solid", "Delete", "Trash2", "trash", "ic_trash")}>
            <Btn intent="destructive" iconPos="left" Icon={Trash2} label="Delete" />
          </Copyable>
        </PropertyRow>
        <PropertyRow label="Trailing">
          <Copyable snippets={trailingIconSnippets("default", "solid", "More", "ChevronDown", "chevron.down", "ic_chevron_down")}>
            <Btn intent="default" iconPos="right" Icon={ChevronDown} label="More" />
          </Copyable>
          <Copyable snippets={trailingIconSnippets("primary", "solid", "Continue", "ArrowRight", "arrow.right", "ic_arrow_right")}>
            <Btn intent="primary" iconPos="right" Icon={ArrowRight} label="Continue" />
          </Copyable>
          <Copyable snippets={trailingIconSnippets("primary", "ghost", "Learn more", "ArrowRight", "arrow.right", "ic_arrow_right")}>
            <Btn intent="primary" style="ghost" iconPos="right" Icon={ArrowRight} label="Learn more" />
          </Copyable>
        </PropertyRow>
      </div>
    </div>
  );
}

function IconOnlyCard() {
  const intents: Intent[] = ["default", "primary", "destructive"];
  const iconFor: Record<Intent, { react: string; sf: string; drawable: string; label: string }> = {
    default:     { react: "Pencil", sf: "pencil", drawable: "ic_pencil", label: "Edit"   },
    primary:     { react: "Pencil", sf: "pencil", drawable: "ic_pencil", label: "Edit"   },
    destructive: { react: "Trash2", sf: "trash",  drawable: "ic_trash",  label: "Delete" },
  };
  const renderRow = (style: Style) =>
    intents.map((intent) => {
      const meta = iconFor[intent];
      return (
        <Copyable
          key={intent}
          snippets={iconOnlySnippets(intent, style, "md", meta.label, meta.react, meta.sf, meta.drawable)}
        >
          <Btn intent={intent} style={style} iconOnly Icon={intent === "destructive" ? Trash2 : Pencil} />
        </Copyable>
      );
    });
  return (
    <div>
      <SectionTitle>Icon-only</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-4">
        <PropertyRow label="Solid">{renderRow("solid")}</PropertyRow>
        <PropertyRow label="Outline">{renderRow("outline")}</PropertyRow>
        <PropertyRow label="Ghost">{renderRow("ghost")}</PropertyRow>
        <PropertyRow label="Size">
          {(["sm", "md", "lg"] as Size[]).map((size) => (
            <Copyable
              key={size}
              snippets={iconOnlySnippets("default", "outline", size, "Edit", "Pencil", "pencil", "ic_pencil")}
            >
              <Btn intent="default" style="outline" iconOnly size={size} Icon={Pencil} />
            </Copyable>
          ))}
        </PropertyRow>
      </div>
    </div>
  );
}

function GroupCard() {
  return (
    <div>
      <SectionTitle>Button group</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-4">
        <PropertyRow label="Segmented">
          <Copyable snippets={SEGMENTED_SNIPPETS}>
            <div className="inline-flex rounded-md overflow-hidden border border-snt-neutral-grey-300">
              <button type="button" className="px-3 h-9 text-[14px] font-medium text-snt-text-primary hover:bg-snt-neutral-grey-100 border-r border-snt-neutral-grey-300 cursor-pointer">Day</button>
              <button type="button" className="px-3 h-9 text-[14px] font-medium bg-snt-text-primary text-snt-text-inverse cursor-pointer">Week</button>
              <button type="button" className="px-3 h-9 text-[14px] font-medium text-snt-text-primary hover:bg-snt-neutral-grey-100 border-l border-snt-neutral-grey-300 cursor-pointer">Month</button>
            </div>
          </Copyable>
        </PropertyRow>
        <PropertyRow label="Split">
          <Copyable snippets={SPLIT_SNIPPETS}>
            <div className="inline-flex rounded-md overflow-hidden">
              <button type="button" className="inline-flex items-center gap-2 px-4 h-9 rounded-l-md bg-snt-btn-primary-600 text-snt-text-on-accent text-[14px] font-medium hover:bg-snt-btn-primary-700 cursor-pointer">
                <Download size={14} /> Export CSV
              </button>
              <button type="button" aria-label="More export options" className="px-2 h-9 rounded-r-md bg-snt-btn-primary-700 text-snt-text-on-accent hover:opacity-90 border-l border-snt-text-on-accent/15 cursor-pointer">
                <ChevronDown size={14} />
              </button>
            </div>
          </Copyable>
        </PropertyRow>
        <PropertyRow label="Toolbar">
          <Copyable snippets={TOOLBAR_SNIPPETS}>
            <div className="inline-flex rounded-md overflow-hidden border border-snt-neutral-grey-300">
              <button type="button" aria-label="Edit"   className="px-2.5 py-1.5 text-snt-text-primary hover:bg-snt-neutral-grey-100 border-r border-snt-neutral-grey-300 cursor-pointer">
                <Pencil size={13} />
              </button>
              <button type="button" aria-label="Delete" className="px-2.5 py-1.5 text-snt-text-error hover:bg-snt-scale-red-50 border-r border-snt-neutral-grey-300 cursor-pointer">
                <Trash2 size={13} />
              </button>
              <button type="button" aria-label="More"   className="px-2.5 py-1.5 text-snt-text-primary hover:bg-snt-neutral-grey-100 cursor-pointer">
                <MoreHorizontal size={13} />
              </button>
            </div>
          </Copyable>
        </PropertyRow>
      </div>
    </div>
  );
}

function FullWidthCard() {
  return (
    <div>
      <SectionTitle>Full width</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5">
        <Copyable snippets={FULLWIDTH_SNIPPETS} className="block w-full">
          <Btn intent="primary" size="lg" label="Continue to checkout" className="w-full" />
        </Copyable>
        <p className="mt-2 text-[11px] text-snt-text-disabled">
          Use sparingly — full-width buttons make sense on narrow forms and mobile drawers, rarely on desktop dashboards.
        </p>
      </div>
    </div>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────

export function ButtonShowcase() {
  return (
    <div className="space-y-10">
      <VariantsMatrix />
      <SizesCard />
      <StatesCard />
      <IconCard />
      <IconOnlyCard />
      <GroupCard />
      <FullWidthCard />
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────
// Uses the shared ExampleCard from components/styleguide.

export function ButtonExamples() {
  const intents = Object.keys(INTENT_LABEL) as Intent[];
  const styles  = Object.keys(STYLE_LABEL)  as Style[];
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Each variant rendered alongside the exact JSX. Copy any card to use it in your app.
        </p>
        <div className="space-y-4">
          {intents.flatMap((intent) =>
            styles.map((style) => (
              <ExampleCard
                key={`${intent}-${style}`}
                title={`${INTENT_LABEL[intent]} · ${STYLE_LABEL[style]}`}
                code={variantSnippets(intent, style).react}
                preview={<Btn intent={intent} style={style} label={STYLE_LABEL[style]} />}
              />
            )),
          )}
        </div>
      </div>

      <div>
        <SectionTitle>Sizes</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Three control heights — match the surrounding form density.
        </p>
        <div className="space-y-4">
          {(["sm", "md", "lg"] as Size[]).map((size) => {
            const label = size === "sm" ? "Small" : size === "md" ? "Medium" : "Large";
            return (
              <ExampleCard
                key={size}
                title={`Primary · ${label}`}
                code={sizeSnippets("solid", size, label).react}
                preview={<Btn intent="primary" size={size} label={label} />}
              />
            );
          })}
        </div>
      </div>

      <div>
        <SectionTitle>States</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Disabled and loading variants.
        </p>
        <div className="space-y-4">
          <ExampleCard
            title="Disabled"
            code={disabledSnippets("solid", "Disabled").react}
            preview={<Btn intent="primary" disabled label="Disabled" />}
          />
          <ExampleCard
            title="Loading"
            code={loadingSnippets("primary", "Saving…").react}
            preview={<Btn intent="primary" loading label="Saving…" />}
          />
        </div>
      </div>

      <div>
        <SectionTitle>With icon</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Leading and trailing icons sit inline with the label.
        </p>
        <div className="space-y-4">
          <ExampleCard
            title="Leading icon · Primary"
            code={leadingIconSnippets("primary", "solid", "Export", "Download", "square.and.arrow.down", "ic_download").react}
            preview={<Btn intent="primary" iconPos="left" Icon={Download} label="Export" />}
          />
          <ExampleCard
            title="Trailing icon · Primary"
            code={trailingIconSnippets("primary", "solid", "Continue", "ArrowRight", "arrow.right", "ic_arrow_right").react}
            preview={<Btn intent="primary" iconPos="right" Icon={ArrowRight} label="Continue" />}
          />
          <ExampleCard
            title="Icon-only · Primary"
            code={iconOnlySnippets("primary", "solid", "md", "Edit", "Pencil", "pencil", "ic_pencil").react}
            preview={<Btn intent="primary" iconOnly Icon={Pencil} />}
          />
        </div>
      </div>

      <div>
        <SectionTitle>Full width</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          For narrow forms and mobile drawers.
        </p>
        <ExampleCard
          title="Full width · Primary · Large"
          code={FULLWIDTH_SNIPPETS.react}
          preview={<Btn intent="primary" size="lg" label="Continue to checkout" className="w-full" />}
        />
      </div>
    </div>
  );
}
