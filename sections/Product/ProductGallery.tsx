import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import type { Product } from "apps/commerce/types.ts";
import Gallery, { Columns } from "$store/components/product/ProductGallery.tsx";

export interface Layout {
  /** @description Number of products per line on grid */
  columns?: Columns;
}

export interface Props {
  title?: string;
  layout?: Layout;
  products: Product[] | null;
}

function ProductGallery({
  products,
  layout,
  title,
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
          layout={{ columns: layout?.columns }}
        />
      </div>
    </div>
  );
}

export default ProductGallery;
