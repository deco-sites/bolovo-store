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
import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "std/http/cookie.ts";
import { useUI } from "../../sdk/useUI.ts";
import { AppContext } from "apps/vnda/mod.ts";
import { type SectionProps } from "@deco/deco";
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
  logo?: {
    src: ImageWidget;
    alt: string;
  };
  /** @title MiniCart */
  miniCart?: MiniCartProps;
  /**
   * @title Menu Item Help
   */
  helpItem: {
    text: string;
    href: string;
  };
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
  showLanguageVariant?: boolean;
}
function Header(props: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const { activePriceIntl } = useUI();
  const {
    menu,
    searchbar,
    miniCart,
    promotionBar,
    logo,
    buttonSearch,
    helpItem,
    countryFlag,
    accountHref,
    showLanguageVariant,
    device,
  } = props;
  const items = menu.items ?? [];
  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={menu}
          miniCart={miniCart}
          platform={platform}
          priceIntl={activePriceIntl.value.active}
        >
          <div class="bg-white fixed w-full z-50">
            <Alert {...promotionBar} />
            <Navbar
              items={items}
              contentItem={menu.contentItem}
              searchbar={searchbar && { ...searchbar }}
              logo={logo}
              label={buttonSearch.label}
              img={buttonSearch.img}
              helpItem={helpItem}
              countryFlag={countryFlag}
              showLanguageVariant={showLanguageVariant ?? false}
              accountHref={accountHref}
              device={device}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}
export default Header;
export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const { activePriceIntl } = useUI();
  const cookies = getCookies(req.headers);
  if (cookies.language === "en") {
    activePriceIntl.value.active = true;
    activePriceIntl.value.value = cookies.language;
    const headers = new Headers();
    const cookie: Cookie = {
      name: "language",
      value: "en",
      path: "/",
      maxAge: 3600,
      secure: true,
      httpOnly: true,
      sameSite: "Lax",
    };
    setCookie(headers, cookie);
  } else {
    activePriceIntl.value.active = false;
    activePriceIntl.value.value = cookies.language;
    const headers = new Headers();
    deleteCookie(headers, "language");
  }
  return { ...props, device: ctx.device };
};
