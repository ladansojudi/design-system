import {
  typographyScale,
  GROUP_LABELS,
  GROUP_DESCRIPTIONS,
  type TypographyEntry,
  type TypographyGroup,
} from "@/components/styleguide/typography-data";
import { cn } from "@/lib/utils";

const PANGRAM      = "The quick brown fox jumps over the lazy dog";
const SAMPLE_PARA  = "Real-time alerts notify you within seconds when a critical finding lands in your environment. Configure the rules once and the platform handles the rest — from triage to remediation handoff.";
const ALPHA_UPPER  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHA_LOWER  = "abcdefghijklmnopqrstuvwxyz";
const NUMERALS     = "0123456789";
const PUNCTUATION  = "! ? @ # $ % & * ( ) [ ] { } < > / \\ | + = - _ : ; , . ' \"";
const MONO_GLYPHS  = "{ } [ ] ( ) < > = => != == === ; : , . ! ? @ # $ %";

const SANS_WEIGHTS = [
  { label: "Regular",  className: "font-normal"   },
  { label: "Medium",   className: "font-medium"   },
  { label: "SemiBold", className: "font-semibold" },
  { label: "Bold",     className: "font-bold"     },
] as const;

const MONO_WEIGHTS = [
  { label: "Regular",  className: "font-normal"   },
  { label: "Medium",   className: "font-medium"   },
  { label: "SemiBold", className: "font-semibold" },
  { label: "Bold",     className: "font-bold"     },
] as const;

const GROUP_ORDER: TypographyGroup[] = [
  "display", "heading", "body", "label", "caption", "overline", "code",
];

function groupedScale(): Record<TypographyGroup, TypographyEntry[]> {
  const out = {} as Record<TypographyGroup, TypographyEntry[]>;
  for (const g of GROUP_ORDER) out[g] = [];
  for (const e of typographyScale) out[e.group].push(e);
  return out;
}

// ── Font specimen ─────────────────────────────────────────────────────────

