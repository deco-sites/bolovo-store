import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import PhotoAndProducts from "../../components/search/PhotoAndProducts.tsx";
export interface Props {
  /** @format html */
  title: string;
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
}

const MOBILE_DIRECTION = {
  "imagem acima": "row-start-1",
  "imagem abaixo": "row-start-3",
};

export default function PhotoGallery(
  { title, featuredPhoto, contentDirection, products }: Props,
) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="flex px-[15px] flex-col gap-6 py-8">
      <h2 class=" text-base text-left uppercase font-bold">
        <div
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </h2>
      <ul class="grid grid-cols-2 gap-2 gap-y-5 lg:gap-y-[15px] items-center lg:grid-cols-4 lg:gap-[15px]">
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
        />
      </ul>
    </div>
  );
}
