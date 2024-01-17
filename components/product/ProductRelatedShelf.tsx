import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import { AppContext } from "apps/vnda/mod.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  seeMore?: { 
    text: string; 
    link: string 
  };
  relatedProducts?: ProductDetailsPage | null;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {

  const additionalProperties = props.relatedProducts?.product.additionalProperty;

  const categoryProperty = additionalProperties?.find(property => property.name === "categoria");

  const category = categoryProperty?.value;

  const tag = `relacionados-${category?.toLowerCase()}`;

  if (!tag) {
    const allTagData = await ctx.get({
      "__resolveType": "vnda/loaders/productList.ts",
      "tags": "todos",
    });

    return {
      ...props,
      relatedProductsList: allTagData ?? [],
    };
  }

  const data = await ctx.get({
    "__resolveType": "vnda/loaders/productList.ts",
    "tags": tag,
  });

  return {
    ...props,
    relatedProductsList: data ?? [],
  };
};

function ProductRelatedShelf({
  relatedProductsList, 
  title,
  layout,
  seeMore
}: Props & 
{relatedProductsList: Product[]}) 
{
  const id = useId();
  const platform = usePlatform();

  const shouldShowArrows = ((relatedProductsList?.length || 0) + (seeMore ? 1 : 0)) > 4;

  if (!relatedProductsList) {
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
        <Slider class="w-full carousel carousel-start gap-2 lg:gap-[15px] col-span-full row-start-2 row-end-5">
          {relatedProductsList?.map((product: Product, index: number) => (
            <Slider.Item
              key={product.productID}
              index={index}
              class="carousel-item w-[38.605vw] lg:w-[calc((100%-46px)/4)] sm:first:pl-0 sm:last:pr-0"
            >
              <ProductCard
                product={product}
                itemListName={title}
                platform={platform}
                index={index}
              />
            </Slider.Item>
          ))}
          {seeMore
            ? (
              <Slider.Item
                index={relatedProductsList?.length}
                class="carousel-item w-[38.605vw] lg:w-[calc((100%-46px)/4)] sm:first:pl-0 sm:last:pr-0"
              >
                <div className="card card-compact group w-full">
                  <a
                    class="btn rounded-none h-[auto] w-full flex items-center justify-center bg-transparent lg:bg-[#F6F6F6] border border-black lg:border-none aspect-[219.38326/300] lg:aspect-[239.13935/300]"
                    href={seeMore?.link}
                  >
                    <span className="text-[#121212] px-[22px] py-1.5 block text-center text-[13px] capitalize lg:uppercase lg:text-[15px] leading-[130%] font-semibold lg:font-normal lg:border rounded-full lg:border-[#121212]">
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
                <Icon size={24} id="ArrowPointingLeft" strokeWidth={3} />
              </Slider.PrevButton>
            </div>
            <div class="hidden relative lg:block z-10 col-start-3 row-start-3">
              <Slider.NextButton class="btn btn-circle btn-ghost !bg-[transparent] absolute left-1/2">
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
              items: relatedProductsList?.map((product: Product) =>
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

export default ProductRelatedShelf;