// Section heading used by prose pages. The hidden ▶▶ marker is what PageTOC
// scans for, so every SectionTitle shows up in the "On this page" list.

export function SectionTitle({ children, kicker }: { children: React.ReactNode; kicker?: string }) {
  return (
    <div className="mb-5">
      {kicker && (
        <div className="mb-1 text-snt-11 font-medium uppercase tracking-[0.08em] text-snt-text-brand">{kicker}</div>
      )}
      <div className="flex items-center gap-2">
        <span aria-hidden className="hidden">▶▶</span>
        <h2 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h2>
      </div>
    </div>
  );
}
