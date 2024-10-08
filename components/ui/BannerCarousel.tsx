import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

/**
 * @titleBy alt
 */
export interface Autoplay {
  /** @description Activate or deactivate Carousel autoplay */
  activate?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Button label */
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay
   */
  autoplay?: Autoplay;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/24278f9e-412d-4a8a-b2d3-57353bb1b368",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/afa2c07c-74f4-496d-8647-5cc58f48117b",
    },
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/eeaa624c-a3e1-45e8-a6fe-034233cfbcd0",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7949d031-9a79-4639-b85e-62fd90af85a9",
    },
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ae89571c-4a7c-44bf-9aeb-a341fd049d19",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7ec121e4-5cfe-4b7b-b942-d1ed4493803d",
    },
  ],
  preload: true,
  autoplay: {
    activate: true,
    interval: 5,
  },
};

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <a
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative overflow-y-hidden w-full"
    >
      <Picture preload={lcp}>
        <Source
          media="(max-width: 640px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={320}
          height={465}
        />
        <Source
          media="(min-width: 641px and max-width: 1023px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={641}
          height={316}
        />
        <Source
          media="(min-width: 1024px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
          height={600}
        />
        <img
          class="w-full h-full object-cover"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Dots({ images, autoplay }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel justify-center col-span-full gap-4 z-10 row-start-4">
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="py-5">
                <div
                  class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-black from-[length:var(--dot-progress)] to-white to-[length:var(--dot-progress)]"
                  style={{ animationDuration: `${autoplay?.interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Buttons() {
  return (
    <>
      <div class="pl-6 md:pl-0 flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton class="btn btn-circle bg-[#FFFFFFCC]">
          <Icon
            class="text-white"
            size={40}
            id="ArrowPointingLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="pr-6 md:pr-0 flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton class="btn btn-circle bg-[#FFFFFFCC]">
          <Icon
            class="text-white"
            size={40}
            id="ArrowPointingRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

function BannerCarousel(props: Props) {
  const { images, preload, autoplay } = { ...DEFAULT_PROPS, ...props };
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px] pb-6 lg:pb-10"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-6">
        {images?.map((image, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <BannerItem image={image} lcp={index === 0 && preload} />
          </Slider.Item>
        ))}
      </Slider>

      {images && images.length > 1
        ? (
          <>
            <Buttons />
            <Dots images={images} autoplay={autoplay} />
          </>
        )
        : null}

      <SliderJS
        rootId={id}
        direct
        interval={autoplay?.interval && images && images.length > 1
          ? autoplay.interval * 1e3
          : undefined}
        infinite
      />
    </div>
  );
}

export default BannerCarousel;
