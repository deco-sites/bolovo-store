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

  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;

  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  loader,
  platform,
  iconSearch,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setQuery, payload, loading } = useSuggestions(loader);
  const { products = [], searches = [] } = payload.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    if (displaySearchPopup.value === true) {
      searchInputRef.current?.focus();
    }
  }, [displaySearchPopup.value]);


  return (
    <div class="w-full grid gap-8 ">
      <form
        id={id}
        action={action}
        class="join h-[30px] justify-cente items-center rounded-none"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class=" px-2 join-item outline-0 flex-grow border-none h-auto"
          name={name}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }

            setQuery(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <Button
          type="submit"
          class="btn-circle btn-sm btn-ghost z-10 flex justify-center items-center "
          aria-label="search icon button"
        >
          <Image src={iconSearch.src} alt={iconSearch.alt} width={16} height={24} />
        </Button>
      </form>

      <div
        class={`overflow-y-scroll ${!hasProducts && !hasTerms ? "hidden" : ""}`}
      >
        <div class="gap-4 grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
          <div class="flex flex-col gap-6">
            <span
              class="font-medium text-xl"
              role="heading"
              aria-level={3}
            >
              Sugestões
            </span>
            <ul id="search-suggestion" class="flex flex-col gap-6">
              {console.log("bolovo:", products)}
              {searches.map(({ term }) => (
                <li>
                  <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                    <span>
                      <Icon
                        id="MagnifyingGlass"
                        size={24}
                        strokeWidth={0.01}
                      />
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: term }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
            <span
              class="font-medium text-xl"
              role="heading"
              aria-level={3}
            >
              Produtos sugeridos
            </span>
            <Slider class="carousel">

              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                >
                  <ProductCard
                    product={product}
                    platform={platform}
                    index={index}
                  />
                </Slider.Item>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
