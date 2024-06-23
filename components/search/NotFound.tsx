import type { Props } from "$store/components/product/ProductShelf.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import SearchedWord from "$store/components/ui/SearchedWord.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Step {
  label: string;
  /**
   * @format html
   */
  textStep: string;
}

interface Shelf {
  /**@label Shelf */
  shelf: Props;
}

export interface PropsNotFound {
  title: string;
  /** @default "dark" */
  theme: "dark" | "light";
  image?: {
    active?: boolean;
    src?: ImageWidget;
    alt: string;
  };
  backgroundImage?: {
    active?: boolean;
    mobile?: ImageWidget;
    desktop?: ImageWidget;
    alt: string;
  };
  steps: {
    positionSteps: "horizontal" | "vertical";
    items: Step[];
  };
  shelfs?: Shelf[];
}

export const BACKGROUND_COLOR = {
  "dark": "bg-black",
  "light": "bg-white",
};

export const TEXT_COLOR = {
  "dark": "text-black",
  "light": "text-white",
};

const POSITION_STEPS = {
  "horizontal": "lg:flex-row",
  "vertical": "lg:flex-col",
};

function Container(
  { props, searchedLabel }: { props: PropsNotFound; searchedLabel: string },
) {
  const { title, image, steps, theme } = props;

  return (
    <div
      class={`w-full flex justify-center items-center pt-12 pb-28 lg:pb-44 px-4 flex-col gap-7 ${
        TEXT_COLOR[theme ?? "dark"]
      }`}
    >
      {image?.active && image.src &&
        (
          <Image
            loading="eager"
            width={106}
            height={106}
            src={image.src}
            alt={image.alt}
            class=" animate-spin-slow"
          >
          </Image>
        )}
      <div class={`${!image?.active && "mt-24"}`}>
        <SearchedWord theme={theme} searchedLabel={searchedLabel} />
      </div>
      <p class={`uppercase font-bold text-center`}>
        {title}
      </p>
      <ul
        class={`flex w-full flex-col gap-4 pt-4 lg:pt-8 justify-evenly px-2 ${
          POSITION_STEPS[steps.positionSteps ?? "horizontal"]
        }`}
      >
        {steps.items.map((item, index) => (
          <li
            class={`flex flex-col gap-1 items-center lg:min-w-[33%] justify-center ${
              POSITION_STEPS[steps.positionSteps ?? "horizontal"]
            }`}
          >
            <span
              class={`font-averia font-bold  text-4xl italic text-center lg:text-start`}
            >
              {index + 1}.
            </span>
            <span
              class={`uppercase  text-center text-sm flex justify-center items-end flex-wrap`}
              dangerouslySetInnerHTML={{ __html: item.textStep }}
            >
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NotFound(
  { props, searchedLabel }: { props: PropsNotFound; searchedLabel: string },
) {
  const { backgroundImage, shelfs } = props;

  return (
    <div class="flex flex-col w-full h-full">
      <div class="relative w-full h-full">
        {backgroundImage?.active && backgroundImage.desktop &&
          backgroundImage.mobile &&
          (
            <Picture preload={true}>
              <Source
                media="(max-width: 641px)"
                fetchPriority={"high"}
                src={backgroundImage.mobile}
                width={431}
                height={431}
              />
              <Source
                media="(min-width: 641px) and (max-width: 1023px)"
                fetchPriority={"high"}
                src={backgroundImage.mobile}
                width={641}
                height={641}
              />
              <Source
                media="(min-width: 1024px) and (max-width: 1499px)"
                fetchPriority={"high"}
                src={backgroundImage.desktop}
                width={1024}
                height={412}
              />
              <Source
                media="(min-width: 1500px)"
                fetchPriority={"high"}
                src={backgroundImage.desktop}
                width={1500}
                height={604}
              />
              <img
                class="w-full h-full absolute top-0 left-0 object-cover brightness-[60%]"
                loading="eager"
                src={backgroundImage.mobile}
                alt={backgroundImage.alt}
              />
            </Picture>
          )}

        <div class="relative w-full h-ful">
          <Container props={props} searchedLabel={searchedLabel} />
        </div>
      </div>
      {shelfs && shelfs.map((item) => <ProductShelf {...item.shelf} />)}
    </div>
  );
}
