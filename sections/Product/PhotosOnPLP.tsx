import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";


interface Photo {
    variant: "1x1" | "2x2";
    src: ImageWidget;
    alt: string;
    href: string;
    /** @description When activating text, a gradient will be activated to improve highlighting in the text */
    activeText: boolean;
    /** @format html */
    title?: string;
    /** @format html */
    paragraph?: string;
}

export interface Props {
    urlPage: string;
    photo: Photo;
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
    "imagem acima": "flex-col",
    "imagem abaixo": "flex-col-reverse",
};

const DESKTOP_DIRECTION = {
    "imagem na esquerda": "lg:flex-row",
    "imagem na direita": "lg:flex-row-reverse",
};

const VARIANT_IMAGE_WIDTH = {
    "1x1": 431,
    "2x2": 400,
}
const VARIANT_IMAGE_HEIGHT = {
    "1x1": 292,
    "2x2": 540,
}


export default function PhotoOnPLP({ photo, contentDirection, products }: Props) {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div class="flex flex-col gap-6 py-8 lg:px-4">
            <div class={`flex gap-5 lg:gap-[15px] w-full
                ${MOBILE_DIRECTION[contentDirection?.mobile ?? "imagem acima"]
                } ${DESKTOP_DIRECTION[contentDirection?.desktop ?? "imagem na direita"]} `}>
                <a href={photo.href} class=" w-full lg:w-[53%] cursor-pointer">
                    <div class="w-full relative">
                        <Image src={photo.src} alt={photo.alt} width={VARIANT_IMAGE_WIDTH[photo.variant]} height={VARIANT_IMAGE_HEIGHT[photo.variant]} loading={"lazy"} class="w-full h-full lg:pb-1" />
                        <div class="absolute left-0 top-0 w-full h-full p-4 flex flex-col justify-end items-start bg-gradient-to-t from-[#000000b3] to-transparent gap-3">
                            {photo.title && <span class=" text-5xl font-medium font-eb-garamond" dangerouslySetInnerHTML={{ __html: photo.title }} ></span>}
                            {photo.paragraph && <span class=" text-sm " dangerouslySetInnerHTML={{ __html: photo.paragraph }} ></span>}
                        </div>
                    </div>
                </a>
                <ul class="w-full lg:w-[47%] gap-2 gap-y-[45px] lg:gap-[15px] h-auto justify-between flex flex-row flex-wrap content-between">
                    {
                        products.map((product) => (
                            <li class="w-[calc(50%-0.25rem)] lg:w-[calc(50%-7.5px)]">
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
