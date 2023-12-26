import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
    title: string;
    idProduct?: string;
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

export default function FeaturedGallery({ title, featuredPhoto, directionInverse }: Props) {
    return (
        <div class="flex px-4 flex-col gap-2 py-2">
            <h3 class=" text-base text-left uppercase font-bold">
                {title}
            </h3>
            <a href={featuredPhoto.href}>
                <div class={`flex gap-2 ${MOBILE_DIRECTION[directionInverse?.mobile ?? "col-reverse"]
                    } ${DESKTOP_DIRECTION[directionInverse?.desktop ?? "row"]}`}>
                    <Image src={featuredPhoto.src} alt={featuredPhoto.alt} width={400} height={400} loading={"lazy"} class="w-full lg:w-3/5" />
                    <div class="w-full lg:w-2/5 bg-red-600 min-h-[400px]">

                    </div>
                </div>
            </a>
        </div>
    )
}