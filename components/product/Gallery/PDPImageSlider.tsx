import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface PDPImageProps {
  layoutImage: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function PDPGallerySlider({ layoutImage, page }: { layoutImage: PDPImageProps, page: ProductDetailsPage | null; }) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product: { image: images = [] } } = page
  const { layoutImage: { width, height } } = layoutImage

  const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col">
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
          disabled
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton>

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      {/* Dots */}
      <ul class="carousel carousel-center gap-1 px-4 sm:px-0 sm:flex-col order-2 sm:order-1">
        {images.map((img, index) => (
          <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
            <Slider.Dot index={index}>
              <Image
                style={{ aspectRatio }}
                class="group-disabled:border-base-300 border rounded "
                width={63}
                height={87.5}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <SliderJS rootId={id} />
    </div>
  );
}
