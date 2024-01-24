import { ProductDetailsPage } from "apps/commerce/types.ts";
import PDPGallerySlider from "../../components/product/Gallery/PDPImageSlider.tsx";
import PDPProductInfo from "../../components/product/PDPProductInfo.tsx";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  reloadInSelector?: boolean;
}

export default function PageOfProduct(
  { page, reloadInSelector = false }: Props,
) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  return (
    <div class=" pt-0 lg:py-11 lg:px-[8%] flex justify-center flex-col lg:flex-row md:gap-12 lg:gap-[6%] py-11 ">
      <div class="w-full lg:w-3/5">
        <PDPGallerySlider page={page} />
      </div>
      <div class="w-full lg:w-2/5 lg:max-w-[400px]">
        <PDPProductInfo page={page} reloadInSelector={reloadInSelector} />
      </div>
    </div>
  );
}
