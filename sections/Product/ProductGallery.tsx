import type { Product } from "apps/commerce/types.ts";
import Gallery from "$store/components/product/ProductGallery.tsx";
import type { AppContext } from "$store/apps/site.ts";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { Layout } from "deco-sites/bolovo-store/components/product/ProductCard.tsx";

export interface Props {
  /** @format rich-text */
  title?: string;
  products: Product[] | null;
  cardsLayout?: Layout;
}

export function LoadingFallback({ title }: Props) {
  return (
    <div class="px-[15px] sm:py-6">
      {title && (
        <h2 class="font-semibold text-base leading-5 pb-[15px] lg:pb-[25px]">
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </h2>
      )}

      <div class="grid grid-cols-2 gap-2 items-center lg:grid-cols-4 lg:px-[17px] lg:gap-[15px]">
        {Array(10).fill(0).map(() => (
          <div class="flex flex-col gap-4">
            <div class="skeleton aspect-[240/280]" />

            <div class="flex justify-between items-center">
              <div class="skeleton w-[150px] h-4" />
              <div class="skeleton w-14 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  const colorRelated: { [productName: string]: Product[] } = {};

  for (const product of props.products || []) {
    let camisetaVariantProperty;

    for (const property of product.additionalProperty || []) {
      if (property.valueReference === "TAGS") {
        try {
          const data = JSON.parse(property.value || "");

          if (data.type === "variante_cor") {
            camisetaVariantProperty = data.name;
            break;
          }
        } catch (error) {
          console.error("Erro ao fazer parse do valor como JSON:", error);
        }
      }
    }

    if (camisetaVariantProperty) {
      const productList = await ctx.get({
        "__resolveType": "vnda/loaders/productList.ts",
        "typeTags": [{ key: "variante_cor", value: camisetaVariantProperty }],
      });
      if (product.name !== undefined && Array.isArray(productList)) {
        colorRelated[product.name] = productList;
      }
    }
  }

  return {
    ...props,
    colorVariant: colorRelated || {},
  };
};

function ProductGallery({
  products,
  title,
  colorVariant,
  filterColors,
  cardsLayout,
  showColorVariants = true,
  cardLayout,
}:
  & Props
  & { colorVariant: { [productName: string]: Product[] } }
  & { filterColors?: Color[] }
  & { showColorVariants?: boolean }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="px-[15px] sm:py-10">
      <h2 class="font-semibold text-base leading-5 pb-[15px] lg:pb-[25px]">
        <div
          dangerouslySetInnerHTML={{ __html: title ?? "" }}
        />
      </h2>
      <div class="flex-grow">
        <Gallery
          products={products}
          cardsLayout={cardsLayout}
          colorVariant={colorVariant || []}
          colors={filterColors}
          cardLayout={cardLayout}
          showColorVariants={showColorVariants}
        />
      </div>
    </div>
  );
}

export default ProductGallery;
