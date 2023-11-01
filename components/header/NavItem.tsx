import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { headerHeight } from "./constants.ts";

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

function renderLinks(links: Links[] | undefined, isChild = false) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <>
      {links.map((link) => (
        <ul>
          <a
            class={`text-base ${isChild ? 'font-normal' : 'font-semibold'} leading-9 whitespace-nowrap`}
            href={link.href}
          >
            {link.label}
          </a>
          <li class="flex flex-col">
            {renderLinks(link.children, true)}
          </li>
        </ul>
      ))}
    </>
  );
}

function renderImages(images: Image[] | undefined) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div class="flex items-start gap-x-[30px] flex-wrap justify-center">
      {images.map((imageData) => (
        <figure class="flex flex-col items-center max-w-[242px] gap-y-[15px]">
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
      <div
        class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center border-t border-b-2 border-base-200 w-screen flex-row-reverse pt-[55px] pb-14 top-0 left-0"
        style={{ marginTop: headerHeight }}
      >
        <div class="flex items-start gap-x-[140px] xl:flex-row flex-col-reverse">
          <ul class="flex flex-1 items-start gap-x-[79px] mx-auto">
            {renderLinks(links)}
          </ul>
          {renderImages(images)}
        </div>
      </div>
    </nav>
  );
}

export default NavItem;
