import { FilterToggleValueWithHex } from "$store/components/search/Filters.tsx";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import { ComponentChildren } from "preact";

export default function ValueItem({
  url,
  label,
  type,
  children,
  class: _class,
}: Omit<FilterToggleValueWithHex, "label"> & {
  label: string;
  type: string;
  children?: ComponentChildren;
  class?: string;
}) {
  const isSelected = selectedFilters.value.some((value) =>
    label === value.label
  );
  return (
    <div>
      {children
        ? (
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
              <span>{children}</span>
            </div>
          </button>
        )
        : (
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
                class={`${ label === "cor" && isSelected ? "border border-black":
                  isSelected ? "bg-black rounded-[20px] text-white px-3" : ""
                }  flex items-center gap-2.5 font-normal uppercase`}
              >
                {label}
              </span>
            </div>
          </button>
        )}
    </div>
  );
}
