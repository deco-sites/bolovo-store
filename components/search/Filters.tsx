import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] == "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <span class="text-sm text-[#121212] font-normal leading-8 uppercase">{label}</span>
    </a>
  );
}

function FilterValues({ label, values }: FilterToggle) {
  const flexDirection = label == "cor"
    ? "grid grid-cols-8 gap-[18px]"
    : label == "property2" ? "flex-row flex flex-wrap" : "flex-col flex flex-wrap";
  return (
    <ul class={`gap-2  ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (label == "cor") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "color"}
              />
            </a>
          );
        }
        if (label == "property2") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "size"}
              />
            </a>
          );
        }

        if (label == "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const filtersOrder = ["cor", "property2", "categoria"];
  const sortedFilters = filtersOrder.map((label) =>
    filters.find((filter) => filter.label === label)
  ).filter(Boolean);
  console.log(filters);
  return (
    <ul class="flex flex-col gap-4 p-4">
      {sortedFilters
        .filter(isToggle)
        .map((filter) => (
          <>
            {filter.label == "cor"
              ? (
                <li class="flex flex-col gap-4">
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
