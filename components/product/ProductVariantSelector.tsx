import { AvatarPDP } from "$store/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "$store/sdk/url.ts";

function VariantSelector({ product, reloadInSelector }: { product: Product, reloadInSelector: boolean }) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const sizeAndLinks = possibilities.Tamanho || {};

  const skuSelector = Object.entries(sizeAndLinks).map(([size, link]) => {

    if (reloadInSelector) {
      return (
        <li>
          <a href={link}>
            <AvatarPDP
              variant={link === url ? "activePdp" : link ? "default" : "disabled"}
              content={size === '' ? "UN" : size}
            />
          </a>
        </li>
      )
    }

    const relativeUrl = relative(url);
    const relativeLink = relative(link);

    return (

      <li>
        <button f-partial={relativeLink} f-client-nav>
          <AvatarPDP
            variant={relativeLink === relativeUrl ? "activePdp" : relativeLink ? "default" : "disabled"}
            content={size === '' ? "UN" : size}
          />
        </button>
      </li>
    )
  })

  const colorSelector = variants.length > 1 ? (
    variants.map(([value, link]) => (
      <li>
        <a href={link}>
          <div
            class="w-[22px] h-[22px] flex items-center justify-center"
            title={`Cor ${value}`}
          >
            {/* Aqui eu optei por colocar um svg, e ai a parte do fill vai ser dinâmica de acordo com a informação que pegarmos na PDP */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <rect x="0" y="0" width="22" height="22" fill="#FF0000" />
            </svg>
          </div>
        </a>
      </li>
    ))
  ) : null;


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
