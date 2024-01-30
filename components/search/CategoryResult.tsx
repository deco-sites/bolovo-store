import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import GalleryControls from "$store/islands/GalleryControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import type { SectionProps } from "deco/types.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  list?: Array<{
    label?: string;
    href?: string;
  }>;
  cardLayout?: CardLayout;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  list,
  currentCategory
}: Omit<Props, "page"> & { page: ProductListingPage, list?: Array<{ label?: string; href?: string }>, currentCategory?: string }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  return (
    <div>
      <GalleryControls
        currentCategory={currentCategory}
        list={list}
        sortOptions={sortOptions}
        filters={filters}
        breadcrumb={breadcrumb}
        displayFilter={layout?.variant === "drawer"}
      />
      <div class="lg:px-8 px-[15px]">
        <div class="flex-grow">
          <ProductGallery
            products={products}
            offset={offset}
            layout={{ card: cardLayout, columns: layout?.columns }}
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

function CategoryResult(
  { page, ...props }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default CategoryResult;

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);
  const segments = url.pathname.split('/').filter(Boolean);

  const lastSegment = segments[segments.length - 1];

  console.log(lastSegment);

  return { ...props, currentCategory: lastSegment || "" };
};