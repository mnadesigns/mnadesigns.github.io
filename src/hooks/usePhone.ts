import { useSyncExternalStore } from "react";

const query = "(max-width: 900px)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// True on a phone-sized screen (the same width the mobile layout of the site starts at).
export function usePhone() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
