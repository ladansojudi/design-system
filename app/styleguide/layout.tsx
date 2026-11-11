import type * as React from "react";
import { Sidebar } from "@/components/styleguide/sidebar";
import { ContentWrapper } from "@/components/styleguide/content-wrapper";

// Docs pages: section sidebar + scrolling content. The header and the theme /
// view-mode providers live in the root layout, shared with the home page.
export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-0 flex-1">
      <Sidebar />
      <ContentWrapper>{children}</ContentWrapper>
    </div>
  );
}
