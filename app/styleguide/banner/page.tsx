import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { BannerShowcase, BannerExamples } from "@/sections/banner/banner-showcase";
import { BannerSpecs } from "@/sections/banner/banner-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { Banner } from "@/components/ui/banner";

export const metadata: Metadata = {
  title: "Banner" };

export default function BannerPage() {
  return (
    <>
      <PageHero
        category="Components"
        categoryHref="/styleguide/components"
        title="Banner"
        status="beta"
        description="Full-width page-level notification that sits above the app shell. Used for system-wide state — outages, trials, billing — not per-feature messages."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Banner" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                parts={[
                  { label: "Surface", target: ":scope > *", side: "left", description: "Solid, full-width background; the tone sets the colour." },
                  { label: "Icon", target: "svg|0", side: "top", description: "14px icon that signals the tone." },
                  { label: "Message", target: "div.flex-1", side: "top", description: "One sentence in the active voice." },
                  { label: "CTA", target: "a", side: "top", description: "Optional underlined link to resolve or learn more." },
                  { label: "Dismiss", target: "button", side: "top", description: "Close button. Don't make critical banners dismissible." },
                ]}
                preview={
                  <div className="w-[520px] max-w-full">
                    <Banner tone="promo" message="Scheduled maintenance on Sunday at 02:00 UTC." cta={{ label: "Learn more", href: "#" }} />
                  </div>
                }
              />
              <BannerSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="banner" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <BannerShowcase />
            </DocSection>
            <DocSection title="Usage">
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
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><BannerExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}
