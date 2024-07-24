import Icon from "$store/components/ui/Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { NavItemProps } from "./NavItem.tsx";
import Image from "apps/website/components/Image.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { lazy } from "preact/compat";
import type { Country } from "$store/components/header/Header.tsx";
import LanguageSwitcher from "$store/components/header/Buttons/Language.tsx";
import Social from "../footer/Social.tsx";
import type { SocialItem } from "../footer/Social.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { ContentBlogItem } from "./ContentItem.tsx";
import ContentBlog from "./ContentItem.tsx";

const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  items: NavItemProps[];
  contentItem: ContentBlogItem;
  logo?: {
    image: ImageWidget;
    alt: string;
  };
  searchBar?: SearchbarProps;
  accountText: string;
  accountHref: string;
  countryFlag: Country[];
  social: SocialItem[];
}

function ContentItem({ item }: { item: ContentBlogItem }) {
  return (
    <div class="collapse items-start w-full">
      <input type="checkbox" id="toggle" class="min-h-[40px] min-w-full" />
      <div class="collapse-title relative min-w-full flex after:font-light flex-grow leading-0 w-full min-h-[40px] items-center px-0 py-0 uppercase">
        {item.label}
        <Icon
          id="ChevronDown"
          size={11}
          strokeWidth={2}
          fill="none"
          class="absolute right-0 transition-transform duration-300 transform"
        />
      </div>
      <div class="collapse-content">
        <ul>
          <ul>
            {item.linksContent.map((
              link,
            ) => (
              <div>
                <ul>
                  <li class=" uppercase text-base py-2">
                    <a href={link.link}>
                      {link.title}
                    </a>
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}
function MenuItem({ item }: { item: NavItemProps }) {
  return (
    <div class="collapse items-start w-full">
      <input type="checkbox" id="toggle" class="min-h-[40px] min-w-full" />
      <div class="collapse-title relative min-w-full flex after:font-light flex-grow leading-0 w-full min-h-[40px] items-center px-0 py-0">
        {item.label}
        <Icon
          id="ChevronDown"
          size={11}
          strokeWidth={2}
          fill="none"
          class="absolute right-0 transition-transform duration-300 transform"
        />
      </div>
      <div class="collapse-content">
        <ul>
          <ul>
            {item?.links?.map((
              link,
            ) => (
              <div>
                <ul>
                  <li class="font-semibold text-base py-2">
                    <a href={link.href}>{link.label}</a>
                  </li>
                  {link.children?.map((item) => (
                    <li class="py-2">
                      <a target={item.newTab ? "_blank" : ""} href={item.href}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}

function Menu(
  {
    items,
    contentItem,
    logo,
    searchBar,
    countryFlag,
    accountText,
    social,
    accountHref,
  }: Props,
) {
  const { displayMenu } = useUI();
  const contentSocial = {
    title: "",
    items: social,
  };

  return (
    <div
      class="flex flex-col w-full h-full p-[25px]"
      style={{ minWidth: "calc(min(90vw, 425px))" }}
    >
      <div class="items-center justify-between w-full flex flex-row flex-grow">
        <Image
          src={logo?.image ?? ""}
          alt={logo?.alt}
          loading="lazy"
          width={134}
          height={40}
        />
        <Button
          class="btn btn-ghost hover:bg-transparent disabled:bg-transparent p-0"
          onClick={() => displayMenu.value = false}
        >
          <Icon id="XMark" size={23} strokeWidth={2} class="text-[#121212]" />
        </Button>
      </div>
      <div class="ease-in-out duration-300 relative overflow-hidden mt-11">
        <div class="relative border-b border-black bg-white w-full">
          <Searchbar {...searchBar} />
        </div>
      </div>
      <ul class="flex-grow flex flex-col w-full py-4">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
        <li>
          <ContentItem item={contentItem} />
        </li>
      </ul>
      <div class="flex flex-col py-2 border-y border-black">
        <span class="py-8 block w-full">
          <div>
            <a
              class="btn btn-square w-auto justify-start btn-sm btn-ghost hover:bg-transparent flex flex-row"
              href={accountHref}
              aria-label="Log in"
            >
              <Icon id="User" width={20} height={21} strokeWidth={0.4} />
              <span class="font-normal text-[0.938rem]">{accountText}</span>
            </a>
          </div>
          <div class="w-full">
            <LanguageSwitcher countryFlag={countryFlag} class="w-full" />
          </div>
        </span>
      </div>
      <div class="opacity-30 flex justify-start pt-11 w-full">
        <Social content={contentSocial} />
      </div>
    </div>
  );
}

export default Menu;
