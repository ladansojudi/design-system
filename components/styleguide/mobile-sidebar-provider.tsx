"use client";

import { createContext, useContext, useState } from "react";

const MobileSidebarContext = createContext<{
  open: boolean;
  setOpen: (o: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function MobileSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <MobileSidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  return useContext(MobileSidebarContext);
}
