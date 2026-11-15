import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable, KeyboardTable } from "@/components/styleguide/a11y-docs";
import { PaginationDemo } from "@/sections/overlays/demos";

export const metadata: Metadata = { title: "Pagination" };

export default function PaginationPage() {
  return (
    <ComponentPage
      title="Pagination"
      status="beta"
      description="Moves between pages of a long list, with the current page, neighbours and the ends always in reach."
      examples={
        <>
          <SubSection title="Default" lede="Always shows the first and last page, the current page and one neighbour on each side.">
            <Panel><Row label="Page 1 of 20"><PaginationDemo /></Row><Row label="Page 10 of 20"><PaginationDemo initial={10} /></Row><Row label="Page 3 of 5"><PaginationDemo pageCount={5} initial={3} /></Row></Panel>
          </SubSection>
          <SubSection title="Sizes"><Panel><Row label="sm"><PaginationDemo size="sm" initial={4} /></Row><Row label="md"><PaginationDemo size="md" initial={4} /></Row></Panel></SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse use={["Long tables and result lists where the user needs to reach a specific page.", "Content whose order is stable between visits."]} avoid={["Short lists (under ~20 rows) — show them all.", "Feeds and timelines — use a Load more button."]} />
          <Guidelines items={[
            { type: "do", text: "Show the total (\"1–25 of 312\") next to the control so people know the size of the list." },
            { type: "dont", text: "Reset the page to 1 when the user sorts without telling them." },
            { type: "do", text: "Keep the control in the same place on every page of the list." },
            { type: "dont", text: "Use it for steps in a flow — that's a stepper." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "page", type: "number", default: "—", description: "Current page, starting at 1." },
              { name: "pageCount", type: "number", default: "—", description: "Total pages." },
              { name: "onPageChange", type: "(page: number) => void", default: "—", description: "Called with the new page." },
              { name: "siblingCount", type: "number", default: "1", description: "Pages shown each side of the current one." },
              { name: "size", type: "\"sm\" | \"md\"", default: "\"md\"", description: "Button size." },
              { name: "label", type: "string", default: "\"Pagination\"", description: "Accessible name of the nav landmark." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Page button", values: ["32 × 32px (md), 28 × 28px (sm)"] },
              { label: "Gap", values: ["4px"] },
              { label: "Ellipsis", values: ["same width as a page button"] },
            ]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Default" code={`import { Pagination } from "@/components/ui/pagination";

const [page, setPage] = useState(1);

<Pagination page={page} pageCount={20} onPageChange={setPage} />`} preview={<PaginationDemo />} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Keyboard">
            <KeyboardTable rows={[
            { keys: ["Tab", "Shift + Tab"], action: "Moves between the buttons." },
            { keys: ["Enter", "Space"], action: "Opens the focused page." },
            ]} />
          </A11ySection>
          <A11ySection title="Built in">
            <A11yList items={[
              "It's a nav landmark with a list of buttons, so screen readers announce \"Pagination, navigation\" and the number of items.",
              "The current page has aria-current=\"page\"; page buttons are named \"Page 4\", arrows \"Previous page\" / \"Next page\".",
              "First or last page disables the matching arrow instead of removing it, so the layout doesn't shift.",
            ]} />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={[
              "Announce the result of a page change (\"Showing 26–50 of 312\") in an aria-live region near the list.",
              "Move focus to the top of the list after a change if the list is long.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast" lede="Computed live from the tokens in the current theme.">
            <ContrastTable rows={[
              { label: "Current page", fg: "text-inverse", bg: "text-primary", min: 4.5 },
              { label: "Page number", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Focus ring", fg: "focus-ring", bg: "surface-app", min: 3 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}
