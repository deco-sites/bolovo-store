import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Gallery, { Columns } from "$store/components/product/ProductGallery.tsx";

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
  title?: string;
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
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
  title,
  cardLayout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, pageInfo } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  return (
    <>
      <div class="container px-[15px] sm:py-10">
        <h1 class="font-semibold text-base leading-5 pb-[25px]">{title}</h1>
        <div class="flex-grow">
          <Gallery
            products={products}
            offset={offset}
            layout={{ card: cardLayout, columns: layout?.columns }}
          />
        </div>
      </div>
    </>
  );
}

function ProductGallery({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default ProductGallery;
