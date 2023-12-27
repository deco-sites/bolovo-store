import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import type { Product } from "apps/commerce/types.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
export interface Props {
    title: string;
    idProduct: Product[] | null;
    featuredPhoto: {
        src: ImageWidget;
        alt: string;
        href: string;
    },
    /**
     * @title reversed order?
     */
    directionInverse: {
        /** @default "col" */
        mobile?: "col" | "col-reverse";
        /** @default "row" */
        desktop?: "row" | "row-reverse";
    };
}

const MOBILE_DIRECTION = {
    "col": "flex-col",
    "col-reverse": "flex-col-reverse",
};

const DESKTOP_DIRECTION = {
    "row": "lg:flex-row",
    "row-reverse": "lg:flex-row-reverse",
};

export default function FeaturedGallery({ title, featuredPhoto, directionInverse, idProduct }: Props) {

    if (!idProduct || idProduct.length === 0) {
        return null;
    }

    return (
        <div class="flex px-4 flex-col gap-2 py-2">
            <h3 class=" text-base text-left uppercase font-bold">
                {title}
            </h3>
            <a href={featuredPhoto.href} class=" w-full lg:w-[55%]">
                <div class={`flex gap-2 lg:gap-4 ${MOBILE_DIRECTION[directionInverse?.mobile ?? "col-reverse"]
                    } ${DESKTOP_DIRECTION[directionInverse?.desktop ?? "row"]}`}>
                    <Image src={featuredPhoto.src} alt={featuredPhoto.alt} width={400} height={400} loading={"lazy"} class="w-full " />
                    <div class="w-full lg:w-[45%] min-h-[400px]">
                        <ProductCard
                            product={idProduct[0]}
                        />
                    </div>
                </div>
            </a>
        </div>
    )
}