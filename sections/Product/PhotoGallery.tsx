import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
export interface Props {
    title: string;
    products: Product[] | null;
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
}

const MOBILE_DIRECTION = {
    "imagem acima": "flex-col",
    "imagem abaixo": "flex-col-reverse",
};

const DESKTOP_DIRECTION = {
    "imagem na direita": "lg:flex-row",
    "imagem na esquerda": "lg:flex-row-reverse",
};

export default function PhotoGallery({ title, featuredPhoto, contentDirection, products }: Props) {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div class="flex px-4 flex-col gap-6 py-8">
            <h2 class=" text-base text-left uppercase font-bold">
                {title}
            </h2>
            <div class={`flex gap-2 lg:gap-4  
                ${MOBILE_DIRECTION[contentDirection?.mobile ?? "imagem acima"]
                } ${DESKTOP_DIRECTION[contentDirection?.desktop ?? "imagem na direita"]} `}>
                <a href={featuredPhoto.href} class=" w-full lg:w-2/4 cursor-pointer">
                    <Image src={featuredPhoto.src} alt={featuredPhoto.alt} width={400} height={540} loading={"lazy"} class="w-full h-full" />
                </a>
                <ul class="w-full lg:w-2/4 gap-2 lg:gap-4 h-auto justify-between flex flex-row flex-wrap">
                    {
                        products.map((product) => (
                            <li class="w-[calc(50%-0.25rem)] lg:w-[calc(50%-0.5rem)]">
                                <ProductCard
                                    product={product}
                                />
                            </li>
                        ))

                    }
                </ul>

            </div>
        </div>
    )
}