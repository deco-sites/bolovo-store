import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import LanguageSwitcher from "./Buttons/Language.tsx";
import type { Country } from "./Header.tsx";

function Navbar(
  {
    items,
    searchbar,
    logo,
    blogItem,
    helpItem,
    countryFlag,
    label,
    img,
    accountHref,
  }: {
    items: NavItemProps[];
    searchbar?: SearchbarProps;
    logo?: { src: string; alt: string };
    blogItem: { text: string; href: string };
    helpItem: { text: string; href: string };
    accountHref: string;
    countryFlag: Country[];
  },
) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row items-center border-b border-base-200 w-full justify-between px-[15px] md:pl-2 md:pr-6 relative"
      >
        <MenuButton />
        {logo && (
          <a
            href="/"
            class="inline-flex items-center justify-center ml-14"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={134} height={40} />
          </a>
        )}
        <div class="flex items-center gap-[7px]">
          <span class="mr-1 mt-[2px]">
            <SearchButton label={label} img={img} />
          </span>
          <Icon id="User" size={21} />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center w-full px-[15px] pr-8 shadow-sm shadow-gray-300">
        <div class="flex items-center px-0 w-2/6">
          {items.map((item) => <NavItem {...item} />)}
          {blogItem && (
            <a class="text-base uppercase text-Rubik" href={blogItem.href}>
              {blogItem.text}
            </a>
          )}
        </div>
        <div class="flex-auto flex justify-center w-2/6">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block w-[145px]"
            >
              <Image src={logo.src} alt={logo.alt} width={145} height={43} />
            </a>
          )}
        </div>
        <div class="flex-none flex items-center justify-end gap-1 pr-0 min-w-[33%] w-auto">
          <SearchButton label={label} img={img} />
          <Searchbar searchbar={searchbar} />
          <LanguageSwitcher countryFlag={countryFlag} />
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
            <Icon id="User" width={20} height={24} strokeWidth={0.4} />
          </a>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
        </div>
      </div>
    </>
  );
}

export default Navbar;
