import { Picture, Source } from "apps/website/components/Picture.tsx";
import AltSlider from "../ui/AltSlider.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import IframeLoader from "deco-sites/bolovo-store/components/content/IframeLoader.tsx";

export interface Image {
  srcMobile: ImageWidget;
  srcDesktop?: ImageWidget;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

export interface Video {
  videoLink: string;
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

/**
 * @titleBy alt
 */
export interface Banner {
  /**
   * @title Video
   */
  video?: Video;
  /**
   * @title Image
   */
  image?: Image;
  /**
   * @description When you click you go to
   */
  href: string;
  /**
   * @description Text to appear when hover(also Alt Text)
   */
  /** @format html */
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

function BannerGrid(props: Props) {
  const {
    itemsPerLine,
    borderRadius,
    banners = [],
  } = props;

  return (
    <section class="w-full px-4 py-12 mx-auto">
      <div
        class={`grid gap-4 md:gap-6 ${
          MOBILE_COLUMNS[itemsPerLine?.mobile ?? 2]
        } ${DESKTOP_COLUMNS[itemsPerLine?.desktop ?? 3]}`}
      >
        {banners.map(({ href, video, text, image }, index) => (
          <a
            key={index}
            href={href}
            class={`group relative overflow-hidden ${
              RADIUS_MOBILE[borderRadius.mobile ?? "none"]
            } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
          >
            {video && (
              <IframeLoader
                videoLink={video.videoLink ?? ""}
                preload={video.preload ?? false}
              />
            )}
            {image && (
              <Picture preload={image.preload ?? false}>
                <Source
                  media="(max-width: 1023px)"
                  fetchPriority={image.preload ? "high" : "auto"}
                  src={image.srcMobile ?? ""}
                  width={256}
                  height={256}
                />
                <Source
                  media="(min-width: 1024px)"
                  fetchPriority={image.preload ? "high" : "auto"}
                  src={image.srcDesktop ? image?.srcDesktop : image?.srcMobile}
                  width={480}
                  height={480}
                />
                <img
                  class="w-full"
                  src={image.srcMobile}
                  alt={text}
                  decoding="async"
                  loading={image.preload ? "eager" : "lazy"}
                />
              </Picture>
            )}
            <AltSlider text={text} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default BannerGrid;
