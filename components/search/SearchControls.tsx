import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    textSearch?: string;
    searchTerm?: string;
  };

function SearchControls(
  { filters, sortOptions, textSearch, searchTerm }: Props,
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
      <div class="md:hidden flex flex-col">
        <div class="flex flex-row items-center px-4 justify-start  leading-4 text-[13px] font-normal h-[60px] bg-gradient-to-b from-[#dcdcdc40] to-white">
          {searchTerm && (
            <div>
              {textSearch}{" "}
              <span class="bg-black rounded-[20px] py-1 px-3 text-[#FFF4F4] ml-[6px] uppercase">
                {searchTerm}
              </span>
            </div>
          )}
        </div>
        <div class="flex flex-row items-center justify-end w-full h-[60px] bg-gradient-to-b from-[#dcdcdc40] to-white">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          {filters.length > 0 && (
            <Button
              class="btn-ghost btn-xs text-[13px] px-2 py-[5px] px- font-light uppercase leading-0 hover:bg-transparent hover:border hover:border-black rounded-[20px]"
              onClick={() => {
                open.value = true;
              }}
            >
              <Icon id="FilterList" width={19} height={10} />
              Filtrar
            </Button>
          )}
        </div>
      </div>
      <div class="hidden md:flex justify-between flex-row h-[60px] ">
        <div class="flex flex-row items-center justify-center p-0 pl-[206px] leading-4 text-[13px] mx-auto font-normal">
          {searchTerm && (
            <div>
              {textSearch}{" "}
              <span class="bg-black rounded-[20px] py-1 px-3 text-[#FFF4F4] ml-[6px] uppercase">
                {searchTerm}
              </span>
            </div>
          )}
        </div>
        <div class="flex flex-row items-center justify-between w-auto gap-4 pr-1">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          {filters.length > 0 && (
            <Button
              class="btn-ghost btn-xs text-[13px] px-2 py-[5px] px- font-light uppercase leading-0 hover:bg-transparent hover:border hover:border-black rounded-[20px]"
              onClick={() => {
                open.value = true;
              }}
            >
              <Icon id="FilterList" width={19} height={10} />
              Filtrar
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
