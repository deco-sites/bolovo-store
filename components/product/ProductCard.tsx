import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import ColorSelector from "$store/islands/ColorSelector.tsx";
import ProductMedia from "$store/islands/ProductCardMedia.tsx";
import QuickShop from "$store/islands/QuickShop.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { signal } from "@preact/signals";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

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
    isMobile = false,
  }: Props & { isMobile: boolean },
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
  const {
    listPrice,
    salePrice,
    listPriceIntl,
    price,
    priceIntl = 0,
    availability,
  } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const { activePriceIntl } = useUI();
  const currency = activePriceIntl.value.active
    ? offers?.offers[1]?.priceCurrency || "USD"
    : offers?.priceCurrency || "BRL";
  const productPrice = activePriceIntl.value.active
    ? priceIntl || 0
    : salePrice;
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
                frontImage: relatedProduct.image
                  ? relatedProduct.image[0].url as string
                  : "",
                backImage: relatedProduct.image
                  ? relatedProduct.image[1].url as string
                  : "",
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

  const selectedColorVariant = signal<
    { name: string; url: string; front: string; back: string } | null
  >(null);

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
              customClass={`w-full lg:group-hover:translate-y-0 lg:group-hover:bg-white`}
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
        <ProductMedia
          idSliders={idSliders}
          productCardImages={productCardImages || []}
          url={url || ""}
          layout={layout}
          front={front}
          back={back}
          isMobile={isMobile}
          preload={preload}
          selectedColorVariant={selectedColorVariant}
        />
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
                  <div
                    class={`${
                      productPrice && (productListPrice ?? 0) > productPrice
                        ? "text-red-500"
                        : "text-black"
                    } leading-[130%] text-base lg:text-end font-light`}
                  >
                    {formatPrice(productPrice, currency) || "US$ 0,00"}
                  </div>
                </div>
                <div>
                  {/* Seletor de Cores */}
                  <div class="group">
                    <ColorSelector
                      isMobile={isMobile}
                      colorVariants={colorVariants}
                      colors={colors}
                      showColorVariants={showColorVariants ?? false}
                      selectedColorVariant={selectedColorVariant}
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
