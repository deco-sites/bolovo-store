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
    <div className="stores-features-section">
      <div className="container mx-auto py-10">
        <div className={`flex flex-col ${containerClasses}`}>
          {/* Imagem */}
          <div className="mx-4 lg:mx-0 lg:w-1/2">
            <img
              src={hero.media}
              alt={hero.altImg}
              className="object-cover w-full max-h-[577px]"
            />
          </div>
          {/* Título e Subtítulo */}
          <div className="lg:w-1/2 px-11 lg:px-0 lg:py-16">
            <div
              className={` bg-[#F6F6F6] ${
                alignment === "right" ? "lg:pr-[24.4%]" : "lg:pl-[24.4%]"
              } md:h-full flex justify-center items-center feature-text-container relative py-11 lg:py-0`}
            >
              <div
                className={`text-[13px] lg:text-[14px] xl:text-base leading-[20.8px] flex flex-col max-w-[433px] ${
                  alignment === "right" ? "lg:ml-auto" : "lg:mr-auto"
                } gap-5`}
              >
                <h4 className="text-[#121212] font-semibold">
                  {content.storeName}
                </h4>
                <div
                  className="font-acumin lg:text-base-300"
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
