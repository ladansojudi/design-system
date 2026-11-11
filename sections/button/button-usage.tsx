import type React from "react";
import { Button } from "@/components/ui/button";

function SectionTitle({ children, lede }: { children: React.ReactNode; lede?: string }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <span aria-hidden className="hidden">▶▶</span>
        <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
      </div>
      {lede && <p className="mt-1 max-w-2xl text-snt-14 leading-relaxed text-snt-text-secondary">{lede}</p>}
    </div>
  );
}

const ROWS: { button: React.ReactNode; name: string; use: string }[] = [
  { button: <Button>Start scan</Button>, name: "Primary · solid", use: "The one main action in an area: a page header, a form, a modal." },
  { button: <Button variant="outline">Preview</Button>, name: "Primary · outline", use: "A second action next to the main one." },
  { button: <Button intent="neutral" variant="outline">Cancel</Button>, name: "Neutral · outline", use: "Cancel, Back, Close, and other actions that don't change data." },
  { button: <Button intent="neutral" variant="ghost">Filters</Button>, name: "Neutral · ghost", use: "Low-emphasis actions in toolbars, table rows and cards." },
  { button: <Button intent="destructive">Delete asset</Button>, name: "Destructive · solid", use: "An action that can't be undone, usually inside a confirmation modal." },
];

export function ButtonUsage() {
  return (
    <div className="space-y-10">
      <div>
        <SectionTitle lede="Use a button to do something on the current page. To go to another page, use a link (it can look like a button).">
          Which button to use
        </SectionTitle>
        <div className="relative overflow-hidden rounded-xl border border-snt-border-default">
          <table className="w-full text-left">
            <caption className="sr-only">Which button to use for each kind of action</caption>
            <thead className="bg-snt-bg-subtle">
              <tr>
                <th scope="col" className="w-44 px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">Button</th>
                <th scope="col" className="hidden w-44 px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary sm:table-cell">Combination</th>
                <th scope="col" className="px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">Use it for</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.name} className="border-t border-snt-border-default align-middle">
                  <td className="px-4 py-3">{r.button}</td>
                  <td className="hidden px-4 py-3 font-mono text-snt-12 text-snt-text-secondary sm:table-cell">{r.name}</td>
                  <td className="px-4 py-3 text-snt-14 leading-relaxed text-snt-text-primary">{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
