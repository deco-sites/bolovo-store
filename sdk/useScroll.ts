import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const scroll = signal<number>(0); // y

if (IS_BROWSER) {
  document.addEventListener(
    "scroll",
    () => scroll.value = globalThis.window.scrollY,
    {
      passive: true,
    },
  );
}

export const useScroll = () => scroll;
