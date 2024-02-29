import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Socials {
  label?: string;
  text?: string;
  href?: string;
}

export interface Props {
  hero: {
    media?: ImageWidget;
    altImg?: string;
    /**
    * @description Check this option when this banner is the biggest image on the screen for image optimizations
    */
    preload?: boolean;
  };
  /** @format html */
  /** @title Endereço da Loja */
  addressText?: string;
  alignment?: "left" | "right";
}

function StoresDisplay({ hero, addressText, alignment = "left" }: Props) {

  return (
    <div className="stores-features-section">
      <div className="container mx-auto py-10">
        <div className={`flex flex-col`}>
          {/* Imagem */}
          <div className="mx-4 lg:mx-0 lg:w-1/2">
            <Picture preload={hero.preload}>
              <Source
                media="(max-width: 1023px)"
                fetchPriority={hero.preload ? "high" : "auto"}
                src={hero.media ? hero.media : ''}
                width={400}
                height={295}
              />
              <Source
                media="(min-width: 1024px)"
                fetchPriority={hero.preload ? "high" : "auto"}
                src={hero.media ? hero.media : ''}
                width={785}
                height={577}
              />
              <img
                class="object-cover w-full h-full"
                loading={hero.preload ? "eager" : "lazy"}
                src={hero.media}
                alt={hero.altImg}
              />
            </Picture>
          </div>
          {/* Título e Subtítulo */}
          <div className="lg:w-1/2 px-11 lg:px-0 lg:py-16">
            <div
              className={`
              } md:h-full flex justify-center items-center feature-text-container relative py-11 lg:py-0`}
            >
              <div
                className={`text-[13px] lg:text-[14px] xl:text-base leading-[20.8px] flex flex-col max-w-[433px] ${
                } gap-5`}
              >
                <div
                  className="font-acumin lg:text-base-300"
                  dangerouslySetInnerHTML={{ __html: addressText ?? "" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoresDisplay;
