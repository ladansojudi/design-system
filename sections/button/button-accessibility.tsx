"use client";

import { A11yList, A11ySection, ApgPattern, ContrastTable, KeyboardTable } from "@/components/styleguide/a11y-docs";

const Code = ({ children }: { children: string }) => (
  <code className="rounded bg-snt-bg-subtle px-1 py-0.5 font-mono text-snt-12">{children}</code>
);

export function ButtonAccessibility() {
  return (
    <div className="space-y-14">
      <A11ySection title="Keyboard" lede="Button is a native <button>, so the browser handles focus and activation.">
        <KeyboardTable
          rows={[
            { keys: ["Tab", "Shift + Tab"], action: "Moves focus to and away from the button." },
            { keys: ["Enter", "Space"], action: "Activates the button." },
          ]}
        />
        <div className="mt-4">
          <ApgPattern name="Button" href="https://www.w3.org/WAI/ARIA/apg/patterns/button/" />
        </div>
      </A11ySection>

      <A11ySection title="Built in" lede="What the component already does for you.">
        <A11yList
          items={[
            <>Renders <Code>type=&quot;button&quot;</Code> by default, so it never submits a form by accident.</>,
            <>Focus ring on <Code>:focus-visible</Code> only — keyboard users always see it, mouse clicks don&apos;t.</>,
            <>Loading keeps the button focusable with <Code>aria-disabled</Code> and <Code>aria-busy</Code>, and the label stays readable to screen readers under the spinner.</>,
            <>Icons passed as children are hidden from screen readers (lucide icons are <Code>aria-hidden</Code>).</>,
            <>Smallest size is 32 × 32px, above the 24px minimum target in WCAG 2.5.8.</>,
          ]}
        />
      </A11ySection>

      <A11ySection title="Your responsibility" lede="What the component can't know.">
        <A11yList
          items={[
            <>Give every icon-only button an <Code>aria-label</Code> that names the action (&ldquo;Delete asset&rdquo;, not &ldquo;Trash&rdquo;).</>,
            <>Toggle buttons need <Code>aria-pressed</Code>; menu triggers need <Code>aria-haspopup</Code> and <Code>aria-expanded</Code>.</>,
            <>Use a link (<Code>buttonVariants</Code> on <Code>&lt;Link&gt;</Code>) for navigation, so assistive tech announces it correctly.</>,
            <>Avoid <Code>disabled</Code> without an explanation: disabled buttons leave the tab order and their reason is never read out.</>,
          ]}
        />
      </A11ySection>

      <A11ySection title="Contrast" lede="Computed live from the tokens in the current theme. Switch to dark mode to check it too.">
        <ContrastTable
          rows={[
            { label: "Primary label",      fg: "text-on-accent", bg: "btn-primary-600", min: 4.5 },
            { label: "Neutral label",      fg: "text-inverse",   bg: "text-primary",    min: 4.5 },
            { label: "Destructive label",  fg: "text-on-accent", bg: "btn-error-600",   min: 4.5 },
            { label: "Outline / ghost label", fg: "text-link",   bg: "surface-app",     min: 4.5 },
            { label: "Outline border",     fg: "border-strong",  bg: "surface-app",     min: 3 },
            { label: "Focus ring",         fg: "focus-ring",     bg: "surface-app",     min: 3 },
          ]}
        />
      </A11ySection>
    </div>
  );
}
