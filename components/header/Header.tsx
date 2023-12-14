import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Alert from "$store/islands/Alert.tsx";
import type { MiniCartProps } from "$store/components/minicart/vnda/Cart.tsx";
import { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface Country {
  countryLabel: string;
  languageAbbreviation: string;
  countryImg: {
    img: ImageWidget;
    alt: string;
  };
}

export interface Props {
  promotionBar?: AlertProps;

  /**
   * @title Button Search
   */
  buttonSearch: {
    /**
     * @title Text of Button
     */
    label: string;
    /**
     * @title Icon of Buttton
     */
    img: {
      src: ImageWidget;
      alt: string;
    };
  };

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Menu
   * @description Navigation items used both on mobile and desktop menus and menu props
   */
  menu: MenuProps;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  /** @title MiniCart */
  miniCart?: MiniCartProps;

  /**
   * @title Menu Item Blog
   */
  blogItem: { text: string; href: string };

  /**
   * @title Menu Item Help
   */
  helpItem: { text: string; href: string };

  /**
   * @title Href icon my account
   */
  accountHref: string;

  /**
   * @title Flag Icon
   * @Description Internationalization Menu Flag Icon
   */
  /** @title Country Flag */
  countryFlag: Country[];
}

function Header({
  promotionBar,
  searchbar,
  menu,
  logo,
  buttonSearch,
  miniCart,
  blogItem,
  helpItem,
  accountHref,
  countryFlag,
}: Props) {
  const platform = usePlatform();
  const items = menu.items ?? [];

  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={menu}
          searchbar={searchbar}
          miniCart={miniCart}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-50">
            <Alert {...promotionBar} />
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              label={buttonSearch.label}
              img={buttonSearch.img}
              blogItem={blogItem}
              helpItem={helpItem}
              countryFlag={countryFlag}
              accountHref={accountHref}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
