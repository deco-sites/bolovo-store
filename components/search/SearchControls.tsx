import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import SelectedFilters from "$store/islands/SelectedFilters.tsx";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import ApplyFiltersJS from "deco-sites/bolovo-store/islands/ApplyFiltersJS.tsx";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    textSearch?: string;
    searchTerm?: string;
    url: string;
  };

function SearchControls(
  { filters, sortOptions, textSearch, searchTerm, url, breadcrumb }: Props,
) {
  const open = useSignal(false);
  const removeFilters = () => {
    const urlNoQuery = url.split("&")[0];
    window.history.replaceState({}, "", urlNoQuery);
    window.location.reload();
  };

  return (
    <Drawer
      class="drawer-end"
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden max-w-[408px]">
            <div class="flex flex-row w-full justify-end items-center">
              <span class="font-medium text-sm leading-[18px]">
                Fechar
              </span>
              <Button
                class="btn btn-ghost hover:bg-transparent disabled:bg-transparent block p-[15px]"
                onClick={() => open.value = false}
              >
                <Icon
                  id="XMark"
                  size={15}
                  strokeWidth={2}
                  class="text-[#121212]"
                />
              </Button>
            </div>
            <div class="flex flex-row justify-between pl-[21px] pr-[15px] text-[15px] mt-5">
              <span class="font-semibold uppercase">FILTROS</span>
              <span class="font-normal uppercase">
                {selectedFilters.value.length} APLICADOS
              </span>
            </div>
            <div>
              <SelectedFilters filters={filters} />
            </div>
            <div class="border-b pb-[25px] border-opacity-30 border-[#121212] mr-[15px] ml-[21px]" />
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
              <div class="w-full pl-[21px] pr-[15px] mt-14">
                <div class="pb-2">
                  <Button
                    // onClick={() =>
                    //   selectedFilters.value.length < 1 ? removeFilters() : null}
                    class="btn btn-active btn-sm w-full rounded-[15px] bg-black text-white hover:bg-black text-[15px] font-normal"
                    id="apply-filters"
                  >
                    APLICAR FILTROS
                  </Button>
                  <ApplyFiltersJS
                    rootId="apply-filters"
                    buttonId="apply-filters"
                  />
                </div>
                {selectedFilters.value.length > 0 && (
                  <div class="pb-4 inline-block w-full">
                    <a
                      class="inline-block w-full"
                      href={breadcrumb?.itemListElement.at(-1)?.item ?? ""}
                    >
                      <Button
                        onClick={() => removeFilters()}
                        class="btn btn-active btn-sm w-full rounded-[15px] bg-white border border-black hover:bg-white text-[15px] font-normal"
                      >
                        REMOVER TODOS OS FILTROS
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      }
    >
      <div class="md:hidden flex flex-col">
        <div class="flex flex-row items-center px-[15px] justify-start  leading-4 text-[13px] font-normal h-[60px] shadow-[0_5px_12px_0_rgba(220,220,220,0.25)]">
          {searchTerm && (
            <div>
              {textSearch}{" "}
              <span class="bg-black rounded-[20px] py-1 px-3 text-[#FFF4F4] ml-[6px] uppercase">
                {searchTerm}
              </span>
            </div>
          )}
        </div>
        <div class="px-[15px] flex flex-row items-center justify-end w-full h-[60px] ">
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
      <div class="hidden md:flex px-[15px] justify-between flex-row h-[60px] mb-[22px] mt-[10px]">
        <div class="flex flex-row items-center justify-center p-0 pl-[202px] leading-4 text-[13px] mx-auto font-normal">
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
