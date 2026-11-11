import fs from "node:fs";
import path from "node:path";
import type React from "react";
import { A11ySection } from "@/components/styleguide/a11y-docs";

// Accessibility tab for pages that haven't been hand-written yet: renders the
// "## Accessibility" section of docs/components/<slug>.md, so the docs stay the
// single source. Server component; handles the Markdown subset the docs use —
// paragraphs, bullet lists, tables, **bold**, `code` and [links](url).

function inline(text: string, key: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const k = `${key}-${i++}`;
    if (t.startsWith("`")) {
      out.push(<code key={k} className="rounded bg-snt-bg-subtle px-1 py-0.5 font-mono text-snt-12 text-snt-text-primary">{t.slice(1, -1)}</code>);
    } else if (t.startsWith("**")) {
      out.push(<strong key={k} className="font-semibold text-snt-text-primary">{t.slice(2, -2)}</strong>);
    } else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const external = /^https?:/.test(href);
      out.push(
        <a key={k} href={external ? href : undefined} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="relative font-medium text-snt-text-link hover:underline">
          {label}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function render(md: string): React.ReactNode[] {
  const lines = md.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|\s*-/.test(lines[i])) rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={`t${i}`} className="overflow-x-auto rounded-xl border border-snt-border-default">
          <table className="w-full text-left">
            <thead className="bg-snt-bg-subtle">
              <tr>{head.map((h, c) => <th key={c} scope="col" className="px-4 py-2.5 text-snt-12 font-medium text-snt-text-secondary">{inline(h, `h${c}`)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-snt-border-default">
                  {r.map((c, ci) => <td key={ci} className="px-4 py-3 align-top text-snt-14 text-snt-text-primary">{inline(c, `c${ri}${ci}`)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) { items.push(lines[i].slice(2)); i++; }
      blocks.push(
        <ul key={`l${i}`} className="max-w-3xl list-disc space-y-2 pl-5 text-snt-14 leading-relaxed text-snt-text-primary marker:text-snt-text-secondary">
          {items.map((t, k) => <li key={k}>{inline(t, `li${i}${k}`)}</li>)}
        </ul>,
      );
      continue;
    }
    if (line.startsWith("#")) { i++; continue; }
    blocks.push(<p key={`p${i}`} className="max-w-3xl text-snt-14 leading-relaxed text-snt-text-primary">{inline(line, `p${i}`)}</p>);
    i++;
  }
  return blocks;
}

export function DocA11y({ slug }: { slug: string }) {
  let section = "";
  try {
    const md = fs.readFileSync(path.join(process.cwd(), "docs", "components", `${slug}.md`), "utf8");
    section = md.split(/^## Accessibility\s*$/m)[1]?.split(/^## /m)[0]?.trim() ?? "";
  } catch {
    /* no doc for this page */
  }
  return (
    <A11ySection title="Accessibility" lede="How the component meets WCAG 2.2 AA, and what stays your responsibility.">
      {section ? <div className="space-y-4">{render(section)}</div> : (
        <p className="text-snt-14 text-snt-text-secondary">Not documented yet.</p>
      )}
    </A11ySection>
  );
}
