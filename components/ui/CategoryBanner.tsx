import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { SectionProps } from "deco/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy matcher
 */
export interface Banner {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title?: string;
  /** 
   * @description text to be rendered on top of the image 
   * @format html
  */
  subtitle?: string;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
    href?: string;
  };
}

const DEFAULT_PROPS = {
  banners: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "Woman",
      matcher: "/*",
      subtitle: "As",
    },
  ],
};

function Banner(props: SectionProps<ReturnType<typeof loader>>) {
  const { banner } = props;

  if (!banner) {
    return null;
  }

  const { title, subtitle, image, href } = banner;

  return (
    <a href={href} class="grid grid-cols-1 grid-rows-1">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          media="(max-width: 641px)"
          fetchPriority={"high"}
          src={image.mobile}
          width={200}
          height={253}
        />
        <Source
          media="(min-width: 641px) and (max-width: 1023px)"
          fetchPriority={"high"}
          src={image.mobile}
          width={500}
          height={634}
        />
        <Source
          media="(min-width: 1024px) and (max-width: 1499px)"
          fetchPriority={"high"}
          src={image.desktop}
          width={1000}
          height={309}
        />
        <Source
          media="(min-width: 1500px)"
          fetchPriority={"high"}
          src={image.desktop}
          width={1500}
          height={463}
        />
        <img class="w-full"
          loading="eager"
          decoding="auto"
          src={image.desktop}
          alt={image.alt ?? title}
          width={430}
          height={548} />
      </Picture>

      {(title || subtitle) && < div class=" flex flex-col py-5 px-4 lg:py-9 lg:px-6 items-start justify-end sm:items-start col-start-1 col-span-1 row-start-1 row-span-1 w-full gap-3">
        {title && <h1 class=" text-6xl lg:text-[5rem] font-normal text-base-100 font-eb-garamond">
          {title}
        </h1>}
        {subtitle && <span class="text-base-100 text-xs lg:text-base" dangerouslySetInnerHTML={{ __html: subtitle }}>
        </span>}
      </div>}
    </a >
  );
}

export interface Props {
  banners?: Banner[];
}

export const loader = (props: Props, req: Request) => {
  const { banners } = { ...DEFAULT_PROPS, ...props };

  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
