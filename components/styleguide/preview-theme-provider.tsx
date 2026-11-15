"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

type PreviewTheme = "light" | "dark";

const KEY = "snt:theme";

// The choice lives in localStorage and is read through useSyncExternalStore, so
// the server render and hydration agree (light), then the saved theme applies
// on the client and survives page changes and reloads.
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function read(): PreviewTheme {
  try {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

const PreviewThemeContext = createContext<{
  theme: PreviewTheme;
  setTheme: (t: PreviewTheme) => void;
}>({ theme: "light", setTheme: () => {} });

export function PreviewThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSyncExternalStore(subscribe, read, () => "light" as PreviewTheme);
  const setTheme = useCallback((t: PreviewTheme) => {
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* storage blocked: the choice just won't persist */
    }
    listeners.forEach((l) => l());
  }, []);
  return (
    <PreviewThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </PreviewThemeContext.Provider>
  );
}

export function usePreviewTheme() {
  return useContext(PreviewThemeContext);
}
