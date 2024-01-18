import { isToggle } from "$store/components/search/Filters.tsx";
import type { Filter } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export interface Props {
  filters: Filter[];
  class?: string;
}

type SelectedFilter = { url: string; label: string; type: string };

export const selectedFilters = signal<SelectedFilter[]>([]);

function SelectedFilters({ filters, class: _class = "" }: Props) {
  const selected = filters.reduce<SelectedFilter[]>((acc, filter) => {
    if (!isToggle(filter)) return acc;

    return [
      ...acc,
      ...filter.values.filter((value) => value.selected).map((value) => ({
        url: value.url,
        label: value.label,
        type: filter.label,
      })),
    ];
  }, []);

  useEffect(
    () => {
      selectedFilters.value = selected;
    },
    [],
  );

  return (
    <ul class="flex flex-wrap gap-[7px] items-center pl-[21px] pr-[15px] pt-5">
      {selectedFilters.value.map((item) => (
        <li class="border border-black rounded-[20px] items-center">
          <div class="flex flex-row">
            <span class="items-center pl-3 mt-[2px] mr-[5px] capitalize">
              {item.label}
            </span>
            <button
              id="remove-filter"
              class="ml-[5px] bg-black rounded-full block p-[7px]"
              key={item.label}
              onClick={() => {
                selectedFilters.value = selectedFilters.peek().filter((
                  filter,
                ) => filter.label != item.label);
              }}
            >
              <Icon
                id="XMark"
                size={15}
                strokeWidth={2}
                class="text-white"
              />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SelectedFilters;
