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
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { AppContext } from "$store/apps/site.ts";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { getColorRelatedProducts } from "../search/CategoryMenu.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /** @format rich-text */
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  seeMore?: {
    text: string;
    link: string;
  };
  products: Product[] | null;
  colors: Color[];
  /** @description Choose if you would like to showcase the color variants in the product cards  */
  showColorVariants?: boolean;
  cardSEO?: {
    text?: string;
    img?: {
      src?: ImageWidget;
      alt: string;
      width?: number;
      height?: number;
    };
  };
}

export const loader = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
) => {
  const { showColorVariants } = props;
  let colorRelated: { [productName: string]: Product[] } = {};

  if (showColorVariants && props.products) {
    try {
      colorRelated = await getColorRelatedProducts(props.products, ctx);
    } catch (error) {
      console.error("Erro ao obter produtos relacionados por cor:", error);
    }
  }

  return {
    ...props,
    colorVariant: colorRelated || {},
  };
};

function ProductShelf(
  {
    products,
    title,
    layout,
    seeMore,
    colors,
    colorVariant,
    showColorVariants,
    cardSEO,
  }:
    & Props
    & { colorVariant?: { [productName: string]: Product[] } },
) {
  const id = useId();
  const platform = "vnda";

  const shouldShowArrows = ((products?.length || 0) + (seeMore ? 1 : 0)) > 4;

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full py-8 flex flex-col gap-5 px-[15px] mx-auto lg:gap-6 lg:py-10">
      <Header
        title={title || ""}
        fontSize={layout?.headerfontSize || "Normal"}
        alignment={layout?.headerAlignment || "left"}
      />

      <div
        id={id}
        class="w-full grid grid-cols-[30px_1fr_30px] lg:px-[17px]"
      >
        <Slider class="w-full carousel carousel-start gap-2 lg:gap-[15px] col-span-full row-start-2 row-end-5 h-fit">
          {cardSEO?.text
            ? (
              <Slider.Item
                index={0}
                class="carousel-item w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4"
              >
                <div class="card card-compact w-full h-full rounded-none bg-[#F6F6F6] overflow-y-auto flex items-start justify-end">
                  {cardSEO.img && cardSEO.img.src
                    ? (
                      <img
                        class="md:ml-7 ml-6 lg:mb-8 mb-4"
                        loading="lazy"
                        src={cardSEO.img.src}
                        alt={cardSEO.img.alt}
                        width={cardSEO.img.width ?? 0}
                        height={cardSEO.img.height ?? 0}
                      />
                    )
                    : null}
                  <div
                    dangerouslySetInnerHTML={{ __html: cardSEO?.text }}
                    class="text-sm leading-[16px] md:max-w-[293px] sm:h-auto h-full md:w-full font-normal text-left md:pl-7 pl-6 pr-6 md:pr-3 lg:pb-8 pb-4"
                  />
                </div>
              </Slider.Item>
            )
            : null}
          {products?.map((product, index) => (
            <Slider.Item
              index={cardSEO?.text ? index + 1 : index}
              class="carousel-item w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4"
            >
              <ProductCard
                product={product}
                itemListName={title}
                platform={platform}
                index={index}
                colorRelated={(colorVariant &&
                  colorVariant[product.name as string]) || []}
                colors={colors}
                showColorVariants={showColorVariants}
              />
            </Slider.Item>
          ))}
          {seeMore
            ? (
              <Slider.Item
                index={products.length}
                class="carousel-item w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4"
              >
                <div class="card card-compact group w-full">
                  <a
                    class="btn rounded-none h-[auto] w-full flex items-center justify-center bg-transparent lg:bg-[#F6F6F6] border border-black lg:border-none aspect-[219.38326/300] lg:aspect-[239.13935/300]"
                    href={seeMore?.link}
                  >
                    <span class="text-[#121212] px-[22px] py-1.5 block text-center text-[0.813rem] capitalize lg:uppercase lg:text-[0.938rem] leading-[130%] font-semibold lg:font-normal lg:border rounded-full lg:border-[#121212]">
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
            <div class="hidden relative lg:block z-10 col-start-1 row-start-3">
              <Slider.PrevButton class="btn btn-circle btn-ghost !bg-[transparent] absolute right-1/2">
                <Icon size={32} id="ArrowPointingLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative lg:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-ghost !bg-[transparent] absolute left-1/2">
                <Icon size={32} id="ArrowPointingRight" strokeWidth={3} />
              </Slider.NextButton>
            </div>
          </>
        )}
        <SliderJS direct infinite rootId={id} />
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
