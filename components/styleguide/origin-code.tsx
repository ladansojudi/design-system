"use client";

import { useSyncExternalStore } from "react";
import { SITE_URL } from "@/lib/site";
import { HighlightedCode, type CodeLang } from "@/components/styleguide/highlighted-code";

const noop = () => () => {};

/**
 * A code block whose `{origin}` placeholder becomes the site's real address.
 * On the server (and before hydration) it uses SITE_URL, so crawlers and
 * no-JS readers see the real address too; in the browser it follows the
 * current origin, so previews and localhost copy correctly.
 */
export function OriginCode({ code, lang, className }: { code: string; lang: CodeLang; className?: string }) {
  const origin = useSyncExternalStore(noop, () => window.location.origin, () => SITE_URL);
  return <HighlightedCode code={code.replaceAll("{origin}", origin)} lang={lang} className={className} />;
}
