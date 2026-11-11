// The scrolling main column of a docs page. Page content (hero band + body) is
// provided as children; the site header sits above it in the root layout.

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main id="main" className="relative flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-snt-surface-app">
      {children}
    </main>
  );
}
