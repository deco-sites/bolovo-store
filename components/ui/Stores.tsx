import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Socials {
  label?: string;
  text?: string;
  href?: string;
}

export interface Props {
  hero: {
    media: ImageWidget;
    altImg: string;
    preload?: boolean;
  };
  /** @format html */
  /** @title Endereço da Loja */
  address?: string;
  content: {
    storeName?: string;
    socials?: Socials[];
  };
  alignment?: "left" | "right";
}

function StoresDisplay({ hero, address, content, alignment = "left" }: Props) {
  const containerClasses = alignment === "right"
    ? "lg:flex-row-reverse"
    : "lg:flex-row";

  return (
    <div class="stores-features-section">
      <div class="container mx-auto py-10">
        <div class={`flex flex-col ${containerClasses}`}>
          <div class="mx-4 lg:mx-0 lg:w-1/2">
            <Picture preload={hero.preload}>
              <Source
                media="(max-width: 1023px)"
                fetchPriority={hero.preload ? "high" : "low"}
                src={hero.media}
                width={300}
                height={220}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority={hero.preload ? "high" : "low"}
                src={hero.media}
                width={570}
                height={425}
              />
              <img
                class="object-cover w-full max-h-[577px]"
                src={hero.media}
                alt={hero.altImg}
                decoding="async"
                loading={hero.preload ? "eager" : "lazy"}
              />
            </Picture>
          </div>
          <div class="lg:w-1/2 px-11 lg:px-0 lg:py-16">
            <div
              class={` bg-[#F6F6F6] ${
                alignment === "right" ? "lg:pr-[24.4%]" : "lg:pl-[24.4%]"
              } md:h-full flex justify-center items-center feature-text-container relative py-11 lg:py-0`}
            >
              <div
                class={`text-[13px] lg:text-[14px] xl:text-base leading-[20.8px] flex flex-col max-w-[433px] ${
                  alignment === "right" ? "lg:ml-auto" : "lg:mr-auto"
                } gap-5`}
              >
                <h4 class="text-[#121212] font-semibold">
                  {content.storeName}
                </h4>
                <div
                  class="font-acumin lg:text-base-300"
                  dangerouslySetInnerHTML={{ __html: address ?? "" }}
                />
                <ul>
                  {content.socials?.map(({ label, text, href }, index) => (
                    <li key={index}>
                      <a class="font-acumin" href={href}>
                        <strong>{label}:</strong>
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoresDisplay;
