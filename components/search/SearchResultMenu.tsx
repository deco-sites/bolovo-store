import SearchControls from "$store/islands/SearchControls.tsx";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import type { Section } from "$store/components/search/PhotoAndProducts.tsx";
import { useUI } from "../../sdk/useUI.ts";
import type { AppContext } from "$store/apps/site.ts";
import { getColorRelatedProducts } from "./CategoryMenu.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";

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

export function Result({
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
}:
  & Omit<Props, "page">
  & {
    page: ProductListingPage;
    searchTerm: string;
    section?: Section;
    isMobile: boolean;
    url: string;
    card?: CardSEO;
  }
  & { colorVariant: { [productName: string]: Product[] } }
  & { hasBanner?: boolean }) {
  const { filters, breadcrumb, sortOptions } = page;
  const { activePriceIntl } = useUI();

  return (
    <>
      <SearchControls
        searchTerm={searchTerm}
        textSearch={textSearch}
        sortOptions={sortOptions}
        filtersNames={filtersNames}
        filterColors={filterColors}
        textFilters={textFilters}
        appliedFiltersText={appliedFiltersText}
        applyFiltersText={applyFiltersText}
        removeFiltersText={removeFiltersText}
        filters={filters}
        url={url}
        breadcrumb={breadcrumb}
        priceIntl={activePriceIntl.value.active}
        labelOrdenation={labelOrdenation}
        labelsOfFilters={labelsOfFilters}
      />
    </>
  );
}

function SearchResult(
  props: SectionProps<ReturnType<typeof loader>> & {
    colorVariant: { [productName: string]: Product[] };
  },
) {
  return (
    <Result
      {...props}
    />
  );
}

export default SearchResult;

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { showColorVariants } = props;
  const term = new URLSearchParams(new URL(req.url).search).get("q");
  let colorRelated: { [productName: string]: Product[] } = {};

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
