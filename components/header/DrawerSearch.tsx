import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

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
    <div class="w-screen h-[1px] z-[1] bg-[rgba(0,0,0,.1)] shadow-[0_4px_20px_1px_rgb(0,0,0,.6)]" />
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

function DrawerSearch({ searchbar }: Props) {
  const { displaySearchDrawer } = useUI();

  return (
    <div style={{ display: displaySearchDrawer.value ? "flex" : "none" }}>
      <Aside
        onClose={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
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
