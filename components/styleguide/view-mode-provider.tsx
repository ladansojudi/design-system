"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type ViewMode = "design" | "dev";

// View mode lives in the URL (?view=dev) so it's shareable, bookmarkable and
// survives a reload. We read/write it through the native History API + usePathname
// rather than useSearchParams — the latter forces every static styleguide page
// behind a Suspense boundary (client-side rendered). usePathname has no such cost,
// and Next syncs replaceState with the router.

const PARAM = "view";
const DEV: ViewMode = "dev";

const ViewModeContext = createContext<{
  mode: ViewMode;
  setMode: (m: ViewMode) => void;
}>({ mode: "design", setMode: () => {} });

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<ViewMode>("design");

  // Adopt the mode from the URL on first mount (e.g. a shared ?view=dev link).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get(PARAM) === DEV) {
      setMode(DEV);
    }
  }, []);

  // Keep the URL in sync with the mode. Also re-asserts the param after client
  // navigations, since the sidebar <Link>s don't carry the query string.
  useEffect(() => {
    const url = new URL(window.location.href);
    const current = url.searchParams.get(PARAM);
    if (mode === DEV && current !== DEV) {
      url.searchParams.set(PARAM, DEV);
      window.history.replaceState(null, "", url);
    } else if (mode === "design" && current !== null) {
      url.searchParams.delete(PARAM);
      window.history.replaceState(null, "", url);
    }
  }, [mode, pathname]);

  return (
    <ViewModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
