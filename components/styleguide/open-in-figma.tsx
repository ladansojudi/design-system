// "Open in Figma" affordance for a component page. Intentionally NOT wired to a
// file yet — it renders as a disabled control with an "In progress" marker so
// the surface exists and signals the Figma source is on the way. When a file is
// ready, swap the <button> for an <a href={figmaUrl} target="_blank"> and drop
// the disabled / "In progress" treatment.

function FigmaMark({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    </svg>
  );
}

export function OpenInFigma() {
  return (
    <button
      type="button"
      disabled
      aria-disabled
      title="Figma file in progress — coming soon"
      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-s4e-text-secondary cursor-not-allowed select-none whitespace-nowrap"
    >
      <FigmaMark size={12} />
      Open in Figma
      <span className="text-[11px] font-normal text-s4e-text-disabled">· In progress</span>
    </button>
  );
}
