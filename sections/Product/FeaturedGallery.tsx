import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCardGallery from "../../components/content/ProductCardGallery.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  /** @format html */
  title: string;
  featuredPhoto: {
    src: ImageWidget;
    alt: string;
    href: string;
    preload?: boolean;
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
  product: Product[] | null;
}

const MOBILE_DIRECTION = {
  "imagem acima": "flex-col",
  "imagem abaixo": "flex-col-reverse",
};

const DESKTOP_DIRECTION = {
  "imagem na direita": "lg:flex-row-reverse",
  "imagem na esquerda": "lg:flex-row",
};

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}

export default function FeaturedGallery(
  { title, featuredPhoto, contentDirection, product }: Props,
) {
  if (!product || product.length === 0) {
    return null;
  }

  return (
    <div class="flex px-[15px] flex-col gap-6 py-8">
      <h2 class=" text-base text-left uppercase font-bold">
        <div
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </h2>
      <div
        class={`flex gap-2 lg:gap-[15px]  
                ${
          MOBILE_DIRECTION[contentDirection?.mobile ?? "imagem acima"]
        } ${
          DESKTOP_DIRECTION[contentDirection?.desktop ?? "imagem na direita"]
        } `}
      >
        <a
          href={featuredPhoto.href}
          class="flex w-full lg:w-[55.15%] cursor-pointer"
        >
          <Picture preload={featuredPhoto.preload}>
            <Source
              media="(max-width: 1023px)"
              fetchPriority={featuredPhoto.preload ? "high" : "low"}
              src={featuredPhoto.src}
              width={200}
              height={200}
            />
            <Source
              media="(min-width: 1024px)"
              fetchPriority={featuredPhoto.preload ? "high" : "low"}
              src={featuredPhoto.src}
              width={400}
              height={400}
            />
            <img
              class="aspect-square w-full lg:pb-[5px]"
              src={featuredPhoto.src}
              alt={featuredPhoto.alt}
              decoding="async"
              loading={featuredPhoto.preload ? "eager" : "lazy"}
            />
          </Picture>
        </a>
        <div class="flex w-full lg:w-[44.08%] min-h-[400px]">
          <ProductCardGallery
            product={product[0]}
          />
        </div>
      </div>
    </div>
  );
}
