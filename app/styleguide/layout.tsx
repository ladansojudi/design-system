import type * as React from "react";
import { Sidebar } from "@/components/styleguide/sidebar";
import { PreviewThemeProvider } from "@/components/styleguide/preview-theme-provider";
import { MobileSidebarProvider } from "@/components/styleguide/mobile-sidebar-provider";
import { ThemeShell } from "@/components/styleguide/theme-shell";
import { ContentWrapper } from "@/components/styleguide/content-wrapper";

export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreviewThemeProvider>
      <MobileSidebarProvider>
        <ThemeShell>
          <Sidebar />
          <ContentWrapper>{children}</ContentWrapper>
        </ThemeShell>
      </MobileSidebarProvider>
    </PreviewThemeProvider>
  );
}
