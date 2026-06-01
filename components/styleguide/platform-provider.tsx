"use client";

import { createContext, useContext, useState } from "react";

export type Platform = "react" | "swift" | "xml";

const PlatformContext = createContext<{
  platform: Platform;
  setPlatform: (p: Platform) => void;
}>({ platform: "react", setPlatform: () => {} });

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = useState<Platform>("react");
  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  return useContext(PlatformContext);
}
