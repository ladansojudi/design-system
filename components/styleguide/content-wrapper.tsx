import { TopBar } from "@/components/styleguide/top-bar";

// The scrolling main column. The sticky TopBar lives here; page content (hero
// band + body) is provided as children. Dev-mode panels (Installation /
// Developer Notes) render inside each page's <PageBody>, not here, so they sit
// in the content column under the same on-this-page TOC.

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden bg-s4e-surface-app">
      <TopBar />
      {children}
    </main>
  );
}
