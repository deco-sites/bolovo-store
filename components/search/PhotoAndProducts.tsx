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
    * @title position Image?
    */
    /** @default "imagem na direita" */
    layoutDesktop?: "imagem na direita" | "imagem na esquerda";

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

const GRID_SPAN: {
    [key: string]: string;
} = {
    "1x1 imagem na esquerda": "col-span-2 lg:col-span-1",
    "2x1 imagem na esquerda": "col-span-2",
    "2x2 imagem na esquerda": "col-span-2 lg:row-span-2",
    "1x1 imagem na direita": "lg:col-start-4 lg:col-end-5 col-span-2 ",
    "2x1 imagem na direita": "lg:col-start-3 col-span-2",
    "2x2 imagem na direita": "lg:col-start-3 col-span-2 row-span-2",

}

export function PhotoAndProducts({ variant = "2x2", title = "", paragraph = "", src, alt, href = "", row, layoutDesktop = "imagem na direita", products, customClassImage }: {
    variant?: "1x1" | "2x1" | "2x2";
    src: ImageWidget;
    alt: string;
    href?: string;
    layoutDesktop?: "imagem na direita" | "imagem na esquerda";
    products: Product[] | null;
    /** @format html */
    title?: string;
    /** @format html */
    paragraph?: string;
    row?: number;
    customClassImage?: string;
}) {

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <>
            <li class={`${GRID_SPAN[variant + " " + layoutDesktop]} ${customClassImage} h-full `} style={{ gridRowStart: row?.toString() }}>
                < a href={href} class={` w-full cursor-pointer h-full`}>
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