function FontSpecimen({
  name,
  tagline,
  variants,
  weights,
  fontClass,
  pangram,
  charset,
  showItalic = false,
}: {
  name:       string;
  tagline:    string;
  variants:   string;
  weights:    readonly { label: string; className: string }[];
  fontClass:  string; // font-sans or font-mono
  pangram:    string;
  charset:    { upper: string; lower?: string; numerals: string; symbols: string };
  showItalic?: boolean;
}) {
  return (
    <section className={cn("border border-s4e-neutral-divider-10 rounded-xl overflow-hidden mb-10", fontClass)}>
      {/* Heading strip */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-6 sm:px-8 py-6 border-b border-s4e-neutral-divider-10">
        <div>
          <h2 className={cn("text-[28px] font-bold leading-none text-s4e-brand-primary-500", fontClass)}>
            {name}
          </h2>
          <div className="mt-2 text-[10px] uppercase tracking-widest text-s4e-text-disabled">
            {tagline}
          </div>
        </div>
        <div className="text-[10.5px] font-mono text-s4e-text-secondary md:text-right">
          {variants}
        </div>
      </div>

      {/* Pangram — large display */}
      <div className="px-6 sm:px-8 py-7 border-b border-s4e-neutral-divider-10">
        <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-3">
          Pangram · 36px
        </div>
        <div className="text-[28px] sm:text-[36px] font-semibold leading-[1.15] text-s4e-text-primary tracking-[-0.01em]">
          {pangram}
        </div>
      </div>

      {/* Weight specimens — Aa */}
      <div className="px-6 sm:px-8 py-7 border-b border-s4e-neutral-divider-10">
        <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-5">
          Weights
        </div>
        <div className="flex items-end gap-6 sm:gap-10 overflow-x-auto s4e-scrollbar-hide -mx-1 px-1">
          {weights.map(({ label, className }) => (
            <div key={label} className="flex flex-col items-center gap-2 shrink-0">
              <span className={cn("text-[56px] sm:text-[72px] leading-none text-s4e-text-primary", className)}>
                Aa
              </span>
              <span className="text-[10px] uppercase tracking-widest text-s4e-text-secondary">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Italic — only for Inter */}
      {showItalic && (
        <div className="px-6 sm:px-8 py-7 border-b border-s4e-neutral-divider-10">
          <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-3">
            Italic
          </div>
          <div className="space-y-2">
            <div className="text-[24px] italic font-normal text-s4e-text-primary leading-tight">
              Italic Regular — quotes, emphasis, foreign terms
            </div>
            <div className="text-[24px] italic font-semibold text-s4e-text-primary leading-tight">
              Italic SemiBold — emphasized headings
            </div>
          </div>
        </div>
      )}

      {/* Character set */}
      <div className="px-6 sm:px-8 py-7 border-b border-s4e-neutral-divider-10">
        <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-3">
          Character set
        </div>
        <div className="space-y-1.5 text-[15px] text-s4e-text-primary tracking-wider break-words">
          <div>{charset.upper}</div>
          {charset.lower && <div>{charset.lower}</div>}
          <div className={cn(fontClass === "font-mono" && "font-mono")}>{charset.numerals}</div>
        </div>
        <div className="mt-3 text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-2">
          Symbols
        </div>
        <div className="text-[13px] text-s4e-text-secondary break-words">{charset.symbols}</div>
      </div>

      {/* Sample paragraph — readability check */}
      <div className="px-6 sm:px-8 py-7">
        <div className="text-[10px] uppercase tracking-widest text-s4e-text-disabled mb-3">
          Sample paragraph · 16px / 1.6
        </div>
        <p className="text-[16px] leading-[1.6] text-s4e-text-secondary max-w-2xl">
          {SAMPLE_PARA}
        </p>
      </div>
    </section>
  );
}

// ── Scale specimen rows ───────────────────────────────────────────────────

function SpecimenRow({ entry }: { entry: TypographyEntry }) {
  const { size, weight, lineHeight, letterSpacing, transform, family } = entry.specs;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-6 border-b border-s4e-neutral-divider-10 last:border-b-0 px-4 sm:px-6 md:px-8 py-5 md:py-6">
      <div className="shrink-0 pt-1">
        <div className="font-mono text-[11px] text-s4e-brand-primary-500">{entry.name}</div>
        <div className="mt-2 space-y-0.5">
          <div className="font-mono text-[10px] text-s4e-text-disabled">
            {size} · {weight}
          </div>
          <div className="font-mono text-[10px] text-s4e-text-disabled">
            lh {lineHeight}
            {letterSpacing ? ` · ls ${letterSpacing}` : ""}
            {transform     ? ` · ${transform}`        : ""}
          </div>
          {family && (
            <div className="font-mono text-[10px] text-s4e-text-disabled">{family}</div>
          )}
        </div>
      </div>

      <div className={cn("text-s4e-text-primary min-w-0", entry.className, entry.group === "body" ? "max-w-2xl" : "truncate")}>
        {entry.example}
      </div>
    </div>
  );
}

function GroupBlock({ group, entries }: { group: TypographyGroup; entries: TypographyEntry[] }) {
  return (
    <section className="mb-10 last:mb-0">
      <div className="flex items-baseline gap-3 mb-3">
        <h3 className="text-[14px] font-semibold text-s4e-text-primary">
          {GROUP_LABELS[group]}
        </h3>
        <span className="text-[10px] uppercase tracking-widest text-s4e-text-disabled">
          {entries.length} {entries.length === 1 ? "style" : "styles"}
        </span>
      </div>
      <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-3 max-w-2xl">
        {GROUP_DESCRIPTIONS[group]}
      </p>
      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        {entries.map((e) => (
          <SpecimenRow key={e.name} entry={e} />
        ))}
      </div>
    </section>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────

export function TypographyScale() {
  const grouped = groupedScale();

  return (
    <div>
      {/* Font specimens */}
      <FontSpecimen
        name="Inter"
        tagline="Sans · UI · marketing"
        variants="Variable · Regular · Medium · SemiBold · Bold · Italic"
        weights={SANS_WEIGHTS}
        fontClass="font-sans"
        pangram={PANGRAM}
        charset={{
          upper:    ALPHA_UPPER,
          lower:    ALPHA_LOWER,
          numerals: NUMERALS,
          symbols:  PUNCTUATION,
        }}
        showItalic
      />

      <FontSpecimen
        name="IBM Plex Mono"
        tagline="Monospace · tokens · code"
        variants="Regular · Medium · SemiBold · Bold"
        weights={MONO_WEIGHTS}
        fontClass="font-mono"
        pangram={PANGRAM}
        charset={{
          upper:    ALPHA_UPPER,
          lower:    ALPHA_LOWER,
          numerals: NUMERALS,
          symbols:  MONO_GLYPHS,
        }}
      />

      {/* Type scale */}
      <div className="mt-12">
        {GROUP_ORDER.map((g) => (
          <GroupBlock key={g} group={g} entries={grouped[g]} />
        ))}
      </div>
    </div>
  );
}
