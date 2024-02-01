import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { navbarHeight } from "./constants.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface NavItemProps {
  label?: string;
  links?: Links[];
  images?: Image[];
}

export interface Links {
  label?: string;
  href?: string;
  children?: Links[];
}

export interface Image {
  image: ImageWidget;
  label?: string;
  alternateName?: string;
  link?: string;
}

function RenderLinks(
  { links, isChild = false }: { links: Links[] | undefined; isChild: boolean },
) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <>
      {links.map((link) => {
        return (
          <ul>
            <a
              class={`text-base ${
                isChild ? "font-normal" : "font-semibold"
              } leading-9 whitespace-nowrap hover:underline ease-in-out duration-200`}
              href={link.href}
            >
              {link.label}
            </a>
            <li class="flex flex-col">
              <RenderLinks links={link.children} isChild={true} />
            </li>
          </ul>
        );
      })}
    </>
  );
}

function RenderImages({ images }: Image[] | undefined) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div class="flex items-start px-2 justify-end w-2/4 flex-wrap">
      {images.map((imageData) => {
        return (
          <a
            href={imageData.link}
            class=" w-1/3 max-w-[180px] lg:max-w-[242px] hover:scale-105 ease-in duration-200"
          >
            <figure class="flex flex-col items-center w-full px-2 gap-y-[15px] ">
              <Image
                src={imageData.image}
                alt={imageData.alternateName}
                width={242}
                height={242}
                loading="lazy"
                class="w-full "
              />
              <figcaption class="text-center text-base font-semibold leading-tight whitespace-normal">
                {imageData.label}
              </figcaption>
            </figure>
          </a>
        );
      })}
    </div>
  );
}

function NavItem(item: NavItemProps) {
  const { label, links, images } = item;
  return (
    <nav
      class="group flex items-center cursor-pointer px-0"
      style={{ height: navbarHeight }}
    >
      <div class="relative flex items-center pr-4">
        <Icon
          id="Bars3"
          size={22}
          strokeWidth={2}
          fill="none"
          class="absolute left-0 top-0 transition-opacity opacity-100 group-hover:opacity-0"
        />
        <Icon
          id="Close"
          size={22}
          fill="none"
          class="absolute left-0 top-0 transition-opacity opacity-0 group-hover:opacity-100"
        />
        <span class="ml-7 uppercase">
          {label}
        </span>
      </div>
      <div class="hidden group-hover:flex bg-base-100 z-50 items-start justify-between w-full border-b-2 border-base-200 flex-row-reverse pt-[55px] pb-14 top-full absolute left-0 shadow-menu">
        <div class="flex items-start justify-between flex-row w-full">
          <ul class="flex flex-1 items-start px-[15px] w-2/4 justify-start gap-8 flex-wrap xl:gap-16 2xl:gap-24">
            <RenderLinks links={links} />
          </ul>
          <RenderImages images={images} />
        </div>
      </div>
    </nav>
  );
}

export default NavItem;
