"use client";

import { useSyncExternalStore } from "react";
import { HighlightedCode, type CodeLang } from "@/components/styleguide/highlighted-code";

const noop = () => () => {};

/**
 * A code block whose `{origin}` placeholder becomes the site's real address,
 * so install commands are copy-paste ready wherever the styleguide is hosted.
 */
export function OriginCode({ code, lang, className }: { code: string; lang: CodeLang; className?: string }) {
  const origin = useSyncExternalStore(noop, () => window.location.origin, () => "https://your-sentinel-site");
  return <HighlightedCode code={code.replaceAll("{origin}", origin)} lang={lang} className={className} />;
}
