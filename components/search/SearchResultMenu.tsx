import type { AppContext } from "$store/apps/site.ts";
import SearchControls from "$store/islands/SearchControls.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import { getColorRelatedProducts } from "./CategoryMenu.tsx";
import { type SectionProps } from "@deco/deco";
export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  textSearch?: string;
  labelOrdenation?: string;
  labelsOfFilters?: {
    /**
     * @default Filtrar
     */
    labelFilter?: string;
    /**
     * @default Fechar
     */
    labelClose?: string;
  };
  filterColors?: Color[];
  filtersNames?: FilterName[];
  /** @description Choose if you would like to showcase the color variants in the product cards  */
  showColorVariants?: boolean;
  textFilters?: string;
  appliedFiltersText?: string;
  applyFiltersText?: string;
  removeFiltersText?: string;
}
export interface CardSEO {
  /** @title WARNING: Be careful not to configure the SEO Text on the same page where you are configuring the SEO Card */
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @format rich-text */
  text: string;
}
export interface FilterName {
  /**
   * @title Filter name
   */
  filter: string;
  /**
   * @title New filter name
   */
  label: string;
}
function SearchResult({
  page,
  textSearch,
  searchTerm,
  filterColors,
  filtersNames,
  textFilters,
  appliedFiltersText,
  applyFiltersText,
  removeFiltersText,
  url,
  labelOrdenation = "ORDENAR",
  labelsOfFilters,
}: SectionProps<typeof loader> & {
  colorVariant: {
    [productName: string]: Product[];
  };
}) {
  if (!page) {
    return <></>;
  }
  return (
    <SearchControls
      searchTerm={searchTerm}
      textSearch={textSearch}
      sortOptions={page.sortOptions}
      filtersNames={filtersNames}
      filterColors={filterColors}
      textFilters={textFilters}
      appliedFiltersText={appliedFiltersText}
      applyFiltersText={applyFiltersText}
      removeFiltersText={removeFiltersText}
      filters={page.filters}
      url={url}
      breadcrumb={page.breadcrumb}
      labelOrdenation={labelOrdenation}
      labelsOfFilters={labelsOfFilters}
    />
  );
}
export default SearchResult;
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { showColorVariants } = props;
  const term = new URLSearchParams(new URL(req.url).search).get("q");
  let colorRelated: {
    [productName: string]: Product[];
  } = {};
  if (showColorVariants) {
    try {
      colorRelated = await getColorRelatedProducts(props.page?.products, ctx);
    } catch (error) {
      console.error("Erro ao obter produtos relacionados por cor:", error);
    }
  }
  return {
    ...props,
    searchTerm: term ?? "",
    url: req.url,
    colorVariant: colorRelated || {},
  };
};
