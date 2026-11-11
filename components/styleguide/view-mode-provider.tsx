"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

// design = Usage tab, dev = Code tab. Component pages built on the four-tab
// template also use specs and a11y; older pages only know design / dev.
export type ViewMode = "design" | "specs" | "dev" | "a11y";

// URL value per mode (design is the default and has none).
const URL_VALUE: Record<Exclude<ViewMode, "design">, string> = {
  specs: "specs",
  dev:   "dev",
  a11y:  "accessibility",
};
function modeFromUrl(): ViewMode {
  const v = new URLSearchParams(window.location.search).get(PARAM);
  const hit = (Object.keys(URL_VALUE) as (keyof typeof URL_VALUE)[]).find((m) => URL_VALUE[m] === v);
  return hit ?? "design";
}

// View mode lives in the URL (?view=dev) so it's shareable, bookmarkable and
// survives a reload. We read/write it through the native History API + usePathname
// rather than useSearchParams — the latter forces every static styleguide page
// behind a Suspense boundary (client-side rendered). usePathname has no such cost,
// and Next syncs replaceState with the router.

const PARAM = "view";

const noopSubscribe = () => () => {};

const ViewModeContext = createContext<{
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
}>({ mode: "design", setMode: () => {} });

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The URL's mode (a shared ?view=dev link) — "design" during SSR/hydration so
  // the prerendered HTML matches, then the real value on the client.
  const urlMode = useSyncExternalStore(
    noopSubscribe,
    modeFromUrl,
    () => "design" as ViewMode,
  );
  // false for the hydration render, when urlMode is still the server's "design".
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [chosen, setMode] = useState<ViewMode | null>(null);
  // Adopt a ?view= link once, so it survives navigations that drop the query.
  if (chosen === null && urlMode !== "design") setMode(urlMode);
  const mode = chosen ?? urlMode;

  // Keep the URL in sync with the mode. Also re-asserts the param after client
  // navigations, since the sidebar <Link>s don't carry the query string.
  useEffect(() => {
    // Writing during hydration would delete a shared ?view=dev before it's read.
    if (!hydrated) return;
    const url = new URL(window.location.href);
    const current = url.searchParams.get(PARAM);
    const wanted = mode === "design" ? null : URL_VALUE[mode];
    if (wanted && current !== wanted) {
      url.searchParams.set(PARAM, wanted);
      window.history.replaceState(null, "", url);
    } else if (!wanted && current !== null) {
      url.searchParams.delete(PARAM);
      window.history.replaceState(null, "", url);
    }
  }, [hydrated, mode, pathname]);

  return (
    <ViewModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
