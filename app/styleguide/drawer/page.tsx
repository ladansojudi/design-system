import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable, KeyboardTable } from "@/components/styleguide/a11y-docs";
import { DrawerDemo } from "@/sections/overlays/demos";
import { DrawerAnatomyPreview } from "@/sections/overlays/anatomy";
import { Anatomy } from "@/components/styleguide/component-docs";

export const metadata: Metadata = { title: "Drawer" };

export default function DrawerPage() {
  return (
    <ComponentPage
      title="Drawer"
      status="beta"
      description="A panel that slides in from the edge to show details or a short form without leaving the page."
      examples={
        <>
          <SubSection title="From the right" lede="The default: the details of the row the user just picked.">
            <Panel><Row label="side=right"><DrawerDemo /></Row></Panel>
          </SubSection>
          <SubSection title="From the left"><Panel><Row label="side=left"><DrawerDemo side="left" /></Row></Panel></SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse use={["Showing the details of a table row while keeping the list visible behind it.", "A short edit form that doesn't deserve a full page."]} avoid={["A decision that needs an answer right now — use a Modal.", "Primary navigation — use the Sidebar."]} />
          <Guidelines items={[
            { type: "do", text: "Give it a title and a clear Close action." },
            { type: "dont", text: "Stack a drawer on top of another drawer." },
            { type: "do", text: "Keep the primary action in the footer, in the same place as in modals." },
            { type: "dont", text: "Put long multi-step flows in a drawer." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Parts">
            <Anatomy
              parts={[
                  { label: "Header", target: '[class*="border-b"]', side: "left", description: "Title and description on the left, close button on the right." },
                  { label: "Title", target: 'h2', side: "top", description: "DrawerTitle names the dialog for screen readers." },
                  { label: "Close", target: 'button[aria-label="Close"]', side: "top", description: "Closes the drawer; Escape does the same." },
                  { label: "Body", target: '[class*="overflow-y-auto"]', side: "right", description: "Scrolls on its own, so the header and footer stay put." },
                  { label: "Footer", target: '[class*="border-t"]', side: "left", description: "The actions, with the primary action last." },
              ]}
              preview={<div><DrawerAnatomyPreview /></div>}
            />
          </SpecSection>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "open", type: "boolean", default: "—", description: "Whether the drawer is shown." },
              { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Called when it should open or close." },
              { name: "side", type: "\"left\" | \"right\"", default: "\"right\"", description: "Edge it slides from." },
              { name: "size", type: "\"sm\" | \"md\" | \"lg\"", default: "\"md\"", description: "Maximum width." },
              { name: "closeOnBackdrop", type: "boolean", default: "true", description: "Click outside to close." },
              { name: "closeOnEscape", type: "boolean", default: "true", description: "Escape to close." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Width", values: ["384 / 448 / 672px"], note: "sm / md / lg; full width on phones" },
              { label: "Padding", values: ["24px"], note: "Header, body and footer" },
              { label: "Animation", values: ["200ms slide"], note: "Skipped with reduced motion" },
            ]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Default" code={`import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from "@/components/ui/drawer";

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerHeader onClose={() => setOpen(false)}>
    <DrawerTitle>Finding</DrawerTitle>
  </DrawerHeader>
  <DrawerBody>…</DrawerBody>
  <DrawerFooter>…</DrawerFooter>
</Drawer>`} preview={<DrawerDemo />} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Keyboard">
            <KeyboardTable rows={[
            { keys: ["Tab", "Shift + Tab"], action: "Cycles through the drawer's controls; focus doesn't leave." },
            { keys: ["Esc"], action: "Closes the drawer." },
            ]} />
          </A11ySection>
          <A11ySection title="Built in">
            <A11yList items={[
              "role=\"dialog\" with aria-modal, named by DrawerTitle and described by DrawerDescription.",
              "Focus moves in on open, is trapped inside, and returns to the opener on close.",
              "The page behind is inert and scroll is locked while it is open.",
              "Escape closes it.",
            ]} />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={[
              "Always include a DrawerTitle, or pass aria-label.",
              "Give icon-only buttons inside it an aria-label.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast" lede="Computed live from the tokens in the current theme.">
            <ContrastTable rows={[
              { label: "Body text", fg: "text-secondary", bg: "surface-app", min: 4.5 },
              { label: "Title", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Border", fg: "border-default", bg: "surface-app", min: 1.2 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}
