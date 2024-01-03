import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

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
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 350;
const HEIGHT = 350;

function ProductCardGallery(
  { product, preload, itemListName, layout, platform, index }: Props,
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
  console.log(hasVariant);
  const productGroupID = isVariantOf?.productGroupID;
  console.log(productGroupID);
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  console.log(possibilities);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  console.log(variants);
  console.log('teeeeeta')

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Center"
      ? "center"
      : "left";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={'M'}
        />
      </a>
    </li>
  ));

  const colorSelector = variants.length > 1 ? ( 
    variants.map(([value, link]) => (
      <li>
        <a href={link}>
          <div
            class="w-[12.7px] h-[12.7px] flex items-center justify-center"
            title={`Cor ${value}`}
          >
            {/* Aqui eu optei por colocar um svg, e ai a parte do fill vai ser dinâmica de acordo com a informação que pegarmos na PDP */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12.7"
              height="12.7"
              viewBox="0 0 14 14"
              fill="none"
            >
              <rect x="0" y="0" width="14" height="14" fill="#FF0000" />
            </svg>
          </div>
        </a>
      </li>
    ))
  ) : null;

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    <div
      id={id}
      class={`card card-compact group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
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
        class="relative overflow-hidden h-full"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}`, backgroundColor: '#F6F6F6'}}
      >
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
          class="h-full lg:h-auto grid grid-cols-1 grid-rows-1 w-full absolute"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`p-[12%] pt-[7%] lg:p-0 mix-blend-multiply group-hover:mix-blend-normal bg-base-100 col-span-full row-span-full w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={356.71}
              height={391.945}
              class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex items-center flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="51" viewBox="0 0 50 51" fill="none">
            <ellipse cx="25" cy="25.4316" rx="25" ry="25" transform="rotate(-180 25 25.4316)" fill="white" fill-opacity="0.8"/>
            <path d="M13.6328 14.9344C12.9198 15.3707 9.9322 17.2906 9.81677 17.3846C9.50443 17.6598 9.50443 18.2841 9.81677 18.5728C10.0952 18.8279 13.7007 21.1035 13.9858 21.2042C14.4408 21.3653 14.8346 21.1841 15.0315 20.7142C15.1062 20.5396 15.113 20.4255 15.0587 20.2241C14.9772 19.922 14.8142 19.7744 13.979 19.2508C13.6395 19.036 13.3612 18.8547 13.3612 18.8413C13.3612 18.8279 18.2907 18.8144 24.3134 18.8144C32.9367 18.8211 35.2318 18.8346 35.1435 18.9017C35.0824 18.9487 34.7225 19.1769 34.3491 19.4186C33.7787 19.7811 33.6497 19.8952 33.5546 20.1167C33.2898 20.788 33.8534 21.4257 34.5392 21.2311C34.804 21.1572 38.5996 18.7473 38.8305 18.5056C39.0274 18.2975 39.0545 17.7941 38.878 17.5323C38.7897 17.3913 35.2385 15.0687 34.6886 14.7867C34.5935 14.7397 34.3966 14.7196 34.2133 14.7397C33.6429 14.8001 33.317 15.3909 33.5682 15.9078C33.6701 16.1024 33.867 16.2635 34.4713 16.6462L35.2453 17.1362H24.2931H13.334L14.0809 16.6596C14.8685 16.1561 15.0247 16.0085 15.0858 15.7198C15.1809 15.223 14.8482 14.7867 14.3321 14.7397C14.0537 14.7129 13.9519 14.7397 13.6328 14.9344Z" fill="#121212"/>
            <path d="M8.69616 22.936C8.00358 23.1575 7.44001 23.6408 7.12088 24.3121L6.94434 24.688V29.4206V34.1532L7.1752 34.5761C7.4468 35.0728 7.88136 35.4756 8.40419 35.724L8.77764 35.8985L24.123 35.9187C37.9814 35.9321 39.4956 35.9254 39.8419 35.8247C40.6227 35.6032 41.2542 35.0258 41.5326 34.2807C41.6752 33.9115 41.6752 33.831 41.6616 29.2998L41.6413 24.688L41.4579 24.3054C41.2271 23.8087 40.7314 23.3253 40.2154 23.0702L39.8079 22.8756L24.3946 22.8621C11.7788 22.8554 8.92702 22.8689 8.69616 22.936ZM39.5499 24.6545C40.0388 24.9431 40.0117 24.6746 40.0117 29.387C40.0117 34.0995 40.0388 33.831 39.5499 34.1196C39.3598 34.2337 39.2036 34.2539 38.3685 34.2539H37.3975V32.9717C37.3975 31.5419 37.3568 31.3942 36.9494 31.1995C36.6506 31.0653 36.3858 31.072 36.121 31.2331C35.7543 31.4546 35.7 31.6761 35.7 33.0456V34.2539H34.5117H33.3235V32.0655C33.3235 29.6623 33.3099 29.5616 32.9229 29.3333C32.6784 29.1924 32.2914 29.1857 32.0334 29.3199C31.6396 29.5213 31.626 29.6019 31.626 32.0386V34.2539H30.4377H29.2495L29.2427 33.059C29.2427 31.7097 29.1884 31.4815 28.8489 31.2532C28.5841 31.0787 28.3261 31.0585 27.9933 31.1928C27.5927 31.3606 27.552 31.5352 27.552 32.9784V34.2539H26.3298H25.1076V31.9782C25.1076 29.8234 25.1008 29.6958 24.9718 29.5414C24.7002 29.1924 24.0484 29.1185 23.736 29.4005C23.4305 29.669 23.4101 29.8301 23.4101 32.1058V34.2539H22.2218H21.0336V33.0053C21.0336 31.5956 20.9861 31.3875 20.5922 31.2062C20.2935 31.0653 20.0287 31.072 19.7639 31.2331C19.3768 31.468 19.3361 31.6224 19.3361 33.012V34.2539H18.1478H16.9596V32.0386C16.9596 29.6019 16.946 29.5213 16.5522 29.3199C16.301 29.1924 15.9207 29.1924 15.6763 29.3199C15.2825 29.5146 15.2621 29.6556 15.2621 32.0655V34.2539H14.0738H12.8856V33.0456C12.8856 31.6761 12.8313 31.4546 12.4646 31.2331C12.1998 31.072 11.935 31.0653 11.6362 31.1995C11.2288 31.3942 11.1881 31.5419 11.1881 32.9717V34.2539H10.2239C9.38195 34.2539 9.22578 34.2337 9.03566 34.1196C8.55357 33.831 8.57394 34.0592 8.55357 29.6891C8.53999 27.5276 8.55357 25.601 8.57394 25.4063C8.62147 25.0371 8.84554 24.6948 9.11035 24.5873C9.19183 24.5538 16.0226 24.5269 24.2928 24.5269C39.0814 24.5202 39.3394 24.5202 39.5499 24.6545Z" fill="#121212"/>
          </svg>
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Seletor de Tamanhos */}
      <div class="hidden lg:flex justify-center">
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
            <>
              {l?.hide?.skuSelector ? "" : (
                <div class="group">
                  <ul
                    class={` relative bottom-0 left-0 flex items-center gap-2 w-full overflow-auto p-[10.25px] transition-opacity duration-300 opacity-1 group-hover:opacity-100 ${
                      align === "center" ? "justify-center" : "justify-start"} `}>
                        {skuSelector}
                  </ul>
                </div>
              )}
          </>
        )}
      </div>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col pt-[15px] lg:pt-5 gap-3 lg:gap-4">
        <div class="flex h-full justify-between gap-[7px] lg:gap-0">
          {l?.hide?.productName
            ? ""
            : (
              <div class="flex flex-col gap-0 max-w-[69.3%] lg:pl-[1px]">
                {l?.hide?.productName ? "" : (
                  <h2
                    class="font-semibold text-base-content text-[15px] lg:text-[16px] leading-[130%]"
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
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </div>
                  <div class="text-black leading-[130%] text-[14px] lg:text-[15px] lg:text-end">
                    {formatPrice(price, offers?.priceCurrency)}
                  </div>
                </div>
                <div>
                  {/* SKU Selector de Cor que atualmente está puxando os tamanhos disponíveis*/}
                  {(!l?.elementsPositions?.skuSelector ||
                    l?.elementsPositions?.skuSelector === "Top") && (
                    <>
                      {l?.hide?.skuSelector ? "" : (
                        <div class="group">
                          <ul class="flex items-center gap-1 justify-start lg:justify-end">
                            {colorSelector}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
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

export default ProductCardGallery;