import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface ContentBlogItem {
  label: string;
  linksContent: LinkContent[];
}

export interface LinkContent {
  image: ImageWidget;
  title: string;
  subtitle: string;
  alternateName: string;
  link: string
}


function RenderImages({ images }: { images: LinkContent[] | undefined }) {

  if (images == undefined) {
    return null;
  }

  return (
    <div class="flex items-start gap-2 justify-between w-full flex-nowrap px-2">
      {images.map((imageData) => {
        return (
          <a href={imageData.link} class="w-1/3 max-w-[180px] lg:max-w-[242px] group hover:scale-105 ease-in duration-200">
            <figure class="flex flex-col items-center w-full gap-y-[15px] ">
              <Image
                src={imageData.image}
                alt={imageData.alternateName}
                width={242}
                height={242}
                loading="lazy"
                class="w-full "
              />
              <figcaption class="text-center text-base font-semibold leading-tight whitespace-normal">
                {imageData.title}
              </figcaption>
            </figure>
            <p class="text-center text-sm text-[#1212124D] mt-2">{imageData.subtitle}</p>
          </a>
        )
      })}
    </div>
  );
}

function ContentBlog({ item }: { item: ContentBlogItem }) {
  const { label, linksContent } = item;

  return (
    <nav class="group flex items-center cursor-pointer px-0" style={{ height: navbarHeight }}>
      <div class="relative flex items-center group-hover:border-b-2 border-black">
        <span class="uppercase">
          {label}
        </span>
      </div>
      <div class="hidden group-hover:flex bg-base-100 z-50 items-start justify-between w-full border-b-2 border-base-200 flex-row-reverse pt-[55px] pb-14 top-full absolute left-0"
        style="box-shadow: inset 0px 17px 23px -30px #0000005e;"
      >
        <div class="flex items-start justify-between flex-row w-full">
          <RenderImages images={linksContent} />
        </div>
      </div>
    </nav>
  );
}

export default ContentBlog;
