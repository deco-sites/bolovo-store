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
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo, blogItem, helpItem, countryFlag }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  blogItem: { text: string; href: string };
  helpItem: { text: string; href: string };
  countryFlag: "World" | "Brazil" | "Spain" | "US";
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={145} height={43} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center w-full px-2">
        <div class="flex items-center">
          {items.map((item) => <NavItem item={item} />)}
          {blogItem && (
            <a class="text-base font-bold uppercase text-Rubik" href={blogItem.href}>{blogItem.text}</a>
          )}
        </div>
        <div class="flex-auto flex justify-center w-44">
          {logo && (
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[160px]"
            >
              <Image src={logo.src} alt={logo.alt} width={145} height={43} />
            </a>
          )}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2 pr-0">
          <SearchButton />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-sm btn-ghost hover:bg-transparent flex justify-center items-center text-base font-bold uppercase"
            href="/"
            aria-label="Country Flag"
          >
            <Icon
              id={countryFlag}
              size={19}
              strokeWidth={2}
              fill="none"
            />
            Brasil
            <Icon
              id="ChevronDown"
              size={11}
              strokeWidth={2}
              fill="none"
            />
          </a>
          {helpItem && (
            <a
              class="btn btn-sm btn-ghost hover:bg-transparent text-base font-bold uppercase"
              href={helpItem.href}
              aria-label="Help"
            >
              {helpItem.text}
            </a>
          )}
          <a
            class="btn btn-circle btn-sm btn-ghost hover:bg-transparent"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={0.4} />
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
