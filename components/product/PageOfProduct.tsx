import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import PDPGallerySlider from "../../components/product/Gallery/PDPImageSlider.tsx";
import PDPProductInfo from "../../components/product/PDPProductInfo.tsx";
import { Color, FilterName } from "$store/components/search/SearchResult.tsx";
import { AppContext } from "apps/vnda/mod.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  reloadInSelector?: boolean;
  /** @title Color Configuration */
  filterColors?: Color[];
  filtersNames?: FilterName[];
}

export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  const additionalProperties = props.page?.product.additionalProperty;

  // Procurar pela type_tag desejada
  const typeTagProperty = additionalProperties?.find((property) =>
    property["@type"] === "PropertyValue" && property.name === "variante_cor"
  );

//   console.log("typetagvalueeeeeProoooo", typeTagProperty);

  const typeTagValue = typeTagProperty?.value;

  console.log("typetagvalueeeee", typeTagValue);

  if (!typeTagValue) {
    return {
      ...props,
      colorRelated: null, // Não há type_tag definida, retornar null
    };
  }

  // Fazer a chamada para buscar os produtos com base na type_tag específica
  const data = await ctx.get({
    "__resolveType": "vnda/loaders/productList.ts",
    "typeTags": [{ key: "variante_cor", value: typeTagValue }],
  });

console.log("variantes encontradas:", data)

  return {
    ...props,
    colorRelated: data ?? [],
  };
};

function PageOfProduct({ page, reloadInSelector = false, filterColors, filtersNames, colorRelated }: Props & { colorRelated: Product[] }
  ) {

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

console.log("variantes encontradas:", colorRelated.length)

  return (
    <div class="pt-0 lg:py-11 lg:px-[8%] flex justify-center flex-col lg:flex-row md:gap-12 lg:gap-[6%] py-11">
      <div class="w-full lg:w-3/5">
        <PDPGallerySlider page={page} />
      </div>
      <div class="w-full lg:w-2/5 lg:max-w-[400px]">
        <PDPProductInfo
          page={page}
          reloadInSelector={reloadInSelector}
          filterColors={filterColors}
          filtersNames={filtersNames}
          colorRelated={colorRelated}
        />
      </div>
    </div>
  );
}

export default PageOfProduct;
