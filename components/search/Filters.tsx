import { Color } from "$store/components/search/SearchResult.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import ValueItem from "$store/islands/ValueItem.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  filterColors: Color[];
}

export type FilterToggleValueWithHex = FilterToggleValue & {
  hex?: string;
};

type FilterValuesProps = {
  label: string;
  values: FilterToggleValueWithHex[];
  filterColors?: Color[];
};

function removeDuplicates(array: FilterToggleValueWithHex[]) {
  const result: FilterToggleValueWithHex[] = [];
  array.forEach((current) => {
    const format = current.label.trim().toLowerCase();
    const jáExiste = result.some((exist) => {
      const rótuloExistenteFormatado = exist.label.trim()
        .toLowerCase();
      return rótuloExistenteFormatado == format;
    });

    if (!jáExiste) {
      result.push(current);
    }
  });

  return result;
}

export const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] == "FilterToggle";

function FilterValues({ label, values, filterColors }: FilterValuesProps) {
  const unduplicatedValues = removeDuplicates(values);

  const flexDirection = label == "cor"
    ? "grid grid-cols-8 gap-[18px]"
    : label == "property2"
    ? "flex flex-wrap gap-2 flex-grow"
    : "flex-col flex flex-wrap gap-2 ";

  const matchingColors: FilterToggleValueWithHex[] = values?.map(
    (value) => {
      const matchedColor = filterColors?.find(
        (color) => color.label === value.label,
      );
      if (matchedColor) {
        return {
          ...value,
          hex: matchedColor.hex,
        };
      } else {
        return value;
      }
    },
  );
  return (
    <ul class={`${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (label == "cor" && matchingColors) {
          return (
            <ValueItem
              type={label}
              {...item}
              children={
                <Avatar
                  content={value}
                  variant={selected ? "active" : "color"}
                />
              }
            />
          );
        }
        if (label == "property2") {
          return (
            <ValueItem
              type={label}
              {...item}
            />
          );
        }

        return <ValueItem type={label} {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const filtersOrder = ["cor", "property2", "categoria"];
  const sortedFilters = filtersOrder.map((label) =>
    filters.find((filter) => filter.label === label)
  ).filter(Boolean);

  return (
    <ul class="flex flex-col gap-4 pl-[21px] pr-[15px]">
      {sortedFilters
        .filter(isToggle)
        .map((filter) => (
          <>
            {filter.label == "cor"
              ? (
                <li class="flex flex-col gap-4 mb-4 mt-2">
                  <span class="font-semibold text-[15px] leading-9 uppercase">
                    {filter.label}
                  </span>
                  <FilterValues {...filter} />
                </li>
              )
              : (
                <div>
                  <div class="border-b border-opacity-30 border-[#121212]" />
                  <div class="collapse items-start w-full mt-4">
                    <input
                      type="checkbox"
                      id="toggle"
                      class="min-h-[40px] min-w-full"
                    />
                    <div class="collapse-title relative min-w-full flex font-semibold uppercase text-[15px] leading-9 flex-grow w-full min-h-[40px] items-center px-0 py-0">
                      {filter.label}
                      <Icon
                        id="ChevronDown"
                        size={11}
                        strokeWidth={2}
                        fill="none"
                        class="absolute right-0 transition-transform duration-300 transform"
                      />
                    </div>
                    <div class="collapse-content px-0">
                      <FilterValues {...filter} />
                    </div>
                  </div>
                </div>
              )}
          </>
        ))}
    </ul>
  );
}

export default Filters;
