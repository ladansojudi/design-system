import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PreviewThemeProvider } from "@/components/styleguide/preview-theme-provider";
import { PlatformProvider } from "@/components/styleguide/platform-provider";
import { ViewModeProvider } from "@/components/styleguide/view-mode-provider";
import { MobileSidebarProvider } from "@/components/styleguide/mobile-sidebar-provider";
import { ThemeShell } from "@/components/styleguide/theme-shell";
import { SiteHeader } from "@/components/styleguide/site-header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinel Design System",
  description: "Sentinel — an open design system for cybersecurity products. Tokens, components and docs, designed in Figma, built in React, ready for AI agents. By Laden Sojudi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <PreviewThemeProvider>
          <PlatformProvider>
            <ViewModeProvider>
              <MobileSidebarProvider>
                <ThemeShell>
                  <SiteHeader />
                  {children}
                </ThemeShell>
              </MobileSidebarProvider>
            </ViewModeProvider>
          </PlatformProvider>
        </PreviewThemeProvider>
      </body>
    </html>
  );
}
