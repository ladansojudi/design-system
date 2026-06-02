import type * as React from "react";
import { Sidebar } from "@/components/styleguide/sidebar";
import { PreviewThemeProvider } from "@/components/styleguide/preview-theme-provider";
import { PlatformProvider } from "@/components/styleguide/platform-provider";
import { ViewModeProvider } from "@/components/styleguide/view-mode-provider";
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
      <PlatformProvider>
        <ViewModeProvider>
          <MobileSidebarProvider>
            <ThemeShell>
              <Sidebar />
              <ContentWrapper>{children}</ContentWrapper>
            </ThemeShell>
          </MobileSidebarProvider>
        </ViewModeProvider>
      </PlatformProvider>
    </PreviewThemeProvider>
  );
}
