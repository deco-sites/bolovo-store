import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";

export interface Banner {
  /** @description text to be rendered on top of the image */
  title?: string;
  /**
   * @description text to be rendered on top of the image
   * @format html
   */
  subtitle?: string;
  image: {
    /**
     * @description Check this option when this banner is the biggest image on the screen for image optimizations
     * @default false
     */
    preload?: boolean;
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
    href?: string;
  };
}
/**
 * @titleBy matcher
 */
export interface BannerProps {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  banner: Banner;
}

export interface Props {
  banners: BannerProps[];
}

const Banner = (props: Banner) => {
  const { title, subtitle, image } = props;
  return (
    <a
      href={image.href}
      class="w-full h-full order-2 lg:order-3"
    >
      <div class="grid grid-cols-1 grid-rows-1">
        <Picture
          preload={image.preload}
          class="col-start-1 col-span-1 row-start-1 row-span-1"
        >
          <Source
            media="(max-width: 641px)"
            fetchPriority={image.preload ? "high" : "auto"}
            src={image.mobile}
            width={320}
            height={406}
          />
          <Source
            media="(min-width: 641px) and (max-width: 1023px)"
            fetchPriority={image.preload ? "high" : "auto"}
            src={image.mobile}
            width={500}
            height={634}
          />
          <Source
            media="(min-width: 1024px) and (max-width: 1499px)"
            fetchPriority={image.preload ? "high" : "auto"}
            src={image.desktop}
            width={1000}
            height={336}
          />
          <Source
            media="(min-width: 1500px)"
            fetchPriority={image.preload ? "high" : "auto"}
            src={image.desktop}
            width={1500}
            height={504}
          />
          <img
            class="w-full"
            loading="eager"
            decoding="auto"
            src={image.desktop}
            alt={image.alt ?? title}
            width={430}
            height={548}
          />
        </Picture>
        {(title || subtitle) && (
          <div class=" flex flex-col  py-5 px-4 lg:py-9 lg:px-6  items-start justify-end sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full gap-3 ">
            {title && (
              <h1 class=" text-basexl lg:text-[5rem] font-normal text-base-100 font-eb-garamond">
                {title}
              </h1>
            )}
            {subtitle && (
              <span
                class="text-base-100 text-base lg:text-base gap-0 p-0"
                dangerouslySetInnerHTML={{
                  __html: subtitle.replace(/<div.*?>/g, "").replace(
                    /<\/div>/g,
                    "",
                  ),
                }}
              >
              </span>
            )}
          </div>
        )}
      </div>
    </a>
  );
};

function BannerInCategory(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  return <Banner {...banner.banner} />;
}

export default BannerInCategory;

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...props };
  const banner = banners?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};
