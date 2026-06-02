"use client";

import { cn } from "@/lib/utils";
import { ColorTokenTabs } from "@/components/styleguide/specs";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12.5px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
      {children}
    </p>
  );
}

// ── Visual swatches ───────────────────────────────────────────────────────

function IntentSwatch({ intent }: { intent: "default" | "primary" | "destructive" }) {
  const cls = {
    default:     "bg-s4e-text-primary",
    primary:     "bg-s4e-btn-primary-600",
    destructive: "bg-s4e-btn-error-600",
  }[intent];
  return <span className={cn("inline-block w-3 h-3 rounded-[3px]", cls)} aria-hidden />;
}

function VariantSwatch({ variant }: { variant: "solid" | "outline" | "ghost" }) {
  if (variant === "solid")   return <span className="inline-block w-4 h-3 rounded-[3px] bg-s4e-text-primary" aria-hidden />;
  if (variant === "outline") return <span className="inline-block w-4 h-3 rounded-[3px] border border-s4e-text-primary" aria-hidden />;
  return <span className="inline-block w-4 h-3 rounded-[3px] border border-dashed border-s4e-text-disabled" aria-hidden />;
}

function SizeSwatch({ size }: { size: "sm" | "md" | "lg" }) {
  const h = { sm: 16, md: 20, lg: 28 }[size];
  return <span className="inline-block bg-s4e-neutral-grey-300 rounded-[3px] w-5" style={{ height: h }} aria-hidden />;
}

