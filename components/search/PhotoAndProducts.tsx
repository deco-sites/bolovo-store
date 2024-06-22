import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import ProductCard, { Layout } from "../../components/product/ProductCard.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface ImageAndProducts {
  variant: "1x1" | "2x2" | "2x1";
  /**
   * @title Preload image
   * @default false
   */
  preLoad?: boolean;
  src: ImageWidget;
  alt: string;
  href?: string;
  /**
   * @title position Image?
   */
  /** @default "imagem na direita" */
  layoutDesktop?: "imagem na direita" | "imagem na esquerda";

  /** @format html */
  title?: string;
  /** @format html */
  paragraph?: string;
  products: Product[] | null;
  productCardLayout?: Layout;
}

/**
 * @titleBy matcher
 */
export interface Section {
  matcher: string;
  line: number;
  page: number;
  imageAndProducts: ImageAndProducts;
}

const VARIANT_IMAGE_WIDTH = {
  "1x1": 280,
  "2x1": 431,
  "2x2": 728,
};
const VARIANT_IMAGE_HEIGHT = {
  "1x1": 350,
  "2x1": 292,
  "2x2": 930,
};

const GRID_SPAN: {
  [key: string]: string;
} = {
  "1x1 imagem na esquerda": "col-span-2 lg:col-span-1",
  "2x1 imagem na esquerda": "col-span-2",
  "2x2 imagem na esquerda": "col-span-2 lg:row-span-2",
  "1x1 imagem na direita": "lg:col-start-4 lg:col-end-5 col-span-2 ",
  "2x1 imagem na direita": "lg:col-start-3 col-span-2",
  "2x2 imagem na direita": "lg:col-start-3 col-span-2 row-span-2",
};

export default function PhotoAndProducts(
  {
    variant = "2x2",
    title = "",
    paragraph = "",
    src,
    alt,
    href = "",
    row,
    layoutDesktop = "imagem na direita",
    preLoad = false,
    products,
    customClassImage,
    productCardLayout,
  }: {
    variant?: "1x1" | "2x1" | "2x2";
    src: ImageWidget;
    alt: string;
    href?: string;
    layoutDesktop?: "imagem na direita" | "imagem na esquerda";
    preLoad?: boolean;
    products: Product[] | null;
    /** @format html */
    title?: string;
    /** @format html */
    paragraph?: string;
    row?: number;
    customClassImage?: string;
    productCardLayout?: Layout;
  },
) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <>
      <li
        class={`${
          GRID_SPAN[variant + " " + layoutDesktop]
        } ${customClassImage} h-full`}
        style={{ gridRowStart: row?.toString() }}
      >
        <a href={href} class="w-full h-full cursor-pointer">
          <div class="w-full relative">
            <Picture preload={preLoad}>
              <Source
                media="(max-width: 1023px)"
                fetchPriority={preLoad ? "high" : "low"}
                src={src}
                width={384}
                height={524}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority={preLoad ? "high" : "low"}
                src={src}
                width={VARIANT_IMAGE_WIDTH[variant]}
                height={VARIANT_IMAGE_HEIGHT[variant]}
              />
              <img
                class="w-full max-h-[900px] 3xl:max-h-full"
                src={src}
                alt={alt}
                decoding="async"
                loading={preLoad ? "eager" : "lazy"}
              />
            </Picture>
            {(title || paragraph) && (
              <div class="absolute left-0 top-0 w-full h-full p-4 flex flex-col justify-end items-start bg-gradient-to-t from-[#00000040] to-transparent gap-3">
                {title && (
                  <span
                    class=" text-[0.938rem]xl font-medium font-eb-garamond"
                    dangerouslySetInnerHTML={{ __html: title }}
                  >
                  </span>
                )}
                {paragraph && (
                  <span
                    class=" text-sm "
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  >
                  </span>
                )}
              </div>
            )}
          </div>
        </a>
      </li>
      {products.map((product) => (
        <li class="h-full">
          <ProductCard
            layout={productCardLayout}
            product={product}
          />
        </li>
      ))}
    </>
  );
}
