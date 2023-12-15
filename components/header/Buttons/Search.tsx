import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  label: string;
  img: {
    src: ImageWidget;
    alt: string;
  };
}

export default function SearchButton({ label, img }: Props) {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <span class="hidden md:flex">
        <Button
          class="btn-circle btn-sm btn-ghost md:flex flex-row z-10 flex-nowrap w-auto hover:bg-transparent px-2"
          style={{ display: displaySearchPopup.value ? "none" : "flex" }}
          aria-label="search icon button"
          onClick={() => {
            displaySearchPopup.value = !displaySearchPopup.value;
          }}
        >
          <span class="uppercase text-base font-normal">
            {label}
          </span>
          <Image src={img.src} alt={img.alt} width={16} height={24} />
        </Button>
      </span>
      <span class="md:hidden block">
        <Button
          class="btn-circle btn-sm btn-ghost"
          aria-label="search icon button"
          onClick={() => {
            displaySearchDrawer.value = !displaySearchDrawer.value;
            console.log("click", displaySearchDrawer.value)
          }}
        >
          <Icon id="MagnifyingGlass" size={19} strokeWidth={0.1} />
        </Button>
      </span>
    </>
  );
}
