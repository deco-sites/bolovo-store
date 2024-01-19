import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import PhotoAndProducts from "../../components/search/PhotoAndProducts.tsx";
export interface Props {
    title: string;
    featuredPhoto: {
        src: ImageWidget;
        alt: string;
        href: string;
    },
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

export default function PhotoGallery({ title, featuredPhoto, contentDirection, products }: Props) {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div class="flex px-[15px] flex-col gap-6 py-8">
            <h2 class=" text-base text-left uppercase font-bold">
                {title}
            </h2>
            <PhotoAndProducts
                src={featuredPhoto.src}
                alt={featuredPhoto.alt}
                href={featuredPhoto.href}
                contentDirection={contentDirection}
                products={products}
                customClassProducts={"grid-cols-2 px-0"}
            />
        </div>
    )
}
