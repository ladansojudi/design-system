import type { Metadata } from "next";
import { PageHero } from "@/components/styleguide/page-hero";
import { PageBody } from "@/components/styleguide/page-body";
import { OpenInFigma } from "@/components/styleguide/open-in-figma";
import { DataTableShowcase, DataTableExamples } from "@/sections/data-table/data-table-showcase";
import { DataTableSpecs } from "@/sections/data-table/data-table-specs";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { ComponentTabs, ComponentTabPanel } from "@/components/styleguide/component-tabs";
import { FigmaNote } from "@/components/styleguide/figma-note";
import { DocA11y } from "@/components/styleguide/doc-a11y";
import { ModeAware } from "@/components/styleguide/mode-aware";
import { DocSection } from "@/components/styleguide/doc-section";
import { DataTable, DataTableHeader, DataTableBody, DataTableColumnHeaders, DataTableRow, DataTableFooter } from "@/components/ui/data-table";

export const metadata: Metadata = {
  title: "Data Table",
};

export default function Page() {
  return (
    <>
      <PageHero category="Components"
        categoryHref="/styleguide/components" title="Data Table" status="beta" description="Dashboard table surface for listing threats, assets and findings — configurable header with badge, description and View all link."
        actions={<OpenInFigma />}
        tabs={<ComponentTabs />}
      />

      <ComponentTabPanel>
      <PageBody>


      <ModeAware
        specs={
          <div className="mt-8 space-y-10 sm:mt-10">
            <FigmaNote component="Data Table" />
            <DocSection title="Specs" hideTitle>
              <Anatomy
                layout="stacked"
                parts={[
                  { label: "Top header",          target: '[class*="gap-4"][class*="py-4"]', side: "left", description: "Title with an info tooltip, the description underneath, an optional status pill and an optional View all button." },
                  { label: "Info tooltip",        target: 'button[aria-label^="About"]', side: "top", description: "Info icon placed after the title, column or row text; reveals context on hover and focus." },
                  { label: "Badge (optional)",    target: 'span[class*="rounded-full"][class*="border"]', side: "top", description: "Quiet pill next to the title that tags the widget (Live, New, Beta…) with a status dot." },
                  { label: "View all (optional)", target: 'button[class*="text-snt-text-link"]', side: "top", description: "Ghost button with an arrow that opens the full list view." },
                  { label: "Column headers",      target: '[role="row"]|0', side: "left", description: "12px sentence-case labels on a subtle band, each starting at the left edge of its column." },
                  { label: "Row",                 target: '[role="row"]|1', side: "left", description: "Text cells and a severity badge; the hover highlight makes the row selectable." },
                  { label: "Severity badge",      target: '[role="row"]:nth-of-type(2) [role="cell"]:last-child > div', side: "right", description: "Fixed-width badge, so the column stays tidy." },
                  { label: "Footer",              target: '[aria-label="Pagination"]', side: "left", description: "Rows-per-page selector, range indicator and previous / next buttons." },
                ]}
                preview={
                  <DataTable>
                    <DataTableHeader title="Priority actions" description="Security issues prioritised by risk growth." badge="Live" viewAllLabel="View all" />
                    <DataTableBody>
                      <DataTableColumnHeaders />
                      <DataTableRow threat="SQL injection in /search" asset="storefront.example.com" date="2026-11-09" severity="critical" />
                      <DataTableRow threat="TLS certificate expiring" asset="lb-eu-west-1.example.com" date="2026-11-07" severity="high" />
                    </DataTableBody>
                    <DataTableFooter perPage={5} rangeLabel="1–2 of 492" />
                  </DataTable>
                }
              />
              <DataTableSpecs />
            </DocSection>
          </div>
        }
        a11y={
          <div className="mt-8 sm:mt-10">
            <DocA11y slug="data-table" />
          </div>
        }
        design={
          <div className="space-y-16 mt-8 sm:mt-10">
            <DocSection title="Examples">
              <DataTableShowcase />
            </DocSection>
            <DocSection title="Usage">
              <UseCases
                items={[
                  "Use on dashboards to surface the first N rows of a larger list with a View all link.",
                  "Use a badge when the widget benefits from a state cue (Live, New detections, Beta data).",
                  "Always include the description — it's the only line that tells the user what the list is filtered by.",
                  "Add an info tooltip next to any column whose value is ambiguous or product-specific.",
                ]}
              />
              <Guidelines
                items={[
                  { type: "do",   text: "Keep titles short (2–3 words). Use the description for context, not the title." },
                  { type: "dont", text: "Don't stack more than one badge in the header — it dilutes meaning." },
                  { type: "do",   text: "Show View all when the backing dataset exceeds the rendered page size." },
                  { type: "dont", text: "Don't hide the description — it's a required part of the top header, not a decoration." },
                  { type: "do",   text: "Truncate long cells with ellipsis and expose full text on hover via tooltip." },
                  { type: "dont", text: "Don't remove the paginator even when there's a single page — show the total range." },
                ]}
              />
            </DocSection>
            
          </div>
        }
        dev={
          <div className="mt-8 sm:mt-10">
            <DocSection title="Examples"><DataTableExamples /></DocSection>
          </div>
        }
      />
      </PageBody>
      </ComponentTabPanel>
    </>
  );
}
