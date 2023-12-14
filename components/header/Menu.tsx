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

const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  items: NavItemProps[];
  logo?: {
    image: ImageWidget;
    alt: string;
  };
  searchBar?: SearchbarProps;
  loginText: string;
  countryFlag: Country[];
  social: SocialItem[];
}

function MenuItem({ items }: { items: NavItemProps[] | NavItemProps }) {
  if (Array.isArray(items)) {
    return (
      <ul>
        {items.map((menu) => (
          <li>
            <MenuItem items={menu} />
          </li>
        ))}
      </ul>
    );
  } else {
    return (
      <div class="collapse collapse-arrow py-8">
        <input type="checkbox" />
        <div class="collapse-title px-0 coll">{items.label}</div>
        <div class="collapse-content">
          <ul>
            <li>
              <a class="underline text-sm" href={items.links?.[0]?.href}>
                Ver todos
              </a>
            </li>
            {items.images?.map((menu) => (
              <li>
                <MenuItem items={menu} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function Menu(
  { items, logo, searchBar, countryFlag, loginText, social }: Props,
) {
  console.log(countryFlag);
  const { displayMenu } = useUI();
  const contentSocial = {
    title: "",
    items: social,
  };

  return (
    <div class="flex flex-col w-full h-full p-[25px]">
      <div class="items-center justify-between w-full flex flex-row flex-grow">
        <Image
          src={logo?.image ?? ""}
          alt={logo?.alt}
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
        <div class="relative border-b border-black bg-white">
          <Searchbar {...searchBar} />
        </div>
      </div>
      <ul class="flex-grow flex flex-col divide-y divide-base-200 ">
        {items.map((item) => (
          <li>
            <MenuItem items={item} />
          </li>
        ))}
      </ul>

      <div class="flex flex-col py-2 border-y border-black">
        <span class="py-8 block">
          <div>
            <a
              class="btn btn-square w-auto justify-start btn-sm btn-ghost hover:bg-transparent flex flex-row"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" width={20} height={21} strokeWidth={0.4} />
              <span class="font-normal text-[15px]">{loginText}</span>
            </a>
          </div>
          <div class="w-full">
            <LanguageSwitcher countryFlag={countryFlag} />
          </div>
        </span>
      </div>
      <div class="opacity-30 flex justify-start pt-11">
        <Social content={contentSocial} />
      </div>
    </div>
  );
}

export default Menu;
