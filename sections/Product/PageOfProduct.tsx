import { ProductDetailsPage } from "apps/commerce/types.ts";
import PDPGallerySlider from "../../components/product/Gallery/PDPImageSlider.tsx";
import type { PDPImageProps } from "../../components/product/Gallery/PDPImageSlider.tsx";
import PDPProductInfo from "../../components/product/PDPProductInfo.tsx";

export interface Props {
    /** @title Integration */
    page: ProductDetailsPage | null;
    pdpImage: PDPImageProps;

}

export default function PageOfProduct({ page, pdpImage }: Props) {

    if (page === null) {
        throw new Error("Missing Product Details Page Info");
    }

    return (
        <div>
            <div>
                <PDPGallerySlider layoutImage={pdpImage} page={page} />
            </div>
            <div>
                <PDPProductInfo page={page} />
            </div>
        </div>
    )
}