import type { ImageWidget } from "apps/admin/widgets.ts";
import InnerHTML from "$store/components/ui/InnerHTML.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: HTMLWidget;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3 mb-[15px]">
          <div class="w-[236px] lg:mx-0 mx-auto max-h-16">
            <Image
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={236}
              height={75}
            />
          </div>
          <div class="max-w-[350px] lg:mx-0 mx-auto mt-4 lg:mt-0 lg:text-left text-center w-full font-normal leading-[26px] text-base">
            <InnerHTML html={logo?.description} />
          </div>
        </div>
      )}
    </>
  );
}
