// Top-level group on a component page (Examples, Usage, Specs …). Renders a
// real <h2>; the subsection titles inside the showcase, docs and specs files are
// <h3>s, so the page reads as a two-level outline and PageTOC nests them.
// The hidden ▶▶ marker is what PageTOC scans for.

export function DocSection({
  title,
  description,
  hideTitle = false,
  children,
}: {
  title: string;
  description?: string;
  /** Keep the <h2> for the outline and TOC but hide it (e.g. when a tab already names the section). */
  hideTitle?: boolean;
  children: React.ReactNode;
}) {
  if (hideTitle) {
    return (
      <section>
        <span aria-hidden className="hidden">▶▶</span>
        <h2 className="sr-only">{title}</h2>
        <div className="space-y-10">{children}</div>
      </section>
    );
  }
  return (
    <section className="border-t border-snt-border-default pt-10 first:border-t-0 first:pt-0">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <span aria-hidden className="hidden">▶▶</span>
          <h2 className="text-snt-20 font-semibold tracking-tight text-snt-text-primary">{title}</h2>
        </div>
        {description && (
          <p className="mt-1.5 max-w-2xl text-snt-14 leading-relaxed text-snt-text-secondary">{description}</p>
        )}
      </header>
      <div className="space-y-10">{children}</div>
    </section>
  );
}
