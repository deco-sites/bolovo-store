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
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden">
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
      <div class="flex flex-col justify-between mb-4 md:mb-0 md:flex-row md:h-[53px]">
        <div class="flex flex-row items-center md:justify-center justify-start md:p-0 mb-2 md:pl-[206px] leading-4 text-[13px] md:mx-auto font-normal">
          VOCÊ PESQUISOU POR <span class="bg-black rounded-[20px] py-1 px-3 text-[#FFF4F4] ml-[6px]">JAQUETAS</span>
        </div>

        <div class="flex flex-row items-center md:justify-between md:gap-4">
          {}
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
