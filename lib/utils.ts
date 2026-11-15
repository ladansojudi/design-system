import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// tailwind-merge treats unknown `text-*` classes as colours, so without this it
// would drop the Sentinel type scale (`text-snt-14`) whenever a colour like
// `text-snt-text-secondary` follows it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [(value: string) => /^snt-\d+$/.test(value)] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Portalled UI (Modal, Drawer, Menu, Select list, Toasts) is mounted on <body>,
 * outside the app's `.dark` / `[data-snt-theme]` wrapper, so it would always
 * render light. Call this with the element it belongs to (the trigger, or the
 * previously focused element) to copy the nearest theme onto the portalled node.
 */
export function inheritTheme(source: Element | null | undefined, target: HTMLElement | null | undefined) {
  if (!target) return
  const themed = source?.closest<HTMLElement>(".dark, [data-snt-theme]")
  const dark = !!themed && (themed.classList.contains("dark") || themed.dataset.sntTheme === "dark")
  target.classList.toggle("dark", dark)
  if (dark) target.dataset.sntTheme = "dark"
  else delete target.dataset.sntTheme
}
