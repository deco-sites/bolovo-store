import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery from "../product/ProductGallery.tsx";
import NotFound from "./NotFound.tsx";
import type { PropsNotFound } from "./NotFound.tsx"
import type { SectionProps } from "deco/types.ts";
import type { Section } from "$store/components/search/PhotoAndProducts.tsx"
import type { ImageWidget } from "apps/admin/widgets.ts";
import ButtonsPagination, { ButtonsPaginationProps } from "./ButtonsPagination.tsx";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  textSearch?: string;
  buttonPagnation?: ButtonsPaginationProps;
  notFound: PropsNotFound;
  /**
  * @title Highlights 
  */
  photoOnPLP: Section[];
  filterColors?: Color[];
  filtersNames?: FilterName[];
  textFilters?: string;
  appliedFiltersText?: string;
  applyFiltersText?: string;
  removeFiltersText?: string;
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

export interface Color {
  /**
   * @title Color name
   */
  label: string;
  /**
   * @title Color
   * @format color
   */
  hex?: string;
  /**
   * @title Image
   */
  src?: ImageWidget;
}

function Result({
  page,
  textSearch,
  searchTerm,
  section,
  isMobile,
  filterColors,
  filtersNames,
  textFilters,
  appliedFiltersText,
  applyFiltersText,
  removeFiltersText,
  url,
  buttonPagnation,
}: Omit<Props, "page"> & { page: ProductListingPage, searchTerm: string, section?: Section, isMobile: boolean, url: string}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  return (
    <div>
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
      />
      <div class="lg:px-8 px-[15px]">
        <div class="flex-grow">
          <ProductGallery
            products={products}
            offset={offset}
            photoOnPLP={section}
            page={page}
            isMobile={isMobile}
          />
        </div>
        <ButtonsPagination page={page} props={buttonPagnation} />
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </div >
  );
}

function SearchResult(props: SectionProps<ReturnType<typeof loader>>) {

  const { page, notFound, searchTerm, section, isMobile, buttonPagnation } = props;

  if (!page || page?.products.length === 0) {
    return <NotFound props={notFound} searchedLabel={searchTerm} />;
  }

  return <Result {...props} page={page} section={section} isMobile={isMobile} buttonPagnation={buttonPagnation} />;
}

export default SearchResult;

export const loader = (props: Props, req: Request) => {

  const { photoOnPLP } = { ...props }

  const section = photoOnPLP.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  const term = new URLSearchParams(new URL(req.url).search).get('q');

  const isMobile = req.headers.get("user-agent")!.includes('Mobile')

  return { ...props, searchTerm: term ?? "", section, isMobile, url: req.url};
};