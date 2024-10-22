import type { AppContext } from "$store/apps/site.ts";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { getColorRelatedProducts } from "../search/CategoryMenu.tsx";

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

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const categoryProperty = props.relatedProducts?.product
    .additionalProperty?.find((property) => property.name === "categoria");

  const category = categoryProperty?.value;

  const tag = `relacionados-${category?.toLowerCase()}`;

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
  let colorRelated: { [productName: string]: Product[] } = {};

  if (showColorVariants) {
    try {
      colorRelated = await getColorRelatedProducts(data);
    } catch (error) {
      console.error("Related - Erro ao obter produtos relacionados por cor:", error);
    }
  }

  return {
    ...props,
    relatedProductsList: data ?? [],
    colorVariant: colorRelated || {},
  };
};

function ProductRelatedShelf({
  relatedProductsList,
  title,
  layout,
  seeMore,
  colors,
  colorVariant,
  showColorVariants,
}:
  & Props
  & { relatedProductsList: Product[] }
  & { colorVariant: { [productName: string]: Product[] } }) {
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
