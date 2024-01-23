import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type Props from "$store/components/PLP/CategoryResult.tsx"

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
    currentCategory?: string;
    parentCategory?: string;
    subCategories: {
      label: string;
      url: string;
    }[];
  }; 

function GalleryControls(
  { filters, displayFilter, sortOptions, subCategories, currentCategory, parentCategory}: Props,
) {
  const open = useSignal(false);
  const id = useId();

  function removeAcentos(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  return (
    
    <div className="flex w-full lg:px-[15px]">
      <Drawer
        class="w-full"
        loading="lazy"
        open={open.value}
        onClose={() => open.value = false}
        aside={
          <>
            <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-visible">
              <div class="flex justify-between items-center">
                <h1 class="px-4 py-3">
                  <span class="font-medium text-2xl">Filtrar</span>
                </h1>
                <Button
                  class="btn btn-ghost"
                  onClick={() => open.value = false}
                >
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
        <div className="flex mb-5 flex-col lg:flex-row justify-between lg:w-[calc(100vw-45px)]">
          <div className="flex lg:w-[88%] items-center relative px-2 mb-[10px] lg:mb-0 lg:px-0 max-w-[100vw] justify-start overflow-x-auto overflow-y-visible shadow-[0_5px_12px_0_rgba(220,220,220,0.25)] lg:shadow-none">
            <div className="absolute inset-y-0 right-0 w-[10%] lg:w-[6.5%] bg-gradient-to-r from-transparent via-white to-white pointer-events-none"></div>
            {parentCategory && (
              <>
            <a
              href={`/` + parentCategory}
              class="group leading-none py-[5px] px-3 pr-5 flex w-auto lg:h-auto rounded-[20px] items-center">
                <span
                  class={`text-[14px] lg:text-[15px] font-medium uppercase text-[#000]
                  }`}
                >
                  {parentCategory}
                </span>
                <span class="ml-5 text-black">{'>'}</span>
            </a>  
              <Slider class="py-[17.5px] carousel carousel-start gap-4 lg:gap-7 row-start-2 row-end-5 overflow-x-scroll">
                <Slider.Item
                    index={0}
                    class="flex carousel-item sm:first:pl-0 last:pr-6 sm:last:pr-14"
                >
                  <a
                    href={!parentCategory ? `/` + currentCategory : `/` + parentCategory}
                    class={`group btn-ghost leading-none btn-xs py-[5px] px-3 flex w-auto lg:h-auto rounded-[20px] bg-transparent hover:bg-black hover:border hover:border-black ${
                      currentCategory ==  parentCategory ? '!bg-black' : ''
                    }`}
                  >
                    <span
                      class={`text-[13px] uppercase text-[#121212] group-hover:text-white ${
                        currentCategory == parentCategory ? "text-white" : ""
                      }`}
                    >
                      Ver Todos
                    </span>
                  </a>
                </Slider.Item>
                {subCategories?.map(({ label, url }, index) => (
                  <Slider.Item
                    index={index}
                    class="flex carousel-item sm:first:pl-0 last:pr-6 sm:last:pr-14"
                  >
                    <a
                      href={`/` + parentCategory + url}
                      class={`group btn-ghost leading-none btn-xs py-[5px] px-3 flex w-auto lg:h-auto rounded-[20px] bg-transparent hover:bg-black hover:border hover:border-black ${
                        currentCategory == removeAcentos((label || '').toLowerCase()) ? '!bg-black' : ''
                      }`}
                    >
                      <span
                        class={`text-[13px] uppercase text-[#121212] group-hover:text-white ${
                          currentCategory ==  removeAcentos((label || '').toLowerCase()) ? '!text-white' : ''
                        }`}
                      >
                        {label}
                      </span>
                    </a>
                  </Slider.Item>
                ))}
              </Slider>
              </>
            )}
            <SliderJS rootId={id} />
          </div>
          <div class="flex flex-row items-center gap-4 min-w-[211px] px-2 justify-end lg:px-0">
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
            {filters.length > 0 && (
              <div class="relative flex z-20 w-auto">
              <Button
                class="btn-ghost btn-xs text-[13px] px-2 py-[5px] px- font-light uppercase leading-0 hover:bg-transparent hover:border hover:border-black rounded-[20px]"
                onClick={() => {
                  open.value = true;
                }}
              >
                <Icon id="FilterList" width={19} height={10} />
                Filtrar
              </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default GalleryControls;
