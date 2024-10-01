import Icon from "$store/components/ui/Icon.tsx";
import ValueItem from "$store/islands/ValueItem.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { FilterName } from "deco-sites/bolovo-store/components/search/SearchResult.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  filterColors: Color[];
  filterNames?: FilterName[];
  priceIntl?: boolean;
}

export type FilterToggleValueWithHex = FilterToggleValue & {
  hex?: string;
  src?: ImageWidget;
};

type FilterValuesProps = {
  label: string;
  values: FilterToggleValueWithHex[];
  filterColors?: Color[];
  priceIntl?: boolean;
};

export const isToggle = (
  filter: Filter,
): filter is FilterToggle & { newLabel: string } =>
  filter["@type"] === "FilterToggle";

function FilterValues(
  { label, values, filterColors, priceIntl }: FilterValuesProps,
) {
  const flexDirection = label === "cor"
    ? "flex flex-wrap overflow-hidden md:grid md:grid-cols-8 grid-cols-5 gap-[18px]"
    : label === "property2"
    ? "flex flex-wrap items-center flex-grow justify-between gap-y-1 pl-[9px] pr-[3px]"
    : "flex-col flex flex-wrap gap-2 pl-[9px] pr-[3px]";

  const matchingColors: FilterToggleValueWithHex[] = values?.map(
    (value) => {
      const matchedColor = filterColors?.find(
        (color) => color.label === value.value,
      );
      if (matchedColor) {
        return {
          ...value,
          hex: matchedColor.hex,
          src: matchedColor.src,
        };
      } else {
        return value;
      }
    },
  );

  const referenceOrder = filterColors?.reduce((acc, item, index) => {
    acc[item.label.toLowerCase()] = index;
    return acc;
  }, {} as Record<string, number>);
  if (referenceOrder) {
    matchingColors.sort((a, b) => {
      const orderA = referenceOrder[a.value.toLowerCase()];
      const orderB = referenceOrder[b.value.toLowerCase()];

      return (orderA ?? matchingColors.length) -
        (orderB ?? matchingColors.length);
    });
  }

  return (
    <ul class={`${flexDirection}`}>
      {matchingColors.map((item) => {
        const { hex, src } = item;
        if (label == "cor") {
          return (
            <ValueItem
              type={label}
              {...item}
              filterImage={src}
              colorHex={hex}
              class="w-[29px] h-[30px]"
            />
          );
        }
        if (label == "property2") {
          return (
            <ValueItem
              class="leading-[32.2px] mt-[1px]"
              type={label}
              {...item}
              priceIntl={priceIntl}
            />
          );
        }

        return <ValueItem type={label} {...item} />;
      })}
    </ul>
  );
}

function Filters(
  { filters, filterColors = [], filterNames = [], priceIntl = false }: Props,
) {
  const sortedFilters = filterNames.map((label) =>
    filters.find((filter) => filter.label === label.filter)
  ).filter(Boolean);

  const namedFilters = sortedFilters.map(
    (filter) => {
      const matchedName = filterNames?.find(
        (name) => name.filter === filter?.label,
      );
      if (matchedName) {
        return {
          ...filter,
          newLabel: matchedName.label,
        };
      } else {
        return filter;
      }
    },
  );

  return (
    <ul class="flex flex-col gap-[10px]">
      {(namedFilters as unknown as (Filter & { newLabel: string })[])
        .filter(isToggle)
        .map((filter, index) => (
          <>
            {filter.label === "cor" && index === 0
              ? (
                <li class="border-y border-opacity-30 border-[#121212] ml-[21px] mr-[15px]">
                  <div class="flex flex-col gap-[7px] mb-4 mt-4">
                    <span class="font-semibold text-[0.938rem] leading-[34.5px] uppercase">
                      {filter.newLabel ? filter.newLabel : filter.label}
                    </span>
                    <FilterValues {...filter} filterColors={filterColors} />
                  </div>
                </li>
              )
              : filter.label === "cor" && index !== 0
              ? (
                <li class="border-b border-opacity-30 border-[#121212] ml-[21px] mr-[15px]">
                  <div class="flex flex-col gap-[7px] mb-4 ">
                    <span class="font-semibold text-[0.938rem] leading-[34.5px] uppercase">
                      {filter.newLabel ? filter.newLabel : filter.label}
                    </span>
                    <FilterValues {...filter} filterColors={filterColors} />
                  </div>
                </li>
              )
              : (
                <div>
                  <div class="collapse items-start w-full mb-[10px]">
                    <input
                      type="checkbox"
                      id="toggle"
                      class="min-h-[34.5px] min-w-full"
                    />
                    <div class="collapse-title relative min-w-full flex font-semibold uppercase text-[0.938rem] leading-[34.5px] flex-grow w-full min-h-[34.5px] items-center pl-[21px] py-0">
                      {filter.newLabel ? filter.newLabel : filter.label}
                      <Icon
                        id="ChevronDown"
                        size={11}
                        strokeWidth={2}
                        fill="none"
                        class="absolute right-0 transition-transform duration-300 transform mr-[15px]"
                      />
                    </div>
                    <div class="collapse-content px-0 py-0">
                      <FilterValues {...filter} priceIntl={priceIntl} />
                    </div>
                  </div>
                  <div class="border-b border-opacity-30 border-[#121212] ml-[21px] mr-[15px]" />
                </div>
              )}
          </>
        ))}
    </ul>
  );
}

export default Filters;
