import type { Metadata } from "next";
import { ComponentPage } from "@/components/styleguide/component-page";
import { Panel, Row, SpecSection, SubSection, WhenToUse } from "@/components/styleguide/doc-blocks";
import { Guidelines } from "@/components/styleguide/component-docs";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DimensionsTable, PropertiesTable } from "@/components/styleguide/specs";
import { A11yList, A11ySection, ContrastTable, KeyboardTable } from "@/components/styleguide/a11y-docs";
import { DropdownMenuDemo } from "@/sections/overlays/demos";
import { DropdownMenuAnatomyPreview } from "@/sections/overlays/anatomy";
import { Anatomy } from "@/components/styleguide/component-docs";

export const metadata: Metadata = { title: "Dropdown menu" };

export default function MenuPage() {
  return (
    <ComponentPage
      title="Dropdown menu"
      status="beta"
      description="A list of actions behind a button: row actions, “More”, account. Not for navigation or form values."
      examples={
        <>
          <SubSection title="Actions" lede="Icons, a shortcut hint, a disabled item and a destructive item after a separator.">
            <Panel><Row label="align=start"><DropdownMenuDemo /></Row><Row label="align=end"><div className="flex w-full justify-end"><DropdownMenuDemo align="end" /></div></Row></Panel>
          </SubSection>
        </>
      }
      usage={
        <>
          <WhenToUse use={["Secondary actions for a row, card or page that would clutter it as buttons.", "Grouping related commands under one trigger."]} avoid={["Choosing a value in a form — use Select.", "Moving between pages — use links or Tabs."]} />
          <Guidelines items={[
            { type: "do", text: "Keep labels short verbs: \"Re-run scan\", \"Delete asset\"." },
            { type: "dont", text: "Hide the only way to do an important task inside a menu." },
            { type: "do", text: "Put destructive actions last, after a separator." },
            { type: "dont", text: "Nest menus inside menus." },
          ]} />
        </>
      }
      specs={
        <>
          <SpecSection title="Parts">
            <Anatomy
              parts={[
                  { label: "Trigger", target: 'button[aria-haspopup]', side: "top", description: "A button with aria-haspopup and aria-expanded." },
                  { label: "Menu panel", target: '[role="menu"]', side: "left", description: "Floating surface, opened below the trigger, flips above when there is no room." },
                  { label: "Label", target: '[role="presentation"]', side: "right", description: "Groups related items; not focusable." },
                  { label: "Item", target: '[role="menuitem"]|0', side: "right", description: "Icon, label and an optional shortcut hint." },
                  { label: "Separator", target: '[role="separator"]', side: "right", description: "Sets off the destructive action." },
                  { label: "Destructive item", target: '[role="menuitem"]|2', side: "right", description: "Red text for actions that destroy data." },
              ]}
              preview={<div><DropdownMenuAnatomyPreview /></div>}
            />
          </SpecSection>
          <SpecSection title="Properties">
            <PropertiesTable rows={[
              { name: "align", type: "\"start\" | \"end\"", default: "\"start\"", description: "DropdownMenuContent: which edge of the button it lines up with." },
              { name: "onSelect", type: "() => void", default: "—", description: "DropdownMenuItem: called when chosen; the menu closes." },
              { name: "destructive", type: "boolean", default: "false", description: "DropdownMenuItem: red text for actions that destroy data." },
              { name: "shortcut", type: "string", default: "—", description: "DropdownMenuItem: right-aligned hint. You wire the shortcut." },
              { name: "disabled", type: "boolean", default: "false", description: "DropdownMenuItem: stays visible, can't be chosen." },
            ]} />
          </SpecSection>
          <SpecSection title="Sizing & spacing">
            <DimensionsTable columns={["value"]} rows={[
              { label: "Item height", values: ["32px"], note: "Padding 6 × 10px" },
              { label: "DropdownMenu", values: ["min width = button width"], note: "Max height 320px, then scrolls" },
              { label: "Offset", values: ["4px below the button"], note: "Flips above if there's no room" },
            ]} />
          </SpecSection>
        </>
      }
      code={
        <>
          <ExampleCard title="Default" code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";

<DropdownMenu>
  <DropdownMenuTrigger className={buttonVariants({ intent: "neutral", variant: "outline" })}>Actions</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onSelect={rescan}>Re-run scan</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive onSelect={remove}>Delete scan</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`} preview={<DropdownMenuDemo />} />
        </>
      }
      accessibility={
        <>
          <A11ySection title="Keyboard">
            <KeyboardTable rows={[
            { keys: ["Enter", "Space", "↓"], action: "Opens the menu and focuses the first item." },
            { keys: ["↑"], action: "On the button: opens and focuses the last item." },
            { keys: ["↑", "↓"], action: "Moves between items, wrapping at the ends." },
            { keys: ["Home", "End"], action: "First / last item." },
            { keys: ["Esc"], action: "Closes and returns focus to the button." },
            ]} />
          </A11ySection>
          <A11ySection title="Built in">
            <A11yList items={[
              "Follows the WAI-ARIA menu button pattern: aria-haspopup, aria-expanded, role=menu and menuitem.",
              "Opens with Enter, Space or the arrow keys; focus lands on the first (or last) item.",
              "Type-ahead jumps to the next item starting with the typed letters.",
              "Escape closes it and returns focus to the button; Tab closes it too.",
            ]} />
          </A11ySection>
          <A11ySection title="Your responsibility">
            <A11yList items={[
              "Give an icon-only trigger an aria-label.",
              "Don't put form controls or links inside a menu.",
            ]} />
          </A11ySection>
          <A11ySection title="Contrast" lede="Computed live from the tokens in the current theme.">
            <ContrastTable rows={[
              { label: "Item", fg: "text-primary", bg: "surface-app", min: 4.5 },
              { label: "Destructive item", fg: "text-error", bg: "surface-app", min: 4.5 },
              { label: "Shortcut hint", fg: "text-secondary", bg: "surface-app", min: 4.5 },
            ]} />
          </A11ySection>
        </>
      }
    />
  );
}
