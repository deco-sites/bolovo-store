import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  // "release:desc": "Relevância - Decrescente",
  "discount:desc": "Maior desconto",
};

const SORT_QUERY_PARAM = "sort";

export const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM);
  }, []);

const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  urlSearchParams.set(SORT_QUERY_PARAM, value);
  urlSearchParams.delete('page');
  const newParamsString = urlSearchParams.toString();
  const newURL = window.location.pathname + (newParamsString ? `?${newParamsString}` : '');
  window.history.replaceState({}, '', newURL);
  window.location.reload();
};

function SortMenu({ sortOptions }: Props) {
  const sort = useSort();
  
  return (
    <ul
      class="absolute z-10 bg-white w-full flex flex-col outline-none focus:outline-none border-x border-black border-b rounded-b-xl text-center"
      role="listbox"
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-item-1"
    >
      {sortOptions.map(({ value, label }) => ({
        value,
        label: portugueseMappings[label as keyof typeof portugueseMappings] ??
          label,
      })).filter(({ label }) => label).map(({ value, label }, index) => (
        <li
          class={`cursor-pointer select-none relative flex justify-between py-[5px] items-center px-[11px] lg:(block p-0 border-0) ${index == sortOptions.length - 1 ? "": "border-b"}`}
          onClick={() => applySort(value)}
          role="option"
          aria-selected={value === sort}
          id={`listbox-item-${index}`}
        >
          <div class="flex items-center w-full">
            <span class="w-full  leading-0 text-[13px] font-light">
              {label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SortMenu;
