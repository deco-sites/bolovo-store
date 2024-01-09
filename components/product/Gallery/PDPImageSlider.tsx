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
      <div class="relative order-1 sm:order-2 md:pl-12 lg:pl-24"
        style={{ height: 100 / images.length + "%" }}
      >
        <Slider class="carousel carousel-center w-full sm:h-full flex-col snap-y snap-mandatory overflow-y-scroll scroll-smooth">
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

      </div>

      {/* Dots */}
      <ul class="carousel carousel-center px-4 sm:px-0 sm:flex-col order-2 sm:order-1 w-[1px] bg-[#D0D0D0] h-[90%]"
        style={{ height: 90 / images.length + "%" }}
      >
        {images.map((__, index) => (
          <li class={`carousel-item w-[1px]`}
            style={{ height: 100 / images.length + "%" }}
          >
            <Slider.Dot index={index}>
              <div
                class="opacity-0 group-disabled:bg-black group-disabled:opacity-100 ease-out duration-700 w-[1px] h-full"
              ></div>
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <SliderJS rootId={id} />
    </div >
  );
}
