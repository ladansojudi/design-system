"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Shared layout helpers ──────────────────────────────────────────────────

export function SpecSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

export function SpecLede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12.5px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
      {children}
    </p>
  );
}

// ── Properties table (designer-facing component props) ────────────────────

export type PropertyRow = {
  name:        string;
  type:        string;
  values?:     React.ReactNode;
  default:     string;
  description: string;
};

export function PropertiesTable({ rows }: { rows: PropertyRow[] }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-s4e-surface-table-header">
            <tr className="text-left">
              {["Property", "Type", "Options", "Default", "Description"].map((h) => (
                <th key={h} className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-s4e-neutral-divider-10 align-top">
                <td className="py-3 px-4 font-mono text-[12px] text-s4e-brand-primary-500 whitespace-nowrap">{r.name}</td>
                <td className="py-3 px-4 font-mono text-[12px] text-s4e-text-secondary whitespace-nowrap">{r.type}</td>
                <td className="py-3 px-4">{r.values}</td>
                <td className="py-3 px-4 font-mono text-[12px] text-s4e-text-disabled whitespace-nowrap">{r.default}</td>
                <td className="py-3 px-4 text-[12.5px] text-s4e-text-secondary">{r.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OptionPill({ swatch, label }: { swatch?: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[11px] font-mono text-s4e-text-primary">
      {swatch}
      {label}
    </span>
  );
}

export function BoolSwatch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-8 h-4 rounded-full transition-colors",
        on ? "bg-s4e-brand-primary-500" : "bg-s4e-neutral-grey-300",
      )}
      aria-hidden
    >
      <span
        className={cn(
          "inline-block w-3 h-3 rounded-full bg-white shadow-sm transition-transform",
          on ? "translate-x-2" : "-translate-x-2",
        )}
      />
    </span>
  );
}

// ── Dimensions table (size × measurement) ─────────────────────────────────

export type DimRow = { label: string; values: string[]; note?: string };

export function DimensionsTable({ columns, rows }: { columns: string[]; rows: DimRow[] }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead className="bg-s4e-surface-table-header">
            <tr className="text-left">
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Property</th>
              {columns.map((c) => (
                <th key={c} className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled font-mono">
                  {c}
                </th>
              ))}
              <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-s4e-neutral-divider-10">
                <td className="py-2.5 px-4 text-[12.5px] text-s4e-text-primary">{r.label}</td>
                {r.values.map((v, i) => (
                  <td key={i} className="py-2.5 px-4 font-mono text-[12px] text-s4e-text-secondary">{v}</td>
                ))}
                <td className="py-2.5 px-4 text-[11.5px] text-s4e-text-disabled">{r.note ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Color tokens table ────────────────────────────────────────────────────

export type TokenSwatch = { token: string; hex: string };

export type TokenRow = {
  variant: string;
  bg?:     TokenSwatch;
  text:    TokenSwatch;
  border?: TokenSwatch;
  hover?:  TokenSwatch;
};

export function ColorTokenTable({ title, rows }: { title?: string; rows: TokenRow[] }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-s4e-surface-table-header text-[11px] font-semibold text-s4e-text-primary uppercase tracking-wider">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-sm">
          <thead className="bg-s4e-surface-app">
            <tr className="text-left">
              {["Variant", "Background", "Text", "Border", "Hover"].map((h) => (
                <th key={h} className="py-2 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled border-b border-s4e-neutral-divider-10">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.variant} className="border-b border-s4e-neutral-divider-10 last:border-b-0">
                <td className="py-2.5 px-4 text-[12.5px] text-s4e-text-primary font-medium">{r.variant}</td>
                <TokenCell t={r.bg} />
                <TokenCell t={r.text} />
                <TokenCell t={r.border} />
                <TokenCell t={r.hover} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── ColorTokenTabs (underline tabs, one table per group) ──────────────────

export type ColorTokenGroup = {
  id:    string;
  label: string;
  rows:  TokenRow[];
};

export function ColorTokenTabs({ groups }: { groups: ColorTokenGroup[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? "");
  if (groups.length === 0) return null;
  if (groups.length === 1) {
    return <ColorTokenTable rows={groups[0].rows} />;
  }
  const activeGroup = groups.find((g) => g.id === active) ?? groups[0];
  return (
    <div>
      <div
        role="tablist"
        aria-label="Color token groups"
        className="flex items-center gap-2 border-b border-s4e-neutral-divider-10 mb-4 overflow-x-auto s4e-scrollbar-hide"
      >
        {groups.map((g) => {
          const isActive = active === g.id;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(g.id)}
              className={cn(
                "inline-flex items-center px-4 pt-2 pb-2.5 -mb-px text-[14px] font-medium whitespace-nowrap tracking-tight",
                "border-b-[2px] transition-colors cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-s4e-brand-primary-500/40",
                isActive
                  ? "text-s4e-text-primary border-s4e-brand-primary-500"
                  : "text-s4e-text-secondary border-transparent hover:text-s4e-text-primary",
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>
      <ColorTokenTable rows={activeGroup.rows} />
    </div>
  );
}

function TokenCell({ t }: { t?: TokenSwatch }) {
  if (!t) return <td className="py-2.5 px-4 text-[12px] text-s4e-text-disabled">—</td>;
  return (
    <td className="py-2.5 px-4">
      <div className="flex items-center gap-2">
        <span className="inline-block w-4 h-4 rounded-[3px] border border-s4e-neutral-divider-10 shrink-0" style={{ backgroundColor: t.hex }} aria-hidden />
        <div className="min-w-0">
          <div className="font-mono text-[11px] text-s4e-text-primary truncate">{t.token}</div>
          <div className="font-mono text-[10.5px] text-s4e-text-disabled truncate">{t.hex}</div>
        </div>
      </div>
    </td>
  );
}

// ── Spacing diagram (Figma-style dimension annotations) ──────────────────

export interface SpacingDiagramProps {
  /** Outer width to display (e.g., 68) */
  width:  number;
  /** Outer height to display (e.g., 36) */
  height: number;
  /** Horizontal inner padding (e.g., 16) */
  padX:   number;
  /** Vertical inner padding (e.g., 12) */
  padY:   number;
  /** Border radius (e.g., 6) */
  radius?: number;
  /** Pixel scale for the diagram (default 1.8) */
  scale?:  number;
  /** Render the actual component preview */
  children: React.ReactNode;
}

const RED = "#ee5630";

/**
 * Annotated spacing diagram. Shows the rendered child component with
 * 4 dimension labels: outer width (top), outer height (left), inner
 * padding-X (bottom), inner padding-Y (right).
 *
 * The child should match the {width, height} props so the dimension
 * lines align with the actual component bounds.
 */
export function SpacingDiagram({
  width, height, padX, padY, scale = 1.8, children,
}: SpacingDiagramProps) {
  const W = width, H = height, SCALE = scale;
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl bg-s4e-neutral-grey-100/30 px-12 py-16 flex items-center justify-center">
      <div className="relative" style={{ width: W * SCALE, height: H * SCALE }}>
        {/* Component preview fills the box */}
        <div className="absolute inset-0">{children}</div>

        {/* WIDTH — ticks at top corners + badge above */}
        <span className="absolute left-0 -top-3 w-[1.5px] h-3" style={{ backgroundColor: RED }} aria-hidden />
        <span className="absolute right-0 -top-3 w-[1.5px] h-3" style={{ backgroundColor: RED }} aria-hidden />
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white"
          style={{ backgroundColor: RED }}
        >
          {W}
        </span>

        {/* HEIGHT — ticks at left corners + badge to the left */}
        <span className="absolute -left-3 top-0 w-3 h-[1.5px]" style={{ backgroundColor: RED }} aria-hidden />
        <span className="absolute -left-3 bottom-0 w-3 h-[1.5px]" style={{ backgroundColor: RED }} aria-hidden />
        <span
          className="absolute top-1/2 -translate-y-1/2 -left-12 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white"
          style={{ backgroundColor: RED }}
        >
          {H}
        </span>

        {/* INNER PADDING-X (BOTTOM) — ticks at inner content edges + two padX badges below */}
        <span className="absolute -bottom-3 w-[1.5px] h-3" style={{ left: padX * SCALE, backgroundColor: RED }} aria-hidden />
        <span className="absolute -bottom-3 w-[1.5px] h-3" style={{ right: padX * SCALE, backgroundColor: RED }} aria-hidden />
        <span className="absolute -bottom-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white -translate-x-1/2" style={{ left: (padX * SCALE) / 2, backgroundColor: RED }}>
          {padX}
        </span>
        <span className="absolute -bottom-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white translate-x-1/2" style={{ right: (padX * SCALE) / 2, backgroundColor: RED }}>
          {padX}
        </span>

        {/* INNER PADDING-Y (RIGHT) — ticks at inner content top/bottom + two padY badges to the right */}
        <span className="absolute -right-3 w-3 h-[1.5px]" style={{ top: padY * SCALE, backgroundColor: RED }} aria-hidden />
        <span className="absolute -right-3 w-3 h-[1.5px]" style={{ bottom: padY * SCALE, backgroundColor: RED }} aria-hidden />
        <span className="absolute -right-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white -translate-y-1/2" style={{ top: (padY * SCALE) / 2, backgroundColor: RED }}>
          {padY}
        </span>
        <span className="absolute -right-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white translate-y-1/2" style={{ bottom: (padY * SCALE) / 2, backgroundColor: RED }}>
          {padY}
        </span>
      </div>
    </div>
  );
}
