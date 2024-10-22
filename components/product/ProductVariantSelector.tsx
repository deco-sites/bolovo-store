import { AvatarPDP } from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "$store/sdk/url.ts";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { variantAvailability } from "$store/sdk/useVariantPossiblities.ts";

function VariantSelector(
  { product, reloadInSelector, colorRelated, colors, priceIntl = false }: {
    product: Product;
    reloadInSelector: boolean;
    priceIntl?: boolean;
    colorRelated?: {
      name: string;
      url: string;
    }[];
    colors: Color[];
  },
) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const sizeAndLinks = possibilities.Tamanho || {};
  const variantsInStock = isVariantOf && variantAvailability(isVariantOf);
  const variants = variantsInStock?.map(({ size, inStock }) => ({
    size,
    inStock,
    link: sizeAndLinks[size ?? ""],
  }));
  const skuSelector = variants?.map((variant) => {
    if (reloadInSelector) {
      return (
        <li>
          <a href={variant.link}>
            <AvatarPDP
              inStock={variant.inStock}
              variant={variant.link === url
                ? "activePdp"
                : variant.link
                ? "default"
                : "disabled"}
              content={variant.size === "" ? "UN" : (variant.size ?? "")}
              priceIntl={priceIntl}
            />
          </a>
        </li>
      );
    }

    const relativeUrl = relative(url);
    const relativeLink = relative(variant.link);

    if (!variant.size || !variant.link) return;
    return (
      <li>
        <button f-partial={relativeLink} f-client-nav>
          <AvatarPDP
            inStock={variant.inStock}
            variant={relativeLink === relativeUrl
              ? "activePdp"
              : relativeLink
              ? "default"
              : "disabled"}
            content={variant.size === "" ? "UN" : (variant.size ?? "")}
            priceIntl={priceIntl}
          />
        </button>
      </li>
    );
  });

  const colorSelector = colorRelated?.length && colorRelated.length > 1
    ? (
      colorRelated.map((colorVariant, index) => {
        const selectedColor = colors.find((color) =>
          color.label.toLowerCase() === colorVariant.name.toLowerCase()
        );
        const isImg = selectedColor?.src !== undefined;
        const isSvg = selectedColor?.hex !== undefined;

        return (
          <li key={index}>
            <a href={colorVariant.url}>
              <div
                class="w-[22px] h-[22px] flex items-center justify-center border"
                title={`Cor ${colorVariant.name}`}
              >
                {isSvg
                  ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="22"
                        height="22"
                        fill={selectedColor.hex}
                      />
                    </svg>
                  )
                  : isImg
                  ? (
                    <img
                      src={selectedColor?.src}
                      alt={`Cor ${colorVariant.name}`}
                    />
                  )
                  : <span class="w-3 h-3 border"></span>}
              </div>
            </a>
          </li>
        );
      })
    )
    : null;

  return (
    <ul class="flex flex-col gap-6 lg:gap-11">
      {/* Seletor de cores */}
      <div class="group">
        <ul class="flex items-center gap-[26px] lg:gap-[24px] justify-start ">
          {colorSelector}
        </ul>
      </div>
      {/* Seletor de Tamanhos */}
      <div class="group">
        <ul
          class={` relative bottom-0 left-0 flex items-center justify-between gap-2 w-full overflow-auto transition-opacity duration-300 opacity-1 group-hover:opacity-100 `}
        >
          {skuSelector}
        </ul>
      </div>
    </ul>
  );
}

export default VariantSelector;
