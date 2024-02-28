import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

interface Store {
  storeState?: string;
  /** @format html */
  /** @title Endereço da Loja */
  address?: string[];
}

export interface Props {
  title?: string;
  stores?: Store[];
}

function StoresList(
  { title, stores }: Props,
) {
  const id = useId();

  return (
    <div class="w-full py-8 flex flex-col gap-5 px-[15px] mx-auto lg:gap-6 lg:py-10">
      <h2 className="text-[#121212] text-[18px] text-center font-bold">
        {title}
      </h2>
      <div
        id={id}
        class="w-full grid grid-cols-[30px_1fr_30px] lg:px-[17px]"
      >
        <Slider class="w-full carousel carousel-start gap-2 lg:gap-[15px] col-span-full row-start-2 row-end-5">
          {stores?.map((store, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[38.605vw] lg:w-[calc((100%-46px)/4)] sm:first:pl-0 sm:last:pr-0"
            >
              <h4 className="text-[#121212] font-semibold mb-[25px]">
                {store.storeState}
              </h4>
              <ul class="flex flex-col gap-8">
                {store.address?.map((address) => (
                    <div
                    className="font-acumin lg:text-base-300"
                    dangerouslySetInnerHTML={{ __html: address ?? "" }}
                    />
                ))}
              </ul>
            </Slider.Item>
          ))}
        </Slider>
        <>
          <div class="hidden relative lg:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="btn btn-circle btn-ghost !bg-[transparent] absolute right-1/2">
              <Icon size={24} id="ArrowPointingLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative lg:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="btn btn-circle btn-ghost !bg-[transparent] absolute left-1/2">
              <Icon size={24} id="ArrowPointingRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default StoresList;
