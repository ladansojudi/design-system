import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { PageHeader } from "@/components/styleguide/page-header";
import { TokenExportShowcase } from "@/sections/token-export/token-export-showcase";
import { UseCases, Guidelines } from "@/components/styleguide/component-docs";

export const metadata: Metadata = {
  title: "Token Export — Design System",
};

function readToken(filename: string): string {
  const p = path.join(process.cwd(), "public", "tokens", filename);
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return `// File not generated yet. Run: npm run tokens`;
  }
}

export default function TokenExportPage() {
  const files = [
    {
      key:         "css" as const,
      label:       "CSS Custom Properties",
      filename:    "tokens.css",
      language:    "CSS",
      whenToUse:   "Web — Next.js, React, Vue, any DOM project. Drop straight into your global stylesheet.",
      description: "Raw CSS variables that match the :root block of the source design system. Use directly with var(--s4e-X) or via the Tailwind classes already generated from these tokens.",
      content:     readToken("tokens.css"),
    },
    {
      key:         "swift" as const,
      label:       "Swift / iOS",
      filename:    "tokens.swift",
      language:    "Swift",
      whenToUse:   "iOS native apps. UIColor + CGFloat + Int + TimeInterval extensions, ready to drop into an Xcode project.",
      description: "Colors as UIColor extensions, spacing as CGFloat, z-index as Int, motion durations as TimeInterval (seconds). Assumes a UIColor(hex:) initializer exists — the file header includes the snippet to add it.",
      content:     readToken("tokens.swift"),
    },
    {
      key:         "android" as const,
      label:       "Android Resources",
      filename:    "tokens.xml",
      language:    "XML",
      whenToUse:   "Android native apps. Drop into res/values/ as a single file; references via @color/x, @dimen/x, @integer/x.",
      description: "Android resource XML — colors, dimens (dp for spacing), and integers (z-index, motion duration in ms). Names use snake_case to match Android conventions.",
      content:     readToken("tokens.xml"),
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-5xl mx-auto space-y-10">
      <PageHeader
        category="Foundations"
        title="Token Export"
        status="stable"
        description="Design tokens compiled to CSS, Swift and Android XML from a single source — app/globals.css. Each platform gets its idiomatic naming and types."
      />

      <TokenExportShowcase files={files} />

      <UseCases
        items={[
          "Web: copy tokens.css into your project or use it as a reference for the existing Tailwind classes.",
          "iOS: drop tokens.swift into your Xcode project and reference colors with .severityCritical, spacing with .space4.",
          "Android: drop tokens.xml into res/values/design_tokens.xml and reference @color/severity_critical, @dimen/space_4.",
          "Run npm run tokens locally to regenerate all three files after editing globals.css.",
          "The prebuild hook auto-runs the export before next build, so deployed Vercel builds always have fresh tokens.",
        ]}
      />

      <Guidelines
        items={[
          { type: "do",   text: "Treat app/globals.css as the single source of truth — never edit the generated files by hand." },
          { type: "dont", text: "Don't add platform-specific overrides to the export files; if a platform needs different values, add a token to globals.css with the platform in the name." },
          { type: "do",   text: "Run npm run tokens after every token change and commit all three output files together." },
          { type: "dont", text: "Don't rely on shadow or easing tokens in Swift/Android exports yet — they need platform-specific formats and are skipped intentionally." },
        ]}
      />
    </div>
  );
}
