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
            layoutDesktop={photoOnPLP.imageAndProducts.layoutDesktop}
            products={photoOnPLP.imageAndProducts.products}
            title={photoOnPLP.imageAndProducts.title}
            paragraph={photoOnPLP.imageAndProducts.paragraph}
            customClassImage={`mx-[-15px] lg:mx-0 h-full py-4 lg:py-0`}
            row={row} />
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
