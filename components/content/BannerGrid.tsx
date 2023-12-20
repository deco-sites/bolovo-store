import { Picture, Source } from "apps/website/components/Picture.tsx";

import type { ImageWidget } from "apps/admin/widgets.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description When you click you go to
   */
  href: string;
  /**
   * @description Text to appear when hover(also Alt Text)
   */
  text: string;
}

export type BorderRadius =
  | "none"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "2xlarge"
  | "3xlarge"
  | "full";

export interface Props {
  /**
   * @description Default is 2 for mobile and 3 for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 3 */
    desktop?: 1 | 2 | 3 | 4 | 6 | 8;
  };
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "small": "rounded-sm",
  "medium": "rounded-md",
  "large": "rounded-lg",
  "xlarge": "rounded-xl",
  "2xlarge": "rounded-2xl",
  "3xlarge": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "small": "sm:rounded-sm",
  "medium": "sm:rounded-md",
  "large": "sm:rounded-lg",
  "xlarge": "sm:rounded-xl",
  "2xlarge": "sm:rounded-2xl",
  "3xlarge": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const DEFAULT_PROPS: Props = {
  banners: [
    {
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/82727553-f670-4e7c-b9c2-9452aed1955f",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7b3a9d75-57a5-43cf-a3c5-f689a997f24e",
      text: "Bolovo Store Productions"
    },
    {
      href: "a",
      srcMobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/c5c6bdf6-5555-488c-8b14-719e4158dea6",
      srcDesktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/3e2b7824-d75c-4704-8d32-621bfc9b20cf",
      text: "Bolovo Store Productions"
    },
  ],
  borderRadius: {
    mobile: "medium",
    desktop: "medium",
  },
  itemsPerLine: {
    mobile: 2,
    desktop: 3,
  },
  preload: true,
};

function BannerGrid(props: Props) {
  const {
    itemsPerLine,
    borderRadius,
    banners = [],
    preload,
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <section class="container w-full px-4 py-8 md:px-0 mx-auto">
      <div
        class={`grid gap-4 md:gap-6 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 3]}`}
      >
        {banners.map(({ href, srcMobile, srcDesktop, text }, index) => (
          <a
            key={index}
            href={href}
            class={`group relative overflow-hidden ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            <Picture preload={preload}>
              <Source
                media="(max-width: 1023px)"
                fetchPriority={preload ? "high" : "auto"}
                src={srcMobile}
                width={256}
                height={256}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority={preload ? "high" : "auto"}
                src={srcDesktop ? srcDesktop : srcMobile}
                width={480}
                height={480}
              />
              <img
                class="w-full"
                src={srcMobile}
                alt={text}
                decoding="async"
                loading={preload ? "eager" : "lazy"}
              />
            </Picture>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white flex items-center justify-center overflow-hidden transition-['height, opacity'] duration-300 
                h-0 opacity-0 group-hover:opacity-100 h-12">
              <div className="w-4/5 text-center">
                <p className="text-black text-center">{text}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default BannerGrid