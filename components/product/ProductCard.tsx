import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { ImageObject, Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useUI } from "../../sdk/useUI.ts";
import QuickShop from "$store/islands/QuickShop.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import Slider from "deco-sites/bolovo-store/components/ui/Slider.tsx";
import SliderJS from "deco-sites/bolovo-store/islands/SliderJS.tsx";
import { useId } from "deco-sites/bolovo-store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import ColorSelector from "deco-sites/bolovo-store/components/product/ColorSelector.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    allPrices?: boolean;
    skuSelector?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
  /** @description turn off image aspect */
  /** @default false */
  aspect?: boolean;
  /** @description turn on dots */
  /** @default true */
  dots?: boolean;
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  colorRelated?: Product[];
  colors?: Color[];
  showColorVariants?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

interface DotsProps {
  images: ImageObject[];
  interval?: number;
}

function Dots({ images, interval = 0 }: DotsProps) {
  return (
    <>
      <ul class="carousel justify-center col-span-full gap-2 z-10 row-start-7 bg-transparent">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div
                class={`py-5 ${
                  ((index === 0) || (index % 4 === 0)) ? "" : "lg:hidden"
                }`}
              >
                <div
                  class="w-4 h-0.5 group-disabled:opacity-100 opacity-20 rounded-full bg-primary"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProductCard(
  {
    product,
    preload,
    itemListName,
    layout,
    platform,
    index,
    colorRelated,
    colors,
    showColorVariants,
    isMobile,
  }: Props & { isMobile?: boolean },
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const idSliders = useId();
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, listPriceIntl, price, priceIntl = 0, availability } =
    useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const { activePriceIntl } = useUI();
  const currency = activePriceIntl.value.active
    ? offers?.offers[1]?.priceCurrency || "USD"
    : offers?.priceCurrency || "BRL";
  const productPrice = activePriceIntl.value.active ? priceIntl || 0 : price;
  const productListPrice = activePriceIntl.value.active && listPriceIntl ||
    listPrice;
  const align = !layout?.basics?.contentAlignment ||
      layout?.basics?.contentAlignment === "Left"
    ? "left"
    : "center";
  const sizeAndLinks = possibilities.Tamanho || {};
  const colorVariants = [];
  const productCardImages = images?.filter((_, index) => index < 2);

  if (colorRelated && showColorVariants) {
    for (const relatedProduct of colorRelated) {
      for (const property of relatedProduct.additionalProperty || []) {
        if (property.valueReference === "TAGS") {
          try {
            const parsedValue = JSON.parse(property.value || "");
            if (parsedValue && parsedValue.type === "cor") {
              const colorVariant = {
                name: parsedValue.name as string,
                url: relatedProduct.url as string,
                image: relatedProduct.image ? relatedProduct.image[1].url as string : '',
              };
              colorVariants.push(colorVariant);
              break;
            }
          } catch (error) {
            console.error("Erro ao fazer parse do valor como JSON:", error);
          }
        }
      }
    }
  }
  const skuSelector = Object.entries(sizeAndLinks).map(([size, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={"default"}
          content={size}
        />
      </a>
    </li>
  ));

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {layout?.basics?.ctaText || "Ver produto"}
    </a>
  );
  const safeSrc = (url?: string) => url ?? "";

  return (
    <div
      id={id}
      class={`card card-compact group w-full h-full relative ${
        productPrice === 0 || availability === "https://schema.org/OutOfStock"
          ? "opacity-70"
          : ""
      } ${align === "center" ? "text-center" : "text-start"} ${
        layout?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""
      }
        ${
        layout?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class={`relative overflow-hidden ${
          layout?.aspect ? "aspect-[270/300]" : "aspect-[240/280]"
        } `}
        style={{ backgroundColor: "#F6F6F6" }}
      >
        {productPrice !== 0 &&
          (
            <QuickShop
              product={product}
              customClass={`w-full lg:group-hover:translate-y-0 lg:group-hover:bg-base-100`}
              priceIntl={activePriceIntl.value.active}
            />
          )}
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            layout?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            layout?.onMouseOver?.showFavoriteIcon
              ? "lg:hidden lg:group-hover:block"
              : "lg:hidden"
          }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>
        {/* Product Images */}
        <div
          id={idSliders}
          class="sm:hidden h-full grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
        >
          <Slider class="h-full w-full carousel carousel-center gap-6 col-span-full row-span-full">
            {productCardImages?.map((image, index) => (
              <Slider.Item index={index} class="carousel-item w-full">
                <a
                  href={url && relative(url)}
                  aria-label="view product"
                  class="h-full grid items-center grid-cols-1 grid-rows-1 w-full relative"
                >
                  <Image
                    preload={index === 0 && preload}
                    fetchPriority={index === 0 && preload ? "high" : "auto"}
                    src={safeSrc(image.url)}
                    width={177}
                    height={206}
                    class="mix-blend-multiply bg-base-100 h-full w-full"
                    alt={front.alternateName}
                    loading={index === 0 && preload ? "eager" : "lazy"}
                  />
                </a>
              </Slider.Item>
            ))}
          </Slider>
          {layout?.dots &&
            (
              <>
                <div class="absolute bottom-0 z-10 right-[42%] bg-transparent">
                  <Dots images={productCardImages ?? []} />
                </div>
                <SliderJS
                  rootId={idSliders}
                  direct
                />
              </>
            )}
        </div>

        <a
          href={url && relative(url)}
          aria-label="view product"
          class="h-full hidden sm:grid items-center grid-cols-1 grid-rows-1 w-full relative"
        >
          {!isMobile && (
            <Picture preload={preload}>
              <Source
                media="(max-width: 1023px)"
                fetchPriority={preload ? "high" : "auto"}
                src={safeSrc(front.url)}
                width={190}
                height={190}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority={preload ? "high" : "auto"}
                src={safeSrc(front.url)}
                width={317}
                height={317}
              />
              <img
                class={isMobile
                  ? "mix-blend-multiply bg-base-100 w-full"
                  : `mix-blend-multiply group-hover:mix-blend-normal bg-base-100 col-span-full row-span-full w-full ${
                    layout?.onMouseOver?.image === "Zoom image"
                      ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                      : ""
                  }`}
                src={safeSrc(front.url)}
                alt={front.alternateName}
                decoding="async"
                loading={preload ? "eager" : "lazy"}
              />
            </Picture>
          )}
          {!isMobile && (!layout?.onMouseOver?.image ||
            layout?.onMouseOver?.image === "Change image") &&
            (
              <div class="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Picture preload={preload}>
                  <Source
                    media="(max-width: 1023px)"
                    fetchPriority={"auto"}
                    src={safeSrc(back?.url ?? front.url)}
                    width={190}
                    height={190}
                  />
                  <Source
                    media="(min-width: 1024px)"
                    fetchPriority={"auto"}
                    src={safeSrc(back?.url ?? front.url)}
                    width={290}
                    height={317}
                  />
                  <img
                    class="h-full bg-base-100 col-span-full row-span-full w-full"
                    alt={back?.alternateName ?? front.alternateName}
                    src={safeSrc(back?.url ?? front.url)}
                    decoding="async"
                    loading={"lazy"}
                  />
                </Picture>
              </div>
            )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            layout?.onMouseOver?.showSkuSelector || layout?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {layout?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {layout?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col pt-[15px] lg:pt-5 gap-3 lg:gap-4">
        <div class="flex flex-col h-full lg:flex-row justify-between gap-[7px] lg:gap-0">
          {layout?.hide?.productName
            ? ""
            : (
              <div class="flex flex-col gap-0 lg:max-w-[69.3%] lg:pl-[1px]">
                {layout?.hide?.productName ? "" : (
                  <h2
                    class="font-semibold text-base-content text-[0.813rem] lg:text-[0.938rem] leading-[130%]"
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
              </div>
            )}
          {layout?.hide?.allPrices
            ? ""
            : (
              <div class="flex flex-col gap-[7px] lg:gap-1">
                <div
                  class={`flex flex-col gap-0 ${
                    layout?.basics?.oldPriceSize === "Normal"
                      ? "lg:flex-row lg:gap-2"
                      : ""
                  } ${align === "center" ? "justify-center" : "justify-start"}`}
                >
                  <div
                    class={`line-through text-base-300 text-base ${
                      layout?.basics?.oldPriceSize === "Normal"
                        ? "lg:text-basel"
                        : ""
                    }`}
                  >
                    {formatPrice(productListPrice, currency)}
                  </div>
                  <div class="text-black leading-[130%] text-[0.875rem] lg:text-end font-light">
                    {formatPrice(productPrice, currency) || "US$ 0,00"}
                  </div>
                </div>
                <div>
                  {/* Seletor de Cores */}
                  <div class="group">
                  <ColorSelector
                    colorVariants={colorVariants}
                    colors={colors}
                    showColorVariants={showColorVariants ?? false}
                  />
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* SKU Selector */}
        {layout?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {layout?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${layout?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
