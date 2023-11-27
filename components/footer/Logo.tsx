import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3 mb-[15px]">
          <div class="w-[236px] max-h-16">
            <img
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={236}
              height={75}
            />
          </div>
          <div class="max-w-[350px] w-full font-normal leading-[26px] text-base">
            {logo?.description}
          </div>
        </div>
      )}
    </>
  );
}
