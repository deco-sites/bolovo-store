import Image from "apps/website/components/Image.tsx";
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
}

function RenderLinks(links: Links[] | undefined, isChild = false) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <>
      {links.map((link) => (
        <ul>
          <a
            class={`text-base ${
              isChild ? "font-normal" : "font-semibold"
            } leading-9 whitespace-nowrap`}
            href={link.href}
          >
            {link.label}
          </a>
          <li class="flex flex-col">
            {RenderLinks(link.children, true)}
          </li>
        </ul>
      ))}
    </>
  );
}

function RenderImages(images: Image[] | undefined) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div class="flex items-start gap-x-[30px] justify-center px-2">
      {images.map((imageData) => (
        <figure class="flex flex-col items-center w-[80.65%] gap-y-[15px]">
          <Image
            src={imageData.image}
            alt={imageData.alternateName}
            width={242}
            height={242}
            loading="lazy"
          />
          <figcaption class="text-center text-base font-semibold leading-tight whitespace-normal">
            {imageData.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function NavItem(item: NavItemProps) {
  const { label, links, images } = item;
  return (
    <nav class="group flex items-center">
      <span class="group-hover:underline">{label}</span>
      <div class="hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center border-t border-b-2 border-base-200 w-screen flex-row-reverse pt-[55px] pb-14 top-full absolute left-0">
        <div class="flex items-start gap-x-[141px] xl:flex-row flex-col-reverse">
          <ul class="flex flex-1 items-start gap-x-[79px] px-2 w-full justify-between">
            {RenderLinks(links)}
          </ul>
          {RenderImages(images)}
        </div>
      </div>
    </nav>
  );
}

export default NavItem;
