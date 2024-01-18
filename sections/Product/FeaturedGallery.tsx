import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Product } from "apps/commerce/types.ts";
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
    product: Product[] | null;
}

export default function FeaturedGallery({ product, featuredPhoto, contentDirection, title }: Props ) {

    if (!product || product.length === 0) {
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
                products={product} />
        </div>
    )
}
