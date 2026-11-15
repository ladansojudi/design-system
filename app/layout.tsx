import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AUTHOR, SITE_URL } from "@/lib/site";
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

const DESCRIPTION =
  "Sentinel — an open design system for cybersecurity products. Tokens, components and docs, designed in Figma, built in React, ready for AI agents. By Ladan Sojudi.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sentinel Design System by Ladan Sojudi",
    template: "%s — Sentinel by Ladan Sojudi",
  },
  description: DESCRIPTION,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  alternates: { canonical: "./" },
  verification: { google: "lruknaiaRoIoh0U89a9f9Q5Fa0psnYi2BMfDgCh62lA" },
  openGraph: {
    title: "Sentinel Design System by Ladan Sojudi",
    description: DESCRIPTION,
    siteName: "Sentinel Design System",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sentinel Design System by Ladan Sojudi",
    description: DESCRIPTION,
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Sentinel Design System",
  url: SITE_URL,
  description:
    "A 560+ component design system built in code: token-based, WCAG-audited, synced to Figma and readable by AI agents.",
  author: {
    "@type": "Person",
    name: AUTHOR.name,
    jobTitle: "Product Designer",
    url: AUTHOR.url,
    sameAs: [AUTHOR.linkedin, AUTHOR.github],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c") }}
        />
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
