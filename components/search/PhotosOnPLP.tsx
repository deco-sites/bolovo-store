import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";


interface Photo {
    variant: "1x1" | "2x2";
    src: ImageWidget;
    alt: string;
    href: string;
    /** @description When activating text, a gradient will be activated to improve highlighting in the text */
    activeText?: boolean;
    /** @format html */
    title?: string;
    /** @format html */
    paragraph?: string;
}

/**
 * @titleBy matcher
 */
export interface Section {
    matcher: string;
    line: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
    page: number;
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


export default function PhotoOnPLP({ section, customClass, customClassProducts }: { section: Section, customClass: string, customClassProducts: string }) {

    const { products, photo, contentDirection } = section

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div class={`flex flex-col gap-6 py-8 mx-[-15px] lg:mx-0 ${customClass}`}>
            <div class={`flex gap-5 lg:gap-[15px] w-full
                ${MOBILE_DIRECTION[contentDirection?.mobile ?? "imagem acima"]
                } ${DESKTOP_DIRECTION[contentDirection?.desktop ?? "imagem na direita"]} `}>
                <a href={photo.href} class=" w-full lg:w-2/4 cursor-pointer">
                    <div class="w-full h-full relative">
                        <Image src={photo.src} alt={photo.alt} width={VARIANT_IMAGE_WIDTH[photo.variant]} height={VARIANT_IMAGE_HEIGHT[photo.variant]} loading={"lazy"} class="w-full h-full object-cover" />
                        {photo.activeText && <div class="absolute left-0 top-0 w-full h-full p-4 flex flex-col justify-end items-start bg-gradient-to-t from-[#00000040] to-transparent gap-3">
                            {photo.title && <span class=" text-5xl font-medium font-eb-garamond" dangerouslySetInnerHTML={{ __html: photo.title }} ></span>}
                            {photo.paragraph && <span class=" text-sm " dangerouslySetInnerHTML={{ __html: photo.paragraph }} ></span>}
                        </div>}
                    </div>
                </a>
                <ul class={`w-full lg:w-2/4 gap-2 lg:gap-[15px] h-auto grid ${customClassProducts} lg:grid-cols-2 px-[15px] lg:px-0`}>
                    {
                        products.map((product) => (
                            <li class="w-full">
                                <ProductCard
                                    product={product}
                                />
                            </li>
                        ))
                    }
                </ul>

            </div >
        </div >
    )
}