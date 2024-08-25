import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import SelectedFilters from "$store/islands/SelectedFilters.tsx";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import ApplyFiltersJS from "$store/islands/ApplyFiltersJS.tsx";
import type { FilterName } from "./SearchResultMenu.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import DragSliderJS from "$store/islands/DragSliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "sortOptions">
  & {
    currentCategory?: string;
    parentCategory?: string;
    subCategories?: {
      label: string;
      url: string;
    }[];
    categoryURL?: string;
    labelOrdenation: string;
    labelsOfFilters: {
      labelFilter: string;
      labelClose: string;
    };
    filterColors?: Color[];
    filtersNames?: FilterName[];
    textFilters?: string;
    appliedFiltersText?: string;
    applyFiltersText?: string;
    removeFiltersText?: string;
    priceIntl?: boolean;
    labelViewAll: string;
    isDesktop: boolean;
  };

function GalleryControls(
  {
    filters,
    sortOptions,
    subCategories,
    currentCategory = "",
    parentCategory,
    categoryURL,
    filterColors,
    filtersNames,
    textFilters,
    appliedFiltersText,
    applyFiltersText,
    removeFiltersText,
    labelOrdenation,
    labelsOfFilters,
    priceIntl = false,
    labelViewAll,
    isDesktop,
  }: Omit<Props, "page">,
) {
  const open = useSignal(false);

  const removeFilters = () => {
    selectedFilters.value = [];
  };

  function removeAcentos(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const scrollBehavior = (event: WheelEvent) => {
    event.preventDefault();

    const slider = event.currentTarget as HTMLElement;

    const scrollAmount = event.deltaY > 0 ? 200 : -200;

    slider.scrollLeft += scrollAmount;
  };

  const id = useId();

  return (
    <Drawer
      class="drawer-end"
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden max-w-[90%] sm:max-w-[408px] w-full ">
            <div class="hidden sm:flex justify-end items-center">
              <span class="font-medium text-sm leading-[18px]">
                {labelsOfFilters.labelClose}
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
            <div class="flex flex-row justify-between pl-[21px] pr-[15px] mb-2.5 items-center text-[0.938rem] sm:mt-5 mt-14">
              <span class="font-semibold uppercase">{textFilters}</span>
              <span class="sm:hidden flex">
                <Button
                  class="btn btn-ghost hover:bg-transparent disabled:bg-transparent block"
                  onClick={() => open.value = false}
                >
                  <Icon
                    id="XMark"
                    size={18}
                    strokeWidth={2}
                    class="text-[#121212]"
                  />
                </Button>
              </span>
              <span class="sm:flex hidden font-normal uppercase">
                {selectedFilters.value.length} {appliedFiltersText}
              </span>
            </div>
            <SelectedFilters filters={filters} priceIntl={priceIntl} />

            <div class="flex-grow overflow-auto">
              <Filters
                filters={filters}
                filterColors={filterColors ?? []}
                filterNames={filtersNames ?? []}
                priceIntl={priceIntl}
              />
              <div class="w-full pl-[21px] pr-[15px] mt-14">
                <div class="pb-2">
                  <Button
                    class="btn btn-active btn-primary btn-sm w-full rounded-[15px] bg-black text-white hover:bg-black text-[0.938rem] font-normal"
                    id="apply-filters"
                  >
                    {applyFiltersText}
                  </Button>
                  <ApplyFiltersJS
                    rootId="apply-filters"
                    buttonId="apply-filters"
                  />
                </div>
                {selectedFilters.value.length > 0 && (
                  <div class="pb-4 inline-block w-full">
                    <div class="inline-block w-full">
                      <Button
                        onClick={() => removeFilters()}
                        class="btn btn-active btn-sm w-full rounded-[15px] bg-white border border-black hover:bg-white text-[0.938rem] font-normal"
                      >
                        {removeFiltersText}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      }
    >
      <div class="flex mb-5 flex-col lg:flex-row justify-between lg:w-full flex-wrap">
        <div
          id={id}
          class="flex lg:w-[calc(100%-227px)] pb-0 order-1 items-center relative px-2 mb-0 lg:px-0 max-w-[100vw] justify-start overflow-x-auto overflow-y-visible shadow-[0_5px_12px_0_rgba(220,220,220,0.25)] lg:shadow-none"
        >
          <div class="absolute inset-y-0 right-0 w-[10%] lg:w-[6.5%] bg-gradient-to-r from-transparent via-white to-white pointer-events-none">
          </div>
          {parentCategory && (
            <>
              <a
                href={categoryURL}
                class="group leading-none py-[5px] px-3 pr-5 flex w-auto lg:h-auto rounded-[20px] items-center"
              >
                <span
                  class={`text-[0.875rem] lg:text-[0.938rem] font-medium uppercase text-[#000]
                  }`}
                >
                  {parentCategory}
                </span>
                <span class="ml-5 text-black">{">"}</span>
              </a>
              <Slider
                class="py-[17.5px] flex carousel-start gap-4 lg:gap-7 row-start-2 row-end-5 overflow-x-scroll"
                onWheelCapture={scrollBehavior}
              >
                <Slider.Item
                  index={0}
                  class="flex carousel-item sm:first:pl-0 last:pr-6 sm:last:pr-14 snap-none "
                >
                  <a
                    href={categoryURL}
                    class={`group btn-ghost leading-none btn-xs py-[5px] px-3 flex w-auto lg:h-auto rounded-[20px] bg-transparent hover:bg-black hover:border hover:border-black ${
                      removeAcentos(currentCategory) ===
                          removeAcentos(parentCategory)
                        ? "!bg-black"
                        : ""
                    }`}
                  >
                    <span
                      class={`text-[0.813rem] uppercase text-[#121212] group-hover:text-white ${
                        removeAcentos(currentCategory) ===
                            removeAcentos(parentCategory)
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {labelViewAll}
                    </span>
                  </a>
                </Slider.Item>
                {subCategories?.map(({ label, url }, index) => (
                  <Slider.Item
                    index={index}
                    class="flex carousel-item sm:first:pl-0 last:pr-6 sm:last:pr-14 snap-none "
                  >
                    <a
                      href={url}
                      class={`group btn-ghost leading-none btn-xs py-[5px] px-3 flex w-auto lg:h-auto rounded-[20px] bg-transparent hover:bg-black hover:border hover:border-black ${
                        removeAcentos(currentCategory) ===
                            removeAcentos(label || "")
                          ? "!bg-black"
                          : ""
                      }`}
                    >
                      <span
                        class={`text-[0.813rem] uppercase text-[#121212] group-hover:text-white ${
                          removeAcentos(currentCategory) ===
                              removeAcentos(label || "")
                            ? "!text-white"
                            : ""
                        }`}
                      >
                        {label}
                      </span>
                    </a>
                  </Slider.Item>
                ))}
              </Slider>
              {isDesktop && <DragSliderJS rootId={id} />}
            </>
          )}
        </div>
        <div class="flex flex-row items-center gap-4 min-w-[211px] lg:max-w-[227px] px-2 justify-end lg:px-0 order-3 lg:order-2 mt-3 lg:mt-0 lg:pr-4">
          {sortOptions.length > 0 && (
            <Sort
              sortOptions={sortOptions}
              priceIntl={priceIntl}
              label={labelOrdenation}
            />
          )}
          {filters.length > 0 && (
            <div class="relative flex z-20 w-auto">
              <Button
                class="btn-ghost btn-xs text-[0.813rem] px-2 py-[5px] px- font-light uppercase leading-0 hover:bg-transparent hover:border hover:border-black rounded-[20px]"
                onClick={() => {
                  open.value = true;
                }}
              >
                <Icon id="FilterList" width={19} height={10} />
                {labelsOfFilters.labelFilter}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}

export default GalleryControls;
