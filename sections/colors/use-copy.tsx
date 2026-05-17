"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type CopyCtx = { copy: (value: string, label?: string) => void };

const CopyContext = createContext<CopyCtx>({ copy: () => {} });

export function CopyToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg]   = useState<string | null>(null);
  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const copy = useCallback((value: string, label?: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setMsg((label ?? value) + " ✓");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMsg(null), 2200);
  }, []);

  return (
    <CopyContext.Provider value={{ copy }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={
          "fixed bottom-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none " +
          "bg-s4e-brand-primary-500 text-s4e-text-white " +
          "px-5 py-2 rounded-sm text-[12px] font-mono " +
          "transition-all duration-200 " +
          (msg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3")
        }
      >
        {msg ?? ""}
      </div>
    </CopyContext.Provider>
  );
}

export function useCopy() {
  return useContext(CopyContext).copy;
}
