import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import IframeLoader from "$store/components/content/IframeLoader.tsx";

interface Images {
  src: ImageWidget;
  alt: string;
}

export interface Props {
  /**
   * @title reversed order?
   */
  directionInverse: {
    /** @default "col-reverse" */
    mobile?: "col" | "col-reverse";
    /** @default "row" */
    desktop?: "row" | "row-reverse";
  };

  /**
   * @title Image of title content
   * @description Infos of primary column
   */
  image: {
    src: ImageWidget;
    alt: string;
  };
  /**
   * @title Text content
   * @format rich-text
   */
  textContent: string;

  /**
   * @title List of imagens
   */
  listImages: Images[];
  /**
   * @title Link of video
   * @description Infos of second column
   */
  videoLink: string;
}

const MOBILE_DIRECTION = {
  "col": "flex-col",
  "col-reverse": "flex-col-reverse",
};

const DESKTOP_DIRECTION = {
  "row": "md:flex-row",
  "row-reverse": "md:flex-row-reverse",
};

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}

export default function VideoAndText(
  { directionInverse, image, textContent, listImages, videoLink }: Props,
) {
  return (
    <div class="flex flex-row px-4 w-full py-8 2xl:py-16">
      <div
        class={`flex justify-center items-center gap-6 w-full ${
          MOBILE_DIRECTION[directionInverse?.mobile ?? "col-reverse"]
        } ${DESKTOP_DIRECTION[directionInverse?.desktop ?? "row"]}`}
      >
        <div class="flex flex-col justify-between h-full items-center w-full md:w-2/4 gap-3 2xl:gap-20">
          <Image
            src={image.src}
            alt={image.alt}
            width={350}
            height={69}
            loading={"lazy"}
            class="max-w-[200px] md:max-w-[220px] xl:max-w-[350px] 2xl:max-w-[400px]"
          />
          <div
            dangerouslySetInnerHTML={{ __html: textContent }}
            class="font-acumin font-normal text-[0.75rem] leading-[160%] lg:text-[0.813rem] lg:leading-5 xl:text-sm xl:leading-6 2xl:text-base 2xl:leading-7"
          >
          </div>
          <div class="flex flex-row gap-2">
            {listImages.map((img) => {
              return (
                <div>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={100}
                    height={37}
                    loading={"lazy"}
                    class="max-w-[70px] xl:max-w-[100px] 2xl:max-w-[150px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div class="aspect-video flex w-full md:w-2/4 h-full">
          <div class="w-full h-full">
            <IframeLoader videoLink={videoLink} />
          </div>
        </div>
      </div>
    </div>
  );
}
