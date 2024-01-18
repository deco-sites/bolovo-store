import { AppContext } from "apps/vnda/mod.ts";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import ProductShelf from "$store/components/product/ProductShelf.tsx"

export interface Props {
  title?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  seeMore?: { 
    text: string; 
    link: string 
  };
  relatedProducts?: ProductDetailsPage | null;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {

  const additionalProperties = props.relatedProducts?.product.additionalProperty;

  const categoryProperty = additionalProperties?.find(property => property.name === "categoria");

  const category = categoryProperty?.value;

  const tag = `relacionados-${category?.toLowerCase()}`;

  if (!tag) {
    const allTagData = await ctx.get({
      "__resolveType": "vnda/loaders/productList.ts",
      "tags": "todos",
    });

    return {
      ...props,
      relatedProductsList: allTagData ?? [],
    };
  }

  const data = await ctx.get({
    "__resolveType": "vnda/loaders/productList.ts",
    "tags": tag,
  });

  return {
    ...props,
    relatedProductsList: data ?? [],
  };
};

function ProductRelatedShelf({
  relatedProductsList, 
  title,
  layout,
  seeMore
}: Props & 
{relatedProductsList: Product[]}) 
{

  return (
    <ProductShelf
        products={relatedProductsList}
        title={title}
        layout={layout}
        seeMore={seeMore}
      />
  );
}

export default ProductRelatedShelf;