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
  /**
  * @description Choose between the carousel types (Normal with arrows or the last item to be a link to more products)
  */
  /** @default "Arrows" */
  carouselType?: "Arrows" | "See More Link";
  seeMoreText?: string;
  seeMoreLink?: string;
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  layout,
  cardLayout,
  carouselType = "Arrows",
  seeMoreText,
  seeMoreLink,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }

  const renderCarouselItems = () => {
    const itemsToRender = products?.map((product, index) => (
      <Slider.Item
        index={index}
        class="carousel-item min-w-[166px] w-[38.6vw] max-w-[360px] lg:w-[22.08vw] sm:first:pl-0 sm:last:pr-0"
      >
        <ProductCard
          product={product}
          itemListName={title}
          layout={cardLayout}
          platform={platform}
          index={index}
        />
      </Slider.Item>
    ));

    if (carouselType === "See More Link") {
      const lastProduct = products[products.length - 1];
      itemsToRender[products.length - 1] = (
        <Slider.Item
          index={products.length - 1}
          class="carousel-item min-w-[166px] w-[38.6vw] max-w-[360px] lg:w-[22.08vw] sm:first:pl-0 sm:last:pr-0"
        >
          <a class="w-full flex items-center justify-center" href={seeMoreLink}>
            <span className="px-5 py-1.5 uppercase block mt-2 text-center border rounded-lg border-black">{seeMoreText}</span> 
          </a>
        </Slider.Item>
      );
    }

    return itemsToRender;
  };

  return (
    <div class="w-full container max-w-[1630px] py-8 flex flex-col gap-5 lg:gap-6 lg:py-10">
      <Header
        title={title || ""}
        fontSize={layout?.headerfontSize || "Normal"}
        alignment={layout?.headerAlignment || "left"} 
      />

      <div
        id={id}
        class="container max-w-[1630px] grid grid-cols-[48px_1fr_48px] px-4 sm:px-8"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-2 lg:gap-8 col-span-full row-start-2 row-end-5">
          {renderCarouselItems()}  
        </Slider>

        {carouselType != 'See More Link' && (
        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle absolute border-0 right-1/2 bg-base-100">
              <Icon size={24} id="ArrowPointingLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle absolute border-0 left-1/2 bg-base-100">
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
