import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import type { Layout } from "../../components/product/ProductCard.tsx";
import PhotoAndProducts, {
  GRID_SPAN,
  VARIANT_IMAGE_HEIGHT,
  VARIANT_IMAGE_WIDTH,
} from "../../components/search/PhotoAndProducts.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  /** @format rich-text */
  title?: string;
  featuredPhoto: {
    /**
     * @title Preload image
     * @default false
     */
    preload?: boolean;
    src: ImageWidget;
    alt: string;
    href: string;
  };
  /**
   * @title reversed order?
   */
  contentDirection: {
    /** @default "imagem acima" */
    mobile?: "imagem acima" | "imagem abaixo";
    /** @default "imagem na direita" */
    desktop?: "imagem na direita" | "imagem na esquerda";
  };
  products: Product[] | null;
  productCardLayout?: Layout;
}

const MOBILE_DIRECTION = {
  "imagem acima": "row-start-1",
  "imagem abaixo": "row-start-3",
};

export function LoadingFallback(
  {
    title,
    featuredPhoto: { preload: preLoad, src, alt, href },
    contentDirection,
  }: Props,
) {
  const customClassImage = `${
    MOBILE_DIRECTION[contentDirection.mobile ?? "imagem acima"]
  } lg:row-start-1`;

  const variant = "2x2";

  return (
    <div class="flex px-[15px] flex-col gap-6 py-8">
      {title && (
        <h2 class=" text-base text-left uppercase font-bold">
          <div
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </h2>
      )}
      <ul class="grid grid-cols-2 gap-2 items-center lg:grid-cols-4 lg:gap-[15px]">
        <li
          class={`${
            GRID_SPAN[`${variant} ${contentDirection.desktop}`]
          } ${customClassImage} h-full`}
          style={{ gridRowStart: 0 }}
        >
          <a href={href} class="w-full h-full cursor-pointer">
            <div class="w-full relative">
              <Picture preload={preLoad}>
                <Source
                  media="(max-width: 1023px)"
                  fetchPriority={preLoad ? "high" : "auto"}
                  src={src}
                  width={384}
                  height={524}
                />
                <Source
                  media="(min-width: 1024px)"
                  fetchPriority={preLoad ? "high" : "auto"}
                  src={src}
                  width={VARIANT_IMAGE_WIDTH[variant]}
                  height={VARIANT_IMAGE_HEIGHT[variant]}
                />
                <img
                  class="w-full max-h-[900px] 3xl:max-h-full"
                  src={src}
                  alt={alt}
                  loading={preLoad ? "eager" : "lazy"}
                />
              </Picture>
            </div>
          </a>
        </li>
        {Array(4).fill(0).map(() => (
          <li class="flex flex-col gap-4 h-full">
            <div class="skeleton aspect-[240/280]" />
            <div class="flex justify-between items-center gap-2">
              <div class="skeleton w-[150px] h-4" />
              <div class="skeleton w-14 h-4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PhotoGallery(
  {
    title,
    featuredPhoto,
    contentDirection,
    products,
    productCardLayout,
  }: Props,
) {
  if (!products || products.length === 0) {
    return <></>;
  }

  return (
    <div class="flex px-[15px] flex-col gap-6 py-8">
      {title && (
        <h2 class=" text-base text-left uppercase font-bold">
          <div
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </h2>
      )}
      <ul class="grid grid-cols-2 gap-2 items-center lg:grid-cols-4 lg:gap-[15px]">
        <PhotoAndProducts
          src={featuredPhoto.src}
          alt={featuredPhoto.alt}
          href={featuredPhoto.href}
          layoutDesktop={contentDirection.desktop}
          products={products}
          preLoad={featuredPhoto.preload}
          customClassImage={`${
            MOBILE_DIRECTION[contentDirection.mobile ?? "imagem acima"]
          } lg:row-start-1`}
          productCardLayout={productCardLayout}
        />
      </ul>
    </div>
  );
}
