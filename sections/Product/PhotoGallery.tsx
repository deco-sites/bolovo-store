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
                <div class="w-full lg:w-2/4 h-auto justify-between flex flex-row flex-wrap">
                    {
                        products.map((product, index) => (
                            <div class="w-2/4 odd:pr-2 even:pl-2" style={
                                {
                                    paddingTop: index == 2 || index == 3 ? "0.5rem" : 0,
                                    paddingBottom: index == 0 || index == 1 ? "0.5rem" : 0
                                }
                            } >
                                <ProductCard
                                    product={product}
                                />
                            </div>
                        ))

                    }
                </div>

            </div>
        </div>
    )
}
