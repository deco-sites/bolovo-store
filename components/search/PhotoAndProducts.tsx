import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";

export interface ImageAndProducts {
    variant: "1x1" | "2x2" | "2x1";
    src: ImageWidget;
    alt: string;
    href?: string;
    /**
 * @title reversed order?
 */
    contentDirection: {
        /** @default "imagem acima" */
        mobile?: "imagem acima" | "imagem abaixo";
        /** @default "imagem na direita" */
        desktop?: "imagem na direita" | "imagem na esquerda";
    };
    /** @format html */
    title?: string;
    /** @format html */
    paragraph?: string;
    products: Product[] | null;
}

/**
 * @titleBy matcher
 */
export interface Section {
    matcher: string;
    line: number
    page: number;
    imageAndProducts: ImageAndProducts;
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
    "1x1": 280,
    "2x1": 431,
    "2x2": 400,
}
const VARIANT_IMAGE_HEIGHT = {
    "1x1": 350,
    "2x1": 292,
    "2x2": 540,
}

const VARIANT_WIDTH_CONTAINER_IMAGE = {
    "1x1": "lg:w-[calc(25%-11px)]",
    "2x1": "lg:w-2/4",
    "2x2": "lg:w-2/4",
}
const VARIANT_WIDTH_CONTAINER_PRODUCTS = {
    "1x1": "lg:w-[75%]",
    "2x1": "lg:w-2/4",
    "2x2": "lg:w-2/4",
}

const GRID_SPACE: {
    [key: string]: string;
} = {
    "1x1 imagem na esquerda": "col-span-2 lg:col-span-1",
    "2x1 imagem na esquerda": "col-span-2",
    "2x2 imagem na esquerda": "col-span-2 lg:row-span-2",
    "1x1 imagem na direita": "lg:col-start-4 lg:col-end-5 col-span-2 ",
    "2x1 imagem na direita": "lg:col-start-3 col-span-2",
    "2x2 imagem na direita": "lg:col-start-3 col-span-2 row-span-2",

}

export function PhotoAndProducts({ variant = "2x2", title = "", paragraph = "", src, alt, href = "", row, contentDirection, products, customClassImage, customClassProducts }: {
    variant?: "1x1" | "2x1" | "2x2";
    src: ImageWidget;
    alt: string;
    href?: string;
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
    /** @format html */
    title?: string;
    /** @format html */
    paragraph?: string;
    row?: number;
    customClassImage?: string;
    customClassProducts?: string;
}) {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <>
            <li class={`${GRID_SPACE[variant + " " + contentDirection.desktop]} ${customClassImage} h-full `} style={{ gridRowStart: row?.toString() }}>
                < a href={href} class={` w-full cursor-pointer ${VARIANT_WIDTH_CONTAINER_IMAGE[variant]}`}>
                    <div class="w-full h-full relative">
                        <Image src={src} alt={alt} width={VARIANT_IMAGE_WIDTH[variant]} height={VARIANT_IMAGE_HEIGHT[variant]} loading={"lazy"} class="w-full h-full object-cover" />
                        {(title || paragraph) && <div class="absolute left-0 top-0 w-full h-full p-4 flex flex-col justify-end items-start bg-gradient-to-t from-[#00000040] to-transparent gap-3">
                            {title && <span class=" text-5xl font-medium font-eb-garamond" dangerouslySetInnerHTML={{ __html: title }} ></span>}
                            {paragraph && <span class=" text-sm " dangerouslySetInnerHTML={{ __html: paragraph }} ></span>}
                        </div>}
                    </div>
                </a>
            </li >
            {
                products.map((product) => (
                    <li class="h-full ">
                        <ProductCard
                            product={product}
                        />
                    </li>
                ))
            }
        </>

    )
}