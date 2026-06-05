import type { Metadata } from "next";
import { Sparkles, X } from "lucide-react";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { BannerShowcase, BannerExamples } from "@/sections/banner/banner-showcase";
import { BannerSpecs } from "@/sections/banner/banner-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ViewModeTabs } from "@/components/styleguide/view-mode-tabs";
import { ModeAware } from "@/components/styleguide/mode-aware";

export const metadata: Metadata = {
  title: "Banner — Design System",
};

export default function BannerPage() {
  return (
    <>
      <PageHero
        category="Atoms"
        title="Banner"
        status="beta"
        description="Full-width page-level notification that sits above the app shell. Used for system-wide state — outages, trials, billing — not per-feature messages."
        actions={<OpenInFigma />}
        tabs={<ViewModeTabs />}
      />

      <PageBody>


      <ModeAware
        design={
          <div className="space-y-10 mt-8 sm:mt-10">
            <BannerShowcase />

            <Anatomy
              parts={[
                { label: "Surface", shortLabel: "Surface", description: "Solid full-bleed background; tone defines color.",                       pinX: 50, pinY: 0,  x: 50, y: -50, anchor: "center" },
                { label: "Icon",    shortLabel: "Icon",    description: "Single small icon (14px) signalling the tone.",                          pinX: 4,  pinY: 50, x: 4,  y: 140, anchor: "tl" },
                { label: "Message", shortLabel: "Message", description: "One sentence in the active voice.",                                      pinX: 35, pinY: 50, x: 32, y: 140, anchor: "tl" },
                { label: "CTA",     shortLabel: "CTA",     description: "Optional underlined link to resolve or learn more.",                     pinX: 80, pinY: 50, x: 70, y: 140, anchor: "tl" },
                { label: "Dismiss", shortLabel: "Dismiss", description: "Optional close button. Omit when the user must act before continuing.",  pinX: 97, pinY: 50, x: 95, y: 140, anchor: "tl" },
              ]}
              preview={
                <div className="flex items-center gap-3 px-4 py-2.5 w-[460px] bg-s4e-brand-primary-600 text-s4e-text-white">
                  <Sparkles size={14} className="shrink-0" />
                  <div className="flex-1 min-w-0 text-[12px] leading-tight">
                    New: AI-assisted vulnerability triage is live for all teams.
                  </div>
                  <a href="#" className="text-[11px] font-semibold underline underline-offset-2 shrink-0">
                    Try it
                  </a>
                  <button type="button" aria-label="Dismiss" className="shrink-0 p-1 -m-1 rounded">
                    <X size={14} />
                  </button>
                </div>
              }
            />

            <BannerSpecs />

            <UseCases
              items={[
                "Trial / billing reminders (\"Trial expires in 3 days\").",
                "Scheduled maintenance announcements.",
                "Read-only mode warnings while a degraded service recovers.",
                "Product-wide announcements (new feature launches, deprecation notice).",
              ]}
            />

            <Guidelines
              items={[
                { type: "do",   text: "Place Banner above the top bar so it is the first thing visible." },
                { type: "dont", text: "Don't stack multiple banners — pick the highest priority one." },
                { type: "do",   text: "Make the message readable on a glance — one sentence, active voice." },
                { type: "dont", text: "Don't make critical banners dismissible; the user can hide a billing issue and miss it." },
              ]}
            />
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <BannerExamples />
          </div>
        }
      />
      </PageBody>
    </>
  );
}
