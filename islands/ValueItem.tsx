import { FilterToggleValueWithHex } from "$store/components/search/Filters.tsx";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export default function ValueItem({
  url,
  label,
  type,
  filterImage,
  colorHex,
  priceIntl,
  class: _class,
}: Omit<FilterToggleValueWithHex, "label"> & {
  label: string;
  type: string;
  colorHex?: string;
  filterImage?: ImageWidget;
  class?: string;
  priceIntl?: boolean;
}) {
  const isSelected = selectedFilters.value.some(
    (value) => label === value.label,
  );
  if (type === "cor") {
    return (
      <button
        onClick={() => {
          const selected = selectedFilters.peek();
          const filters = selected.some((filter) => filter.label == label)
            ? selected.filter((filter) => filter.label != label)
            : selected.concat({
              type,
              url,
              label,
            });
          selectedFilters.value = filters;
        }}
        class={_class}
      >
        <div>
          {filterImage
            ? (
              <img
                src={filterImage}
                class={`w-[29px] h-[30px] ${
                  isSelected ? "border-[1.5px] border-black" : ""
                }`}
              />
            )
            : (
              <div
                style={{ backgroundColor: colorHex }}
                class={`w-[29px] h-[30px] ${
                  isSelected ? "border-[1.5px] border-black" : ""
                }`}
              />
            )}
        </div>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => {
          const selected = selectedFilters.peek();
          const filters = selected.some((filter) => filter.label == label)
            ? selected.filter((filter) => filter.label != label)
            : selected.concat({
              type,
              url,
              label,
            });
          selectedFilters.value = filters;
        }}
        class={_class}
      >
        <div class="flex items-center">
          <span
            class={`${
              isSelected ? "bg-primary rounded-[20px] text-white " : ""
            } ${
              type === "property2" ? "px-3" : "px-[10px]"
            } flex items-center font-normal uppercase`}
          >
            {type !== "property2"
              ? label
              : priceIntl
              ? label.substring(4).replace("|", "")
              : label.substring(0, 2)}
          </span>
        </div>
      </button>
    );
  }
}
