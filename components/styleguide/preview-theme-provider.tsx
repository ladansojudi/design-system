"use client";

import { createContext, useContext, useState } from "react";

type PreviewTheme = "light" | "dark";

const PreviewThemeContext = createContext<{
  theme: PreviewTheme;
  setTheme: (t: PreviewTheme) => void;
}>({ theme: "light", setTheme: () => {} });

export function PreviewThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<PreviewTheme>("light");
  return (
    <PreviewThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </PreviewThemeContext.Provider>
  );
}

export function usePreviewTheme() {
  return useContext(PreviewThemeContext);
}
