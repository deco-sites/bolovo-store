import { signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const scroll = signal<number>(0); // y

if (IS_BROWSER) {
  document.addEventListener(
    "scroll",
    (e) => {
      e.preventDefault();
      scroll.value = globalThis.window.scrollY;
    },
  );
}

export const useScroll = () => scroll;
