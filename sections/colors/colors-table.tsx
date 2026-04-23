"use client";

import { colorGroups, type ColorGroup } from "@/components/styleguide/color-data";
import { CopyButton } from "@/components/styleguide/copy-button";
import { usePreviewTheme } from "@/components/styleguide/preview-theme-provider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Category = {
  id:     string;
  label:  string;
  groups: string[];
};

const categories: Category[] = [
  { id: "severity",   label: "Severity",   groups: ["Severity"] },
  { id: "brand",      label: "Brand",      groups: ["Brand / Primary", "Brand / Secondary"] },
  { id: "scale",      label: "Scale",      groups: ["Scale / Blue", "Scale / Green", "Scale / Yellow", "Scale / Red", "Scale / Purple"] },
  { id: "neutral",    label: "Neutral",    groups: ["Neutral / Grey", "Neutral / Divider"] },
  { id: "surface",    label: "Surface",    groups: ["Surface"] },
  { id: "feedback",   label: "Feedback",   groups: ["Feedback"] },
  { id: "data",       label: "Data",       groups: ["Data"] },
  { id: "status",     label: "Status",     groups: ["Status"] },
  { id: "typography", label: "Typography", groups: ["Typography"] },
];

const groupByName = new Map(colorGroups.map((g) => [g.name, g]));

function GroupBlock({ group, theme }: { group: ColorGroup; theme: "light" | "dark" }) {
  return (
    <section>
      <div className="pb-3 mb-1 border-b border-s4e-neutral-divider-10">
        <h2 className="text-[13px] font-semibold text-s4e-text-primary">{group.name}</h2>
        <p className="mt-0.5 text-xs text-s4e-text-secondary">{group.description}</p>
      </div>

      <div className="overflow-x-auto s4e-scrollbar-hide">
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr className="text-left">
            <th className="py-2 pr-6 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-56">
              Token
            </th>
            <th className="py-2 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {group.colors.map((color) => (
            <tr
              key={color.name}
              className="border-t border-s4e-neutral-divider-10 hover:bg-s4e-surface-row-hover transition-colors duration-75"
            >
              <td className="py-2.5 pr-6">
                <span className="font-mono text-xs text-s4e-text-secondary">{color.name}</span>
              </td>
              <td className="py-2.5">
                <span className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-s4e-neutral-grey-100">
                  <span
                    className={cn(
                      "h-6 w-6 rounded-sm shrink-0 border border-s4e-neutral-divider-10",
                      color.bgClass,
                    )}
                  />
                  <CopyButton value={theme === "light" ? color.lightHex : color.darkHex} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}

export function ColorsTable() {
  const { theme } = usePreviewTheme();

  return (
    <div className="mt-10">
      <Tabs defaultValue={categories[0].id} className="gap-10">
        <TabsList>
          {categories.map((c) => (
            <TabsTrigger key={c.id} value={c.id}>
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((c) => {
          const groups = c.groups.map((n) => groupByName.get(n)).filter(Boolean) as ColorGroup[];
          return (
            <TabsContent key={c.id} value={c.id}>
              <div className="space-y-12">
                {groups.map((g) => (
                  <GroupBlock key={g.name} group={g} theme={theme} />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
