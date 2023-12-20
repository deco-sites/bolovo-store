/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCard from "$store/components/product/ProductCard.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useSuggestions } from "$store/sdk/useSuggestions.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";


// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
 * @title Icon of Search
 */
  iconSearch: {
    src: ImageWidget;
    alt: string;
  }
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  isSubmit?: boolean;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  iconSearch,
  isSubmit = true
}: Props) {
  const id = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);


  return (
    <div class="w-full">
      <div class="w-full hidden lg:grid gap-8">
        <form
          id={id}
          action={action}
          class="join h-[30px] justify-cente items-center rounded-none"
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class=" px-2 join-item outline-0 flex-grow border-none h-auto font-normal"
            name={name}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          {isSubmit ?
            <Button
              type="submit"
              class=" btn-sm btn-ghost z-10 flex justify-center items-center pr-0 md:pr-3"
              aria-label="search icon button"
            >
              <Image src={iconSearch.src} alt={iconSearch.alt} width={19} height={19} loading={"eager"} />
            </Button>
            :
            <Button
              type="button"
              class=" btn-sm btn-ghost z-10 flex justify-center items-center pr-0 md:pr-3"
              aria-label="search icon button"
              onClick={() => {
                displaySearchDrawer.value = false;
                displaySearchPopup.value = false;
              }}
            >
              <Icon id="Close" size={24} />
            </Button>

          }
        </form>
      </div>
      <div class="w-full lg:hidden grid gap-8">
        <form
          id={id}
          action={action}
          class="join h-[30px] justify-cente items-center rounded-none border-b border-black"
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class=" join-item outline-0 flex-grow border-none h-auto font-normal"
            name={name}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />

          {isSubmit ?
            <Button
              type="submit"
              class=" btn-sm btn-ghost z-10 flex justify-center items-center pr-0 md:pr-3"
              aria-label="search icon button"
            >
              <Image src={iconSearch.src} alt={iconSearch.alt} width={19} height={19} loading={"eager"} />
            </Button>
            :
            <Button
              type="button"
              class=" btn-sm btn-ghost z-10 flex justify-center items-center pr-0 md:pr-3"
              aria-label="search icon button"
              onClick={() => {
                displaySearchDrawer.value = false;
                displaySearchPopup.value = false;
              }}
            >
              <Icon id="Close" size={24} />
            </Button>

          }
        </form>
      </div>
    </div>
  );
}

export default Searchbar;
