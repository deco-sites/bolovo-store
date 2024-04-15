import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import ProductCard, { Layout } from "$store/components/product/ProductCard.tsx";
import { Color } from "../../components/search/SearchResultMenu.tsx";
import type { AppContext } from "$store/apps/site.ts";
import { getColorRelatedProducts } from "../../components/search/CategoryMenu.tsx";

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
  products: Product[] | null;
  colors: Color[];
  /** @description Choose if you would like to showcase the color variants in the product cards  */
  showColorVariants?: boolean;
  productCardLayout?: Layout;
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

export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { showColorVariants } = props;
  let colorRelated: { [productName: string]: Product[] } = {};

  if (showColorVariants && props.products) {
    try {
      colorRelated = await getColorRelatedProducts(props.products, ctx);
    } catch (error) {
      console.error("Erro ao obter produtos relacionados por cor:", error);
    }
  }

  return {
    ...props,
    colorVariant: colorRelated || {},
  };
};

export default function FeaturedGallery(
  {
    title,
    featuredPhoto,
    contentDirection,
    products,
    colors,
    colorVariant,
    showColorVariants,
    productCardLayout
  }: Props & { colorVariant?: { [productName: string]: Product[] } },
) {
  if (!products || products.length === 0) {
    return null;
  }
  const platform = "vnda";

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
              width={350}
              height={425}
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
        <div class="flex w-full lg:w-[44.08%]">
          <ProductCard
            product={products[0]}
            itemListName={title}
            platform={platform}
            layout={productCardLayout}
            colorRelated={(colorVariant &&
              colorVariant[products[0].name as string]) || []}
            colors={colors}
            showColorVariants={showColorVariants}
          />
        </div>
      </div>
    </div>
  );
}
