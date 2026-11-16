import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable, KeyboardTable } from "@/components/styleguide/a11y-docs";
import { CommandPaletteDemo } from "@/sections/overlays/demos";
import { CommandPaletteAnatomyPreview } from "@/sections/overlays/anatomy";
import { Anatomy } from "@/components/styleguide/component-docs";

export const metadata: Metadata = { title: "Command palette" };

export default function CommandpalettePage() {
  return (
    <ComponentPage
      title="Command palette"
      status="beta"
      description="A searchable list of commands and destinations, opened with a shortcut, for people who know what they want."
      examples={
        <>
          <SubSection title="Default" lede="Press ⌘K (or Ctrl K) on this page, or use the button. Try typing “scan”.">
            <Panel><Row label="Grouped items"><CommandPaletteDemo /></Row></Panel>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse use={["Jumping to any page or running a common action from the keyboard.", "Apps with many destinations where menus would get deep."]} avoid={["Searching content (findings, assets) — use the Search bar and results page.", "The only way to reach a feature — it must also exist in the UI."]} />
          <Guidelines items={[
            { type: "do", text: "Show the keyboard shortcut that opens it somewhere visible." },
            { type: "dont", text: "Put destructive actions in it without a confirmation step." },
            { type: "do", text: "Group items and keep labels as verbs or \"Go to …\"." },
            { type: "dont", text: "Show more than ~8 results without grouping." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Parts">
            <Anatomy
              parts={[
                  { label: "Search field", target: 'input', side: "top", description: "A combobox: type to filter by label, group and keywords." },
                  { label: "Group heading", target: 'li[role="presentation"]', side: "left", description: "Groups results; shown when the group changes." },
                  { label: "Result", target: '[role="option"]|1', side: "right", description: "One command or destination; hover or arrows move the highlight." },
                  { label: "Highlighted result", target: '[role="option"][aria-selected="true"]', side: "left", description: "Enter runs it." },
                  { label: "Hints", target: 'ul + div', side: "bottom", description: "The keys that work: arrows, Enter, Esc." },
              ]}
              preview={<div><CommandPaletteAnatomyPreview /></div>}
            />
          </SpecSection>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "open", type: "boolean", default: "—", description: "Whether it is shown." },
              { name: "onOpenChange", type: "(open: boolean) => void", default: "—", description: "Open / close." },
              { name: "items", type: "CommandItem[]", default: "—", description: "id, label, onSelect, plus optional group, hint, icon, keywords." },
              { name: "placeholder", type: "string", default: "\"Type a command or search…\"", description: "Input placeholder." },
              { name: "emptyLabel", type: "string", default: "\"No results found.\"", description: "Shown when nothing matches." },
              { name: "label", type: "string", default: "\"Command palette\"", description: "Accessible name." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Width", values: ["max 672px"], note: "Built on Modal (size lg)" },
              { label: "Input", values: ["48px high"] },
              { label: "List", values: ["max 320px, then scrolls"], note: "Rows 36px" },
            ]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Default" code={`import { CommandPalette } from "@/components/ui/command-palette";

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={[
    { id: "scans", label: "Go to Scans", group: "Navigate", onSelect: () => router.push("/scans") },
  ]}
/>`} preview={<CommandPaletteDemo />} />
          <ExampleCard title="Open with ⌘K" code={`useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}, []);`} preview={<span className="text-snt-12 text-snt-text-secondary">The shortcut is yours to wire.</span>} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Keyboard">
            <KeyboardTable rows={[
            { keys: ["↑", "↓"], action: "Moves the highlight, wrapping at the ends." },
            { keys: ["Home", "End"], action: "First / last result." },
            { keys: ["Enter"], action: "Runs the highlighted command and closes." },
            { keys: ["Esc"], action: "Closes without running anything." },
            ]} />
          </A11ySection>
          <A11ySection title="Built in">
            <A11yList items={[
              "The input is a combobox controlling a listbox; the highlighted option is exposed with aria-activedescendant.",
              "Built on Modal: focus is trapped, the page is inert and focus returns to the opener.",
              "The number of results is announced politely as you type.",
            ]} />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={[
              "Provide a visible way to open it too — not everyone can press the shortcut.",
              "Name items so they make sense out of context.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast" lede="Computed live from the tokens in the current theme.">
            <ContrastTable rows={[
              { label: "Result", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Group heading", fg: "text-secondary", bg: "surface-app", min: 4.5 },
              { label: "Highlighted result", fg: "text-primary", bg: "bg-subtle", min: 4.5 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}
