import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import { PhotoAndProducts, Section } from "$store/components/search/PhotoAndProducts.tsx"
import type { ProductListingPage } from "apps/commerce/types.ts";


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
  photoOnPLP?: Section;
  page: ProductListingPage | null;
  isMobile: boolean;
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

const MOBILE_COLUMN_SPAN = {
  1: "col-span-1",
  2: "col-span-2",
};

const DESKTOP_COLUMN_SPAN = {
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
};

interface OrderType {
  [key: number]: string;
}

const ORDER: OrderType = {
  0: "order-[0]",
  1: "order-[1]",
  2: "order-[2]",
  3: "order-[3]",
  4: "order-[4]",
  5: "order-[5]",
  6: "order-[6]",
  7: "order-[7]",
  8: "order-[8]",
  9: "order-[9]",
  10: "order-[10]",
  11: "order-[11]",
  12: "order-[12]",
  13: "order-[13]",
  14: "order-[14]",
  15: "order-[15]",
  16: "order-[16]",
  17: "order-[17]",
  18: "order-[18]",
  19: "order-[19]",
  20: "order-[20]",
  21: "order-[21]",
  22: "order-[22]",
  23: "order-[23]",
  24: "order-[24]",
  25: "order-[25]",
};

const ORDER_DESKTOP: OrderType = {
  0: "lg:order-[0]",
  1: "lg:order-[1]",
  2: "lg:order-[2]",
  3: "lg:order-[3]",
  4: "lg:order-[4]",
  5: "lg:order-[5]",
  6: "lg:order-[6]",
  7: "lg:order-[7]",
  8: "lg:order-[8]",
  9: "lg:order-[9]",
  10: "lg:order-[10]",
  11: "lg:order-[11]",
  12: "lg:order-[12]",
  13: "lg:order-[13]",
  14: "lg:order-[14]",
  15: "lg:order-[15]",
  16: "lg:order-[16]",
  17: "lg:order-[17]",
  18: "lg:order-[18]",
  19: "lg:order-[19]",
  20: "lg:order-[20]",
  21: "lg:order-[21]",
  22: "lg:order-[22]",
  23: "lg:order-[23]",
  24: "lg:order-[24]",
  25: "lg:order-[25]",
};

const GRID_ROW_START = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
}

function ProductGallery({ products, layout, offset, photoOnPLP, page, isMobile }: Props) {
  const platform = usePlatform();
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  const row: number = photoOnPLP?.line ?? 0;
  const line = row === 1 ? 0 : isMobile ? (row - 1) * 2 : (row - 1) * 4;

  return (
    <ul class={`grid ${mobile} gap-2 items-center ${desktop} lg:px-[17px] lg:gap-[15px] col-`}>
      {products?.map((product, index) => (

        photoOnPLP && page?.pageInfo.currentPage === photoOnPLP.page && index === line ?
          <PhotoAndProducts
            variant={photoOnPLP.imageAndProducts.variant}
            src={photoOnPLP.imageAndProducts.src}
            alt={photoOnPLP.imageAndProducts.alt}
            href={photoOnPLP.imageAndProducts.href}
            contentDirection={photoOnPLP.imageAndProducts.contentDirection}
            products={photoOnPLP.imageAndProducts.products}
            title={photoOnPLP.imageAndProducts.title}
            paragraph={photoOnPLP.imageAndProducts.paragraph}
            customClassImage={`mx-[-15px] lg:mx-0 h-full`}
            row={row}
            customClassProducts={`${mobile} px-[15px]`} />
          :
          <li class={`h-full`}>
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
