import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import type { MiniCartProps } from "$store/components/minicart/vnda/Cart.tsx";
import { lazy, Suspense } from "preact/compat";
import { useSignal } from "@preact/signals";

const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  loading?: "eager" | "lazy";
}

const Aside = (
  { onClose, children }: {
    onClose?: () => void;
    children: ComponentChildren;
  },
) => (
  <div class="bg-[rgba(0,0,0,.5)] grid grid-rows-[auto_1fr] h-screen w-full absolute top-full left-0">
    <div class="w-screen h-[1px] z-[1] bg-[rgba(0,0,0,.1)] shadow-[0_4px_20px_1px_rgb(0,0,0,.6)]">
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
    {onClose && (
      <div class="w-screen h-screen" onClick={onClose}>
      </div>
    )}
  </div>
);

function DrawerSearch({ searchbar, loading = "lazy" }: Props) {
  const { displaySearchDrawer } = useUI();
  const lazy = useSignal(loading === "lazy" && !displaySearchDrawer.value);

  return (
    <div style={{ display: displaySearchDrawer.value ? "flex" : "none" }}>
      <Aside
        onClose={() => {
          console.log(
            "click",
            displaySearchDrawer.value = !displaySearchDrawer.value,
          );
        }}
      >
        {searchbar && displaySearchDrawer.value && (
          <div class="w-screen absolute bg-white py-4 px-9">
            <Searchbar {...searchbar} isSubmit={false} />
          </div>
        )}
      </Aside>
    </div>
  );
}

export default DrawerSearch;
