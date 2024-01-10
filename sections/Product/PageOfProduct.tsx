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
        <div class="lg:container pt-0 lg:py-11 lg:px-6 xl:px-24 2xl:px-32 flex justify-between flex-col lg:flex-row md:gap-12 lg:gap-24 py-11 ">
            <div class="w-full lg:w-3/5">
                <PDPGallerySlider layoutImage={pdpImage} page={page} />
            </div>
            <div class="w-full lg:w-2/5 lg:max-w-[400px]">
                <PDPProductInfo page={page} />
            </div>
        </div>
    )
}