import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import type { Product } from "apps/commerce/types.ts";
import Gallery, { Columns } from "$store/components/product/ProductGallery.tsx";

export interface Layout {
  /** @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products */
  variant?: "aside" | "drawer";
  /** @description Number of products per line on grid */
  columns?: Columns;
}

export interface Props {
  title?: string;
  products: Product[] | null;
  layout?: Layout;
  cardLayout?: CardLayout;
}

function ProductGallery({
  products,
  layout,
  title,
  cardLayout,
}: Props) {
  
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="px-[15px] sm:py-10">
      <h2 class="font-semibold text-base leading-5 pb-[15px] lg:pb-[25px]">{title}</h2>
      <div class="flex-grow">
        <Gallery
          products={products}
          layout={{ card: cardLayout, columns: layout?.columns }}
        />
      </div>
    </div>
  );
}

export default ProductGallery;
