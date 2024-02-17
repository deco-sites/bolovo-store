import { AvatarPDP } from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "$store/sdk/url.ts";
import { Color } from "$store/components/search/SearchResult.tsx";



function VariantSelector(
  { product, reloadInSelector, colorRelated, colors, priceIntl = false }: {
    product: Product;
    reloadInSelector: boolean;
    priceIntl?: boolean;
    colorRelated?: {
      name: string;
      url: string;
    }[]
    colors: Color[];
  },
) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const sizeAndLinks = possibilities.Tamanho || {};
  
  const skuSelector = Object.entries(sizeAndLinks).map(([size, link]) => {
    if (reloadInSelector) {
      return (
        <li>
          <a href={link}>
            <AvatarPDP
              variant={link === url
                ? "activePdp"
                : link
                ? "default"
                : "disabled"}
              content={size === "" ? "UN" : size}
              priceIntl={priceIntl}
            />
          </a>
        </li>
      );
    }

    const relativeUrl = relative(url);
    const relativeLink = relative(link);

    return (
      <li>
        <button f-partial={relativeLink} f-client-nav>
          <AvatarPDP
            variant={relativeLink === relativeUrl
              ? "activePdp"
              : relativeLink
              ? "default"
              : "disabled"}
            content={size === "" ? "UN" : size}
            priceIntl={priceIntl}
          />
        </button>
      </li>
    );
  });


  const colorSelector = colorRelated?.length && colorRelated.length > 1
  ? (
    colorRelated.map((colorVariant, index) => {
      // Encontre a cor correspondente no array de cores retornado pelo loader
      const selectedColor = colors.find(color => color.label.toLowerCase() === colorVariant.name.toLowerCase());
      if (!selectedColor) return null;

      // Verifique se a cor selecionada é um SVG ou uma imagem
      const isSvg = selectedColor.hex !== undefined;

      return (
        <li key={index}>
          <a href={colorVariant.url}>
            <div
              className="w-[22px] h-[22px] flex items-center justify-center border"
              title={`Cor ${colorVariant.name}`}
            >
              {isSvg ? (
                // Se a cor for um SVG
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <rect x="0" y="0" width="22" height="22" fill={selectedColor.hex} />
                </svg>
              ) : (
                // Se a cor for uma imagem
                <img src={selectedColor.src} alt={`Cor ${colorVariant.name}`} />
              )}
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
