"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

// Shows its children as people with a colour-vision deficiency see them, using
// SVG colour matrices (Machado et al. 2009, full severity). Preview only: it
// filters the rendering, it doesn't change the components.

const MODES = [
  { id: "none", label: "Normal", note: "", matrix: "" },
  { id: "protanopia", label: "Protanopia", note: "no red cones", matrix: "0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0" },
  { id: "deuteranopia", label: "Deuteranopia", note: "no green cones", matrix: "0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" },
  { id: "tritanopia", label: "Tritanopia", note: "no blue cones", matrix: "1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0" },
] as const;

export function ColorBlindPreview({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<(typeof MODES)[number]["id"]>("none");
  const uid = useId().replace(/:/g, "");
  const active = MODES.find((m) => m.id === mode)!;

  return (
    <div>
      <div role="group" aria-label="Colour-vision simulation" className="mb-4 inline-flex flex-wrap gap-1 rounded-lg bg-snt-bg-subtle p-1">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={mode === m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              "cursor-pointer rounded-md px-3 py-1.5 text-snt-12 font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
              mode === m.id
                ? "bg-snt-surface-app text-snt-text-primary shadow-snt-control ring-1 ring-snt-border-default"
                : "text-snt-text-secondary hover:text-snt-text-primary",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          {MODES.filter((m) => m.matrix).map((m) => (
            <filter key={m.id} id={`${uid}-${m.id}`} colorInterpolationFilters="linearRGB">
              <feColorMatrix type="matrix" values={m.matrix} />
            </filter>
          ))}
        </defs>
      </svg>
      <div style={active.matrix ? { filter: `url(#${uid}-${active.id})` } : undefined}>{children}</div>
      <p className="mt-3 text-snt-12 text-snt-text-secondary" role="status">
        {active.matrix
          ? `Simulating ${active.label.toLowerCase()} (${active.note}). Each level should still be told apart by its bars and label.`
          : "Pick a type to see how severity reads without full colour vision."}
      </p>
    </div>
  );
}
