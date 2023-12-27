import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ProductCard, {
    Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";

export interface Props {
    title:string;
    image: {
        imageMobile: ImageWidget;
        imageDesktop: ImageWidget;
        alt: string
    }
}

export default function PhotoGallery() {
    return (
        <div>
            <div>

            </div>
            <div>

            </div>
        </div>
    )
}