import type { Product } from "apps/commerce/types.ts";
import Gallery from "$store/components/product/ProductGallery.tsx";
import type { AppContext } from "$store/apps/site.ts";
import { Color } from "../../components/search/SearchResultMenu.tsx";
import { Layout } from "deco-sites/bolovo-store/components/product/ProductCard.tsx";

export interface Props {
  /** @format html */
  title?: string;
  products: Product[] | null;
  cardsLayout?: Layout;
}

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
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
          showColorVariants={showColorVariants}
        />
      </div>
    </div>
  );
}

export default ProductGallery;
