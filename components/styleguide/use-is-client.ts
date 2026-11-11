import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * true in the browser, false during SSR and hydration — without a
 * setState-in-effect round trip. Use it to gate portals and browser-only UI.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
