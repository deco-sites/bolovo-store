import { AppContext } from "apps/vnda/mod.ts";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import { Color } from "$store/components/search/SearchResult.tsx";

export interface Props {
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  seeMore?: {
    text: string;
    link: string;
  };
  relatedProducts?: ProductDetailsPage | null;
  colors: Color[];
  /** @description Choose if you would like to showcase the color variants in the product cards */
  showColorVariants?: boolean;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const categoryProperty = props.relatedProducts?.product
    .additionalProperty?.find((property) => property.name === "categoria");

  const category = categoryProperty?.value;

  const tag = `relacionados-${category?.toLowerCase()}`;

  console.log("TAG:", tag);

  let data: Product[] = [];

  if (!tag) {
    const allTagData = await ctx.get<Product[]>({  
      "__resolveType": "vnda/loaders/productList.ts",
      "tags": "todos",
    });

    data = allTagData ?? [];
  } else {
    data = await ctx.get<Product[]>({  
      "__resolveType": "vnda/loaders/productList.ts",
      "tags": tag,
    });
  }

  const { showColorVariants } = props;
  const colorRelated: { [productName: string]: Product[] } = {};

  if (showColorVariants) {
    for (const product of data || []) {
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
        const productList = await ctx.get<Product[]>({ 
          "__resolveType": "vnda/loaders/productList.ts",
          "typeTags": [{ key: "variante_cor", value: camisetaVariantProperty }],
        });

        if (product.name !== undefined && Array.isArray(productList)) {
          colorRelated[product.name] = productList;
        }
      }
    }
  }

  return {
    ...props,
    relatedProductsList: data ?? [],
    colorVariant: colorRelated || {}
  };
};



function ProductRelatedShelf({
  relatedProductsList,
  title,
  layout,
  seeMore,
  colors, 
  colorVariant, 
  showColorVariants
}:
  & Props
  & { relatedProductsList: Product[] }
  & { colorVariant: { [productName: string]: Product[] } }
) {
  return (
    <ProductShelf
      products={relatedProductsList}
      title={title}
      layout={layout}
      seeMore={seeMore}
      colorVariant={colorVariant}
      colors={colors}
      showColorVariants={showColorVariants}
    />
  );
}

export default ProductRelatedShelf;