function BoolSwatch({ on }: { on: boolean }) {
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

// ── Instance properties table ─────────────────────────────────────────────

type PropertyRow = {
  name:        string;
  type:        string;
  values?:     React.ReactNode;
  default:     string;
  description: string;
};

function PropertiesTable({ rows }: { rows: PropertyRow[] }) {
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

function OptionPill({ swatch, label }: { swatch: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[11px] font-mono text-s4e-text-primary">
      {swatch}
      {label}
    </span>
  );
}

// ── Dimensions table (size × measurement) ─────────────────────────────────

type DimRow = { label: string; values: string[]; note?: string };

function DimensionsTable({ columns, rows }: { columns: string[]; rows: DimRow[] }) {
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

// ── Color token table ─────────────────────────────────────────────────────

type TokenRow = {
  variant: string;
  bg?:     { token: string; hex: string };
  text:    { token: string; hex: string };
  border?: { token: string; hex: string };
  hover?:  { token: string; hex: string };
};

function ColorTokenTable({ title, rows }: { title: string; rows: TokenRow[] }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <div className="px-4 py-2 bg-s4e-surface-table-header text-[11px] font-semibold text-s4e-text-primary uppercase tracking-wider">
        {title}
      </div>
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

function TokenCell({ t }: { t?: { token: string; hex: string } }) {
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

// ── ButtonSpecs ───────────────────────────────────────────────────────────

export function ButtonSpecs() {
  return (
    <div className="space-y-10">
      {/* Instance properties */}
      <section>
        <SectionTitle>Instance properties</SectionTitle>
        <Lede>
          Every prop a designer can configure when placing this component. Use these names in Figma component properties for a 1:1 map with code.
        </Lede>
        <PropertiesTable
          rows={[
            {
              name:    "intent",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<IntentSwatch intent="default"     />} label="default" />
                  <OptionPill swatch={<IntentSwatch intent="primary"     />} label="primary" />
                  <OptionPill swatch={<IntentSwatch intent="destructive" />} label="destructive" />
                </div>
              ),
              default:     "primary",
              description: "Color intent — semantic meaning of the action.",
            },
            {
              name:    "variant",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap gap-1.5">
                  <OptionPill swatch={<VariantSwatch variant="solid"   />} label="solid" />
                  <OptionPill swatch={<VariantSwatch variant="outline" />} label="outline" />
                  <OptionPill swatch={<VariantSwatch variant="ghost"   />} label="ghost" />
                </div>
              ),
              default:     "solid",
              description: "Visual emphasis — one Solid per region, rest Outline or Ghost.",
            },
            {
              name:    "size",
              type:    "enum",
              values:  (
                <div className="flex flex-wrap items-end gap-1.5">
                  <OptionPill swatch={<SizeSwatch size="sm" />} label="sm" />
                  <OptionPill swatch={<SizeSwatch size="md" />} label="md" />
                  <OptionPill swatch={<SizeSwatch size="lg" />} label="lg" />
                </div>
              ),
              default:     "md",
              description: "Control height — matches surrounding form density.",
            },
            {
              name:    "loading",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Swaps label for a spinner; auto-disables.",
            },
            {
              name:    "iconOnly",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Square button with only an icon — requires aria-label.",
            },
            {
              name:    "disabled",
              type:    "boolean",
              values:  (
                <div className="flex items-center gap-1.5">
                  <OptionPill swatch={<BoolSwatch on={false} />} label="false" />
                  <OptionPill swatch={<BoolSwatch on={true}  />} label="true" />
                </div>
              ),
              default:     "false",
              description: "Non-interactive state — 40% opacity, pointer-events disabled.",
            },
          ]}
        />
      </section>

      {/* Sizing & spacing */}
      <section>
        <SectionTitle>Sizing &amp; spacing</SectionTitle>
        <Lede>
          Exact measurements per size variant. Recreate this component in any tool — Figma, Sketch, or hand-drawn — using only these values.
        </Lede>

        <SpacingDiagram />

        <div className="mt-6">
          <DimensionsTable
            columns={["sm", "md", "lg"]}
            rows={[
              { label: "Height",                values: ["32px", "36px", "44px"], note: "Fixed; controls vertical centering." },
              { label: "Min width",             values: ["auto",  "auto",  "auto"], note: "Content-driven; icon-only is square." },
              { label: "Padding · horizontal",  values: ["12px", "16px", "20px"] },
              { label: "Padding · vertical",    values: ["8px",  "12px", "16px"], note: "Visual; auto-centered via fixed height." },
              { label: "Border radius",         values: ["6px",  "6px",  "6px"] },
              { label: "Border width",          values: ["1px",  "1px",  "1px"], note: "Outline variant only." },
              { label: "Font size",             values: ["14px", "14px", "14px"] },
              { label: "Font weight",           values: ["500",  "500",  "500"], note: "Inter Medium." },
              { label: "Letter spacing",        values: ["0",    "0",    "0"] },
              { label: "Icon size",             values: ["14px", "14px", "16px"], note: "Lucide stroke 2px." },
              { label: "Icon · label gap",      values: ["4px",  "8px",  "8px"] },
              { label: "Focus ring · width",    values: ["2px",  "2px",  "2px"] },
              { label: "Focus ring · offset",   values: ["2px",  "2px",  "2px"], note: "From outer edge." },
            ]}
          />
        </div>
      </section>

      {/* Color tokens */}
      <section>
        <SectionTitle>Color tokens</SectionTitle>
        <Lede>
          Token, hex value, and the role each color plays. Reach for the named token whenever possible — the hex is only a fallback for tools that can&apos;t reference CSS variables.
        </Lede>

        <ColorTokenTabs
          groups={[
            {
              id: "default",
              label: "Default",
              rows: [
                { variant: "Solid",   bg: { token: "text-primary",       hex: "#121f28" }, text: { token: "text-inverse",        hex: "#ffffff" }, hover: { token: "neutral-grey-800",  hex: "#1f2323" } },
                { variant: "Outline", text: { token: "text-primary",     hex: "#121f28" }, border: { token: "neutral-grey-300", hex: "#dfe2e2" }, hover: { token: "neutral-grey-100",  hex: "#f7f8f8" } },
                { variant: "Ghost",   text: { token: "text-primary",     hex: "#121f28" }, hover: { token: "neutral-grey-100", hex: "#f7f8f8" } },
              ],
            },
            {
              id: "primary",
              label: "Primary",
              rows: [
                { variant: "Solid",   bg: { token: "btn-primary-600",    hex: "#0f69aa" }, text: { token: "text-on-accent",      hex: "#ffffff" }, hover: { token: "btn-primary-700",   hex: "#024a72" } },
                { variant: "Outline", text: { token: "text-link",        hex: "#0066cc" }, border: { token: "text-link",        hex: "#0066cc" }, hover: { token: "brand-primary-50",  hex: "#e8f4fd" } },
                { variant: "Ghost",   text: { token: "text-link",        hex: "#0066cc" }, hover: { token: "brand-primary-50", hex: "#e8f4fd" } },
              ],
            },
            {
              id: "destructive",
              label: "Destructive",
              rows: [
                { variant: "Solid",   bg: { token: "btn-error-600",      hex: "#ae2700" }, text: { token: "text-on-accent",      hex: "#ffffff" }, hover: { token: "btn-error-700",     hex: "#881f00" } },
                { variant: "Outline", text: { token: "text-error",       hex: "#b0291e" }, border: { token: "text-error",       hex: "#b0291e" }, hover: { token: "scale-red-50",      hex: "#fcf3f2" } },
                { variant: "Ghost",   text: { token: "text-error",       hex: "#b0291e" }, hover: { token: "scale-red-50",     hex: "#fcf3f2" } },
              ],
            },
          ]}
        />
      </section>
    </div>
  );
}

// ── Spacing diagram (Figma-style dimension annotations) ──────────────────

function SpacingDiagram() {
  const SCALE = 1.8;
  const H = 36, PADX = 16, PADY = 12, RADIUS = 6, FONT = 13;
  const W = 68; // approx "Solid" md width
  const RED = "#ee5630";

  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl bg-s4e-neutral-grey-100/30 px-12 py-16 flex items-center justify-center">
      <div className="relative" style={{ width: W * SCALE, height: H * SCALE }}>
        {/* The button itself */}
        <div
          className="absolute inset-0 inline-flex items-center justify-center bg-s4e-text-primary text-s4e-text-inverse font-medium shadow-md"
          style={{
            paddingLeft: PADX * SCALE,
            paddingRight: PADX * SCALE,
            fontSize: FONT * SCALE,
            borderRadius: RADIUS * SCALE,
          }}
        >
          Solid
        </div>

        {/* WIDTH — ticks at top corners + badge centered above */}
        <span className="absolute left-0 -top-3 w-[1.5px] h-3" style={{ backgroundColor: RED }} aria-hidden />
        <span className="absolute right-0 -top-3 w-[1.5px] h-3" style={{ backgroundColor: RED }} aria-hidden />
        <span
          className="absolute left-1/2 -translate-x-1/2 -top-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white"
          style={{ backgroundColor: RED }}
        >
          {W}
        </span>

        {/* HEIGHT — ticks at left corners + badge centered to the left */}
        <span className="absolute -left-3 top-0 w-3 h-[1.5px]" style={{ backgroundColor: RED }} aria-hidden />
        <span className="absolute -left-3 bottom-0 w-3 h-[1.5px]" style={{ backgroundColor: RED }} aria-hidden />
        <span
          className="absolute top-1/2 -translate-y-1/2 -left-12 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white"
          style={{ backgroundColor: RED }}
        >
          {H}
        </span>

        {/* INNER PADDING-X — two ticks at inner content edges + two "16" badges below */}
        <span
          className="absolute -bottom-3 w-[1.5px] h-3"
          style={{ left: PADX * SCALE, backgroundColor: RED }}
          aria-hidden
        />
        <span
          className="absolute -bottom-3 w-[1.5px] h-3"
          style={{ right: PADX * SCALE, backgroundColor: RED }}
          aria-hidden
        />
        <span
          className="absolute -bottom-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white -translate-x-1/2"
          style={{ left: (PADX * SCALE) / 2, backgroundColor: RED }}
        >
          {PADX}
        </span>
        <span
          className="absolute -bottom-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white translate-x-1/2"
          style={{ right: (PADX * SCALE) / 2, backgroundColor: RED }}
        >
          {PADX}
        </span>

        {/* INNER PADDING-Y (RIGHT) — ticks at inner content top/bottom + two "11" badges to the right */}
        <span
          className="absolute -right-3 w-3 h-[1.5px]"
          style={{ top: PADY * SCALE, backgroundColor: RED }}
          aria-hidden
        />
        <span
          className="absolute -right-3 w-3 h-[1.5px]"
          style={{ bottom: PADY * SCALE, backgroundColor: RED }}
          aria-hidden
        />
        <span
          className="absolute -right-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white -translate-y-1/2"
          style={{ top: (PADY * SCALE) / 2, backgroundColor: RED }}
        >
          {PADY}
        </span>
        <span
          className="absolute -right-10 px-1.5 py-0.5 rounded-[4px] text-[11px] font-mono font-semibold text-white translate-y-1/2"
          style={{ bottom: (PADY * SCALE) / 2, backgroundColor: RED }}
        >
          {PADY}
        </span>
      </div>
    </div>
  );
}
