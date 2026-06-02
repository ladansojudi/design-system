import type { Metadata } from "next";
import { PageHeader } from "@/components/styleguide/page-header";
import { IconsGrid } from "@/sections/icons/icons-grid";
import { UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Icons — Design System",
};

const SIZE_GUIDE = [
  { px: "12px", use: "Inline text decorations, super-compact tables, badge prefixes." },
  { px: "14px", use: "Default in buttons, inputs, menu items — matches 13px body text." },
  { px: "16px", use: "Default in toolbars and side navigation. Pairs with 14–15px labels." },
  { px: "20px", use: "Empty-state illustrations, larger interactive targets, alert icons." },
  { px: "24px", use: "Section-level icons, feature tiles, page headers." },
];

export default function IconsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto">
      <PageHeader
        category="Foundations"
        title="Icons"
        status="stable"
        description="Lucide React icon set. Click any icon to copy its component name. Stick to the five sizes below — there's no need for 13px or 22px."
      />

      <div className="mt-12 sm:mt-16 space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
            <span className="text-[15px] font-semibold text-s4e-text-primary">Sizing</span>
          </div>
          <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-s4e-surface-table-header">
                <tr className="text-left">
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-24">Size</th>
                  <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((row) => (
                  <tr key={row.px} className="border-t border-s4e-neutral-divider-10">
                    <td className="py-2.5 px-4 font-mono text-[12px] text-s4e-brand-primary-500">{row.px}</td>
                    <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <IconsGrid />

        <UseCases
          items={[
            "Reinforce a label — Export with a download arrow, Delete with a trashcan.",
            "Replace a label only inside dense toolbars where the meaning is unmistakable. Always add aria-label.",
            "Communicate state — checkmark for success, x for error, dot for active.",
            "Anchor empty states with a single 20–24px icon that hints at the missing data type.",
          ]}
        />

        <Guidelines
          items={[
            { type: "do",   text: "Match icon stroke weight across a region — mixing 1.5px and 2px Lucide variants looks accidental." },
            { type: "dont", text: "Don't pair an icon with text that says the same thing twice (\"📥 Download download\")." },
            { type: "do",   text: "Use color sparingly on icons — meaning carries best in the same color as adjacent text." },
            { type: "dont", text: "Don't size icons mid-pixel (15px, 17px) — stick to 12 / 14 / 16 / 20 / 24." },
          ]}
        />
      </div>
    </div>
  );
}
