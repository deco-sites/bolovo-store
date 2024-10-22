import ProductCard, { Layout } from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product } from "apps/commerce/types.ts";
import PhotoAndProducts, {
  Section,
} from "$store/components/search/PhotoAndProducts.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { CardSEO } from "../search/SearchResultMenu.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";

export interface Props {
  products: Product[] | null;
  offset?: number;
  photoOnPLP?: Section;
  page?: ProductListingPage | null;
  isMobile?: boolean;
  cardSEO?: CardSEO;
  cardsLayout?: Layout;
}

function ProductGallery(
  {
    products,
    offset,
    photoOnPLP,
    page,
    isMobile,
    cardSEO,
    colorVariant,
    colors,
    showColorVariants,
    hasBanner,
    cardsLayout,
  }:
    & Props
    & { colorVariant?: { [productName: string]: Product[] } }
    & { colors?: Color[] }
    & { showColorVariants?: boolean }
    & { hasBanner?: boolean },
) {
  const platform = usePlatform();
  const row: number = photoOnPLP?.line ?? 0;
  const line = row === 1 ? 0 : isMobile ? (row - 1) * 2 : (row - 1) * 4;

  return (
    <ul class="grid grid-cols-2 gap-2 items-center lg:grid-cols-4 lg:px-[17px] lg:gap-[15px]">
      {products?.map((product, index) => (
        cardSEO && index === 0
          ? (
            <div class="card card-compact w-full h-full rounded-none bg-[#F6F6F6] overflow-y-auto">
              <div
                dangerouslySetInnerHTML={{ __html: cardSEO.text }}
                class="text-sm leading-[16px] md:max-w-[293px] sm:h-auto h-full md:w-full font-normal text-left md:pl-7 pl-6 pr-6 md:pr-3 lg:pb-8 pb-4 absolute bottom-0"
              />
            </div>
          )
          : photoOnPLP && page?.pageInfo.currentPage === photoOnPLP.page &&
              index === line
          ? (
            <>
              <PhotoAndProducts
                variant={photoOnPLP.imageAndProducts.variant}
                src={photoOnPLP.imageAndProducts.src}
                alt={photoOnPLP.imageAndProducts.alt}
                href={photoOnPLP.imageAndProducts.href}
                preLoad={line === 0}
                layoutDesktop={photoOnPLP.imageAndProducts.layoutDesktop}
                products={photoOnPLP.imageAndProducts.products}
                title={photoOnPLP.imageAndProducts.title}
                paragraph={photoOnPLP.imageAndProducts.paragraph}
                customClassImage={`mx-[-15px] lg:mx-0 h-full py-4 lg:py-0`}
                row={row}
                productCardLayout={photoOnPLP.imageAndProducts
                  .productCardLayout}
              />
              <li class="h-full">
                <ProductCard
                  product={product}
                  layout={cardsLayout}
                  preload={false}
                  index={offset ? offset + index : undefined}
                  platform={platform}
                  isMobile={isMobile}
                  colorRelated={colorVariant
                    ? colorVariant[product.name as string] || []
                    : []}
                  colors={colors}
                  showColorVariants={showColorVariants}
                />
              </li>
            </>
          )
          : (
            <li class="h-full">
              <ProductCard
                product={product}
                preload={hasBanner
                  ? false
                  : cardSEO && index <= 3
                  ? true
                  : index <= 4}
                layout={cardsLayout}
                index={offset ? offset + index : undefined}
                platform={platform}
                isMobile={isMobile}
                colorRelated={colorVariant
                  ? colorVariant[product.name as string] || []
                  : []}
                colors={colors}
                showColorVariants={showColorVariants}
              />
            </li>
          )
      ))}
    </ul>
  );
}

export default ProductGallery;
