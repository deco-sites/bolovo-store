import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  offset?: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

function ProductGallery({ products, layout, offset }: Props) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  return (
    <ul
      class={`grid ${mobile} gap-2 items-center ${desktop} lg:px-[17px] lg:gap-[15px]`}
    >
      {products?.map((product, index) => (
        <li class="h-full">
          <ProductCard
            product={product}
            preload={index === 0}
            index={offset ? offset + index : undefined}
            layout={layout?.card}
            platform={platform}
          />
        </li>
      ))}
    </ul>
  );
}

export default ProductGallery;
