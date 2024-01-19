import { FilterToggleValueWithHex } from "$store/components/search/Filters.tsx";
import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export default function ValueItem({
  url,
  label,
  type,
  filterImage,
  colorHex,
  class: _class,
}: Omit<FilterToggleValueWithHex, "label"> & {
  label: string;
  type: string;
  colorHex?: string
  filterImage?: ImageWidget
  class?: string;
}) {
  const isSelected = selectedFilters.value.some((value) =>
    label === value.label
  );
  if(type === "cor"){
    return <button
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
    <div class={`${isSelected ? "border-[1.5px] border-black" : ""}`}>
      {filterImage ? <img src={filterImage} class="w-[29px] h-[30px]" /> :  
        <div
          style={{backgroundColor: colorHex}}
          class={`w-[29px] h-[30px]`}
        />}
    </div>
  </button>
  }else{
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
        selectedFilters.value = filters}}
        class={_class}
        >
          <div class="flex items-center">
            <span
              class={`${isSelected ? "bg-black rounded-[20px] text-white px-3" : ""}  flex items-center gap-2.5 font-normal uppercase`}
            >
              {label}
            </span>
        </div>
      </button>
    );
  }
}
