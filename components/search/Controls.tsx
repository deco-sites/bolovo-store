import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          <Button
            class="btn-ghost text-[13px] px-1 py-0 font-light uppercase leading-0 hover:bg-transparent"
            onClick={() => {
              open.value = true;
            }}
          >
            <Icon id="FilterList" width={19} height={10} />
            Filtrar
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
