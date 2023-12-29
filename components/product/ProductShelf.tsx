import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  seeMore?: { text: string; link: string };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  layout,
  cardLayout,
  seeMore,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  const shouldShowArrows = ((products?.length || 0) + (seeMore ? 1 : 0)) > 4;

  if (!products || products.length === 0) {
    return null;
  }
  
  const aspectRatio = 1.254;

  return (
    <div class="w-full py-8 flex flex-col gap-5 px-4 mx-auto lg:gap-6 lg:py-10">
      <Header
        title={title || ""}
        fontSize={layout?.headerfontSize || "Normal"}
        alignment={layout?.headerAlignment || "left"}
      />

      <div
        id={id}
        class="w-full grid grid-cols-[38px_1fr_38px] lg:px-4"
      >
        <Slider class="w-full carousel carousel-start gap-2 lg:gap-[15px] col-span-full row-start-2 row-end-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item min-w-[166px] w-[38.6vw] lg:w-[calc((100%-45px)/4)] sm:first:pl-0 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
          {seeMore
            ? (
              <Slider.Item
                index={products.length}
                class="carousel-item min-w-[166px] w-[38.6vw] lg:w-[22.38vw] xl:w-[22.88vw] 2xl:w-[23.31vw] sm:first:pl-0 sm:last:pr-0"
              >
                <div className="card card-compact group w-full">
                  <a
                    class="w-full flex items-center justify-center bg-[#F6F6F6] border border-black lg:border-none"
                    href={seeMore?.link}
                    style={{aspectRatio: `151.45 / 190 `}}
                  >
                    <span className="text-[#121212] px-5 py-1.5 block text-center text-[13px] lg:uppercase lg:text-[15px] leading-[130%] font-semibold lg:font-normal lg:border rounded-full lg:border-[#121212]">
                      {seeMore?.text}
                    </span>
                  </a>
                  <div class="flex-auto flex flex-col pt-[15px] lg:pt-5 gap-3 lg:gap-4">
                  </div>
                </div>
                            
              </Slider.Item>
            )
          : null}
        </Slider>
        {shouldShowArrows && (
          <>
            <div class="hidden relative kbd-lg:block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="btn btn-circle btn-ghost absolute right-1/2">
                <Icon size={24} id="ArrowPointingLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative lg:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-ghost absolute left-1/2">
                <Icon size={24} id="ArrowPointingRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
        <SliderJS rootId={id} />
        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
