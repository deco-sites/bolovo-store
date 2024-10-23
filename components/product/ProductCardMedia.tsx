import { Layout as LayoutProps } from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Signal } from "@preact/signals";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  idSliders: string;
  productCardImages: ImageObject[];
  url: string;
  layout?: LayoutProps;
  front: ImageObject;
  back: ImageObject;
  isMobile?: boolean;
  preload?: boolean;
  selectedColorVariant: Signal<
    {
      name: string;
      url: string;
      front: string;
      back: string;
    } | null
  >;
}

interface DotsProps {
  images: ImageObject[];
  interval?: number;
}

function Dots({ images, interval = 0 }: DotsProps) {
  return (
    <>
      <ul class="carousel justify-center col-span-full gap-2 z-10 row-start-7 bg-transparent">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div
                class={`py-5 ${
                  ((index === 0) || (index % 4 === 0)) ? "" : "lg:hidden"
                }`}
              >
                <div
                  class="w-4 h-0.5 group-disabled:opacity-100 opacity-20 rounded-full bg-primary"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProductCardMedia(
  {
    idSliders,
    productCardImages,
    url,
    layout,
    front,
    back,
    isMobile,
    preload,
    selectedColorVariant,
  }: Props,
) {
  const safeSrc = (url?: string) => url ?? "";

  const frontImageUrl = selectedColorVariant.value
    ? safeSrc(selectedColorVariant.value.front) // Usa o URL da variante selecionada
    : null;
  const backImageUrl = selectedColorVariant.value
    ? safeSrc(selectedColorVariant.value.back) // Usa o URL da variante selecionada
    : null;

  const relative = (url: string) => {
    const link = new URL(url);
    return `${link.pathname}${link.search}`;
  };

  return (
    <>
      <div
        id={idSliders}
        class="sm:hidden h-full grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
      >
        <Slider class="h-full w-full carousel carousel-center gap-6 col-span-full row-span-full">
          {[frontImageUrl, backImageUrl]?.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <a
                href={url && relative(url)}
                aria-label="view product"
                class="h-full grid items-center grid-cols-1 grid-rows-1 w-full relative"
              >
                <Image
                  preload={index === 0 && preload}
                  fetchPriority={index === 0 && preload ? "high" : "auto"}
                  src={safeSrc(image)}
                  width={177}
                  height={206}
                  class="mix-blend-multiply bg-base-100 h-full w-full"
                  alt={front.alternateName}
                  loading={index === 0 && preload ? "eager" : "lazy"}
                />
              </a>
            </Slider.Item>
          ))}
        </Slider>
        {layout?.dots &&
          (
            <>
              <div class="absolute bottom-0 z-10 right-[42%] bg-transparent">
                <Dots images={productCardImages ?? []} />
              </div>
              <SliderJS
                rootId={idSliders}
                direct
              />
            </>
          )}
      </div>

      <a
        href={url && relative(url)}
        aria-label="view product"
        class="h-full hidden sm:grid items-center grid-cols-1 grid-rows-1 w-full relative"
      >
        {!isMobile && (
          <Picture preload={preload}>
            <Source
              media="(max-width: 1023px)"
              fetchPriority={preload ? "high" : "auto"}
              src={frontImageUrl ?? safeSrc(front.url)}
              width={190}
              height={190}
            />
            <Source
              media="(min-width: 1024px)"
              fetchPriority={preload ? "high" : "auto"}
              src={frontImageUrl ?? safeSrc(front.url)}
              width={317}
              height={317}
            />
            <img
              class={isMobile
                ? "mix-blend-multiply bg-base-100 w-full"
                : `mix-blend-multiply group-hover:mix-blend-normal bg-base-100 col-span-full row-span-full w-full ${
                  layout?.onMouseOver?.image === "Zoom image"
                    ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                    : ""
                }`}
              src={frontImageUrl ?? safeSrc(front.url)}
              alt={front.alternateName}
              decoding="async"
              loading={preload ? "eager" : "lazy"}
            />
          </Picture>
        )}
        {!isMobile && (!layout?.onMouseOver?.image ||
          layout?.onMouseOver?.image === "Change image") &&
          (
            <div class="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Picture preload={preload}>
                <Source
                  media="(max-width: 1023px)"
                  fetchPriority={"auto"}
                  src={safeSrc(
                    frontImageUrl ?? safeSrc(back.url) ?? safeSrc(front.url),
                  )}
                  width={190}
                  height={190}
                />
                <Source
                  media="(min-width: 1024px)"
                  fetchPriority={"auto"}
                  src={safeSrc(
                    frontImageUrl ?? safeSrc(back.url) ?? safeSrc(front.url),
                  )}
                  width={290}
                  height={317}
                />
                <img
                  class="h-full bg-base-100 col-span-full row-span-full w-full"
                  alt={back?.alternateName ?? front.alternateName}
                  src={safeSrc(frontImageUrl ?? safeSrc(back.url || front.url))}
                  decoding="async"
                  loading={"lazy"}
                />
              </Picture>
            </div>
          )}
      </a>
    </>
  );
}

export default ProductCardMedia;
