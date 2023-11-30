import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx"
import type { MiniCartProps } from  '$store/components/minicart/vnda/Cart.tsx'
import { Props as AlertProps } from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";


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

    }
  }

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };

  /** @title MiniCart */
  miniCart?: MiniCartProps
}

function Header({
  promotionBar,
  searchbar,
  navItems,
  logo,
  buttonSearch,
  miniCart,
}: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <>
    <header style={{ height: headerHeight }}>
      <Drawers
        menu={{ items }}
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
          />
        </div>
      </Drawers>
    </header>
  </>
  );
}

export default Header;
