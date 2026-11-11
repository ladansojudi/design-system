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
