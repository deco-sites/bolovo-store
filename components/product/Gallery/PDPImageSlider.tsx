import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function PDPGallerySlider(
  { page }: { page: ProductDetailsPage | null },
) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product: { image: images = [] } } = page;

  return (
    <div
      id={id}
      class="flex flex-col lg:flex-row h-full w-full relative lg:sizeImage"
    >
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2 h-full w-full">
        <Slider class="carousel carousel-center w-full sm:h-full flex-row lg:flex-col lg:snap-y lg:snap-mandatory lg:overflow-y-scroll scroll-smooth max-w-[900px] lg:h-[calc(50vw*520/620)]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full h-auto"
            >
              <Picture class="w-full h-auto" preload={index === 0}>
                <Source
                  media="(max-width: 640px)"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  src={img.url!}
                  width={320}
                  height={320}
                />
                <Source
                  media="(min-width: 641px) and (max-width: 1023px)"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  src={img.url!}
                  width={641}
                  height={641}
                />
                <Source
                  media="(min-width: 1023px) and (max-width: 1499px)"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  src={img.url!}
                  width={436}
                  height={482}
                />
                <Source
                  media="(min-width: 1500px)"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  src={img.url!}
                  width={681}
                  height={708}
                />
                <img
                  class="w-full h-full object-contain lg:max-h-[80vh] "
                  loading={index === 0 ? "eager" : "lazy"}
                  width={370}
                  height={400}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Picture>
            </Slider.Item>
          ))}
        </Slider>
      </div>

      {/* Progress*/}
      <Slider.Progress />
      <SliderJS rootId={id} />
    </div>
  );
}
