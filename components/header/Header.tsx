import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { NavItemProps } from "./NavItem.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Country {
  countryLabel: string,
  languageAbbreviation: string,
  countryImg: {
    img: ImageWidget,
    alt: string,
  }
}

export interface Props {
  alerts: string[];

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItemProps[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  /** 
* @title Menu Item Blog
*/
  blogItem: { text: string; href: string };

  /** 
  * @title Menu Item Help
  */
  helpItem: { text: string; href: string };

  /** 
* @title Flag Icon
* @Description Internationalization Menu Flag Icon
*/
  /** @title Country Flag */
  countryFlag: Country[]
}

function Header({
  alerts,
  searchbar,
  navItems,
  logo,
  blogItem,
  helpItem,
  countryFlag
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items }}
          searchbar={searchbar}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Alert alerts={alerts} />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              blogItem={blogItem}
              helpItem={helpItem}
              countryFlag={countryFlag}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
