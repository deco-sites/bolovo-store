import { useEffect, useRef, useState } from "preact/hooks";
import SortMenu from "./SortMenu.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "site/components/ui/Button.tsx";

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort(
  { sortOptions, priceIntl, label }: Omit<Props, "page"> & {
    priceIntl: boolean;
    label: string;
  },
) {
  const sortContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      event.preventDefault();
      if (
        sortContainerRef.current &&
        event.target instanceof Node &&
        !sortContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortContainerRef]);

  return (
    <div
      class="relative z-20 w-auto mb-[0.35rem] lg:mb-1"
      ref={sortContainerRef}
    >
      <Button
        class={`btn-ghost btn-xs text-[0.813rem] px-2 py-[5px] font-light uppercase leading-0 hover:bg-transparent ${
          isOpen
            ? "border rounded-b-none border-black rounded-t-lg hover:border hover:border-black"
            : "hover:border hover:border-black rounded-[20px]"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span class="text-[0.813rem] leading-0 flex items-center">
          <span class="w-[19px] h-[10px] flex flex-col mr-[6px] ">
            <Icon id="FilterArrowLeft" />
            <Icon id="FilterArrowRight" />
          </span>
          {label}
        </span>
      </Button>
      {isOpen && <SortMenu sortOptions={sortOptions} priceIntl={priceIntl} />}
    </div>
  );
}

export default Sort;
