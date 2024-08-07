import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import LanguageSwitcher from "$store/islands/Header/ButtonLanguage.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import DrawerSearch from "$store/islands/Header/DrawerSearch.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Device } from "deco/utils/userAgent.ts";
import type { ContentBlogItem } from "./ContentItem.tsx";
import ContentItem from "./ContentItem.tsx";
import type { Country } from "./Header.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { lazy } from "preact/compat";
import Image from "apps/website/components/Image.tsx";

const Searchbar = lazy(() => import("$store/islands/Header/Searchbar.tsx"));

function Navbar(
  {
    items,
    contentItem,
    searchbar,
    logo,
    helpItem,
    countryFlag,
    showLanguageVariant,
    label,
    img,
    accountHref,
    device,
  }: {
    items: NavItemProps[];
    contentItem: ContentBlogItem;
    searchbar?: SearchbarProps;
    logo?: { src: string; alt: string };
    helpItem: { text: string; href: string };
    accountHref: string;
    countryFlag: Country[];
    img: {
      src: string;
      alt: string;
    };
    label: string;
    showLanguageVariant: boolean;
    device: Device;
  },
) {
  const platform = usePlatform();

  if (device === "desktop") {
    return (
      <div class="flex flex-row justify-between items-center w-full px-[15px] shadow-sm shadow-gray-300">
        <div class="flex items-center px-0 w-2/6">
          {items.map((item) => <NavItem {...item} />)}
          <ContentItem item={contentItem} />
        </div>
        <div class="flex-auto flex justify-center w-2/6">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block"
            >
              <Image
                src={logo?.src ?? ""}
                alt={logo?.alt}
                class="w-[120px]"
                width={310}
                height={68}
              />
            </a>
          )}
        </div>
        <div class="flex-none flex items-center justify-end gap-1 pr-0 min-w-[33%] w-auto">
          <SearchButton label={label} img={img} />
          <Searchbar searchbar={searchbar} />
          {showLanguageVariant && (
            <LanguageSwitcher countryFlag={countryFlag} class="w-auto" />
          )}
          {helpItem && (
            <a
              class="btn btn-sm btn-ghost px-2 hover:bg-transparent font-normal text-base uppercase"
              href={helpItem.href}
              aria-label="Help"
            >
              {helpItem.text}
            </a>
          )}
          <a
            class="btn btn-circle px-2 w-auto btn-sm btn-ghost hover:bg-transparent"
            href={accountHref}
            aria-label="Log in"
          >
            <Icon id="User" width={18} height={18} strokeWidth={0.4} />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ height: navbarHeight }}
      class="flex flex-row items-center border-b border-base-200 w-screen justify-between px-[15px] md:pl-2  relative"
    >
      <MenuButton />
      {logo && (
        <a
          href="/"
          class="inline-flex items-center justify-center ml-14"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Image
            src={logo?.src ?? ""}
            alt={logo?.alt}
            class="w-[115px]"
            width={310}
            height={68}
          />
        </a>
      )}
      <div class="flex items-center gap-[7px] ">
        <span class="mr-1 mt-[2px]">
          <DrawerSearch searchbar={searchbar} />
          <SearchButton label={label} img={img} />
        </span>
        <a
          class="btn btn-circle w-auto btn-sm btn-ghost hover:bg-transparent"
          href={accountHref}
          aria-label="Log in"
        >
          <Icon id="User" size={21} strokeWidth={0.4} />
        </a>
        {platform === "vtex" && <CartButtonVTEX />}
        {platform === "vnda" && <CartButtonVDNA />}
      </div>
    </div>
  );
}

export default Navbar;
