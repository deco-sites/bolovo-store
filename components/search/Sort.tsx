import { useEffect, useRef, useState } from "preact/hooks";
import SortMenu from "./SortMenu.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx"

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sortContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sortContainerRef.current &&
        event.target instanceof Node &&
        !sortContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, {
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortContainerRef]);

  return (
    <div class="relative z-20 w-full sm:w-auto" ref={sortContainerRef}>
      <button
        class={`appearance-none py-[5px] w-full bg-white border-b-1 border-gray-light-footer focus:outline-none outline-none transition duration-150 ease-in-out flex justify-between items-center ${
          isOpen ? "border border-black rounded-t-lg" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span class="text-[13px] leading-0 flex px-[11px]">
          <span class="w-[19px] h-[10px] flex flex-col mr-[6px] mt-1">
            <Icon id="FilterArrowLeft" />
            <Icon id="FilterArrowRight" />
          </span>
          ORDENAR
        </span>
      </button>
      {isOpen && <SortMenu sortOptions={sortOptions} />}
    </div>
  );
}

export default Sort;
