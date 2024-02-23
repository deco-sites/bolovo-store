import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { useUI } from "../../sdk/useUI.ts";
import QuickShop from "$store/islands/QuickShop.tsx";
import { Color } from "$store/components/search/SearchResult.tsx";

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

const WIDTH = 239.13;
const HEIGHT = 300;

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
  }: Props,
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
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, listPriceIntl, price, priceIntl = 0, installments } =
    useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const { activePriceIntl } = useUI();

  const currency = activePriceIntl.value.active
    ? offers?.offers[1]?.priceCurrency || "USD"
    : offers?.priceCurrency ||
      "BRL";
  const productPrice = activePriceIntl.value.active ? priceIntl || 0 : price;
  const productListPrice = activePriceIntl.value.active && listPriceIntl ||
    listPrice;

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const sizeAndLinks = possibilities.Tamanho || {};

  const colorVariants = [];

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

  const colorSelector =
    colorVariants?.length && colorVariants.length > 1 && showColorVariants
      ? (
        colorVariants.map((colorVariant, index) => {
          // Encontre a cor correspondente no array de cores retornado pelo loader
          const selectedColor = colors?.find((color) =>
            color.label.toLowerCase() === colorVariant.name.toLowerCase()
          );
          if (!selectedColor) return null;

          // Verifique se a cor selecionada é um SVG ou uma imagem
          const isSvg = selectedColor.hex !== undefined;

          return (
            <li key={index}>
              <a href={colorVariant.url}>
                <div
                  className="w-[12px] h-[12px] flex items-center justify-center border"
                  title={`Cor ${colorVariant.name}`}
                >
                  {isSvg
                    ? (
                      // Se a cor for um SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <rect
                          x="0"
                          y="0"
                          width="12"
                          height="12"
                          fill={selectedColor.hex}
                        />
                      </svg>
                    )
                    : (
                      // Se a cor for uma imagem
                      <img
                        src={selectedColor.src}
                        alt={`Cor ${colorVariant.name}`}
                      />
                    )}
                </div>
              </a>
            </li>
          );
        })
      )
      : null;

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  const safeSrc = (url?: string) => url ?? "";

  return (
    <div
      id={id}
      class={`card card-compact group w-full relative ${
        productPrice === 0 && "opacity-70 pointer-events-none cursor-none"
      } ${align === "center" ? "text-center" : "text-start"} ${
        l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""
      }
        ${
        l?.onMouseOver?.card === "Move up" &&
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
        class="relative overflow-hidden aspect-[219.38326/300] lg:aspect-[239.13935/300]"
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
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
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
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="h-full grid items-center grid-cols-1 grid-rows-1 w-full relative"
        >
          <Picture preload={preload}>
            <Source
              media="(max-width: 1023px)"
              fetchPriority={preload ? "high" : "auto"}
              src={safeSrc(front.url)}
              width={263.6363}
              height={290}
            />
            <Source
              media="(min-width: 1024px)"
              fetchPriority={preload ? "high" : "auto"}
              src={safeSrc(front.url)}
              width={380}
              height={380}
            />
            <img
              className={`mix-blend-multiply group-hover:mix-blend-normal bg-base-100 col-span-full row-span-full w-full ${
                l?.onMouseOver?.image == "Zoom image"
                  ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                  : ""
              }`}
              alt={front.alternateName}
              decoding="async"
              loading={preload ? "eager" : "lazy"}
            />
          </Picture>

          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <div class="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Picture preload={preload}>
                <Source
                  media="(max-width: 1023px)"
                  fetchPriority={preload ? "high" : "auto"}
                  src={safeSrc(back?.url ?? front.url)}
                  width={219.38326}
                  height={300}
                />
                <Source
                  media="(min-width: 1024px)"
                  fetchPriority={preload ? "high" : "auto"}
                  src={safeSrc(back?.url ?? front.url)}
                  width={239.13935}
                  height={300}
                />
                <img
                  className="h-full bg-base-100 col-span-full row-span-full w-full"
                  alt={back?.alternateName ?? front.alternateName}
                  decoding="async"
                  loading={preload ? "eager" : "lazy"}
                />
              </Picture>
            </div>
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col pt-[15px] lg:pt-5 gap-3 lg:gap-4">
        <div class="flex flex-col h-full lg:flex-row justify-between gap-[7px] lg:gap-0">
          {l?.hide?.productName
            ? ""
            : (
              <div class="flex flex-col gap-0 lg:max-w-[69.3%] lg:pl-[1px]">
                {l?.hide?.productName ? "" : (
                  <h2
                    class="font-semibold text-base-content text-[13px] lg:text-[15px] leading-[130%]"
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
              </div>
            )}
          {l?.hide?.allPrices
            ? ""
            : (
              <div class="flex flex-col gap-[7px] lg:gap-1">
                <div
                  class={`flex flex-col gap-0 ${
                    l?.basics?.oldPriceSize === "Normal"
                      ? "lg:flex-row lg:gap-2"
                      : ""
                  } ${align === "center" ? "justify-center" : "justify-start"}`}
                >
                  <div
                    class={`line-through text-base-300 text-xs ${
                      l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                    }`}
                  >
                    {formatPrice(productListPrice, currency)}
                  </div>
                  <div class="text-black leading-[130%] text-[14px] lg:text-end">
                    {formatPrice(productPrice, currency) || "US$ 0,00"}
                  </div>
                </div>
                <div>
                  {/* Seletor de Cores */}
                  <div class="group">
                    <ul class="flex items-center gap-[11px] lg:gap-1 justify-start lg:justify-end">
                      {colorSelector}
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-start"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
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
