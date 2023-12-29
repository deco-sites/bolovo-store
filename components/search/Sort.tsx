import { useEffect, useRef, useState } from "preact/hooks";
import SortMenu from "./SortMenu.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx"
import Button from "deco-sites/bolovo-store/components/ui/Button.tsx";

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
      <Button
        class={`btn-ghost btn-xs text-[13px] top-1/2 px-2 py-[5px] px- font-light uppercase leading-0 rounded-[20px] hover:bg-transparent ${
          isOpen ? "border border-black rounded-t-lg" : "hover:border hover:border-black"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span class="text-[13px] leading-0 flex px-[11px]">
          <span class="w-[19px] h-[10px] flex flex-col mr-[6px]">
            <Icon id="FilterArrowLeft" />
            <Icon id="FilterArrowRight" />
          </span>
          ORDENAR
        </span>
      </Button>
      {isOpen && <SortMenu sortOptions={sortOptions} />}
    </div>
  );
}

export default Sort;
