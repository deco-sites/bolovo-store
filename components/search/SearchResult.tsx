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

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  textSearch?: string;
  notFound: PropsNotFound;
  /**
  * @title Highlights 
  */
  photoOnPLP: Section[];
}

function Result({
  page,
  textSearch,
  searchTerm,
  section,
  isMobile,
}: Omit<Props, "page"> & { page: ProductListingPage, searchTerm: string, section?: Section, isMobile: boolean }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;


  return (
    <div>
      <SearchControls
        searchTerm={searchTerm}
        textSearch={textSearch}
        sortOptions={sortOptions}
        filters={filters}
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

        <div class="flex justify-center my-4">
          <div class="join">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronLeft" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item">
              Page {pageInfo.currentPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn btn-ghost join-item"
            >
              <Icon id="ChevronRight" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
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
    </div>
  );
}

function SearchResult(props: SectionProps<ReturnType<typeof loader>>) {

  const { page, notFound, searchTerm, section, isMobile } = props;

  if (!page || page?.products.length === 0) {
    return <NotFound props={notFound} searchedLabel={searchTerm} />;
  }

  return <Result {...props} page={page} section={section} isMobile={isMobile} />;
}

export default SearchResult;

export const loader = (props: Props, req: Request) => {

  const { photoOnPLP } = { ...props }

  const section = photoOnPLP.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  const term = new URLSearchParams(new URL(req.url).search).get('q');

  const isMobile = req.headers.get("user-agent")!.includes('Mobile')

  return { ...props, searchTerm: term ?? "", section, isMobile };
};
