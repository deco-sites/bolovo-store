import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

/** @titleBy storeState */
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
    <div class="w-full py-8 flex flex-col gap-5 px-[15px] mx-auto lg:gap-16 lg:py-10">
      <h2 className="text-[#121212] text-[20px] leading-[26px] text-center font-bold">
        {title}
      </h2>
      <div class="w-full flex flex-col-reverse lg:flex-row items-center lg:items-start">
        <div class="w-1/2">
          <img src="https://cdn.vnda.com.br/bolovo/2020/12/02/15_12_7_752_contatolucas1.jpg?v=1709056697" />
        </div>
        <div
          id={id}
          class="w-full grid grid-rows-[40px_1fr_40px] lg:px-[15px] gap-y-6"
        >
          <>
            <div class="flex justify-between w-full px-5">
              <div class="relative block z-10 col-start-1 row-start-2">
                <Slider.PrevButton class="btn btn-circle btn-ghost !bg-[transparent] right-1/2">
                  <Icon size={24} id="ArrowPointingLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="relative block z-10 col-start-3 row-start-2">
                <Slider.NextButton class="btn btn-circle btn-ghost !bg-[transparent] left-1/2">
                  <Icon size={24} id="ArrowPointingRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </div>
          </>
          {/* <Slider.Progress /> */}
          <SliderJS rootId={id} />
          <Slider class="mx-4 w-full carousel carousel-start gap-6 lg:gap-[15px] col-span-full row-start-2 row-end-5">
            {stores?.map((store, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col carousel-item w-[38.605vw] lg:w-[calc((100%-46px)/4)] sm:first:pl-0 sm:last:pr-0"
              >
                <h4 className="text-[#121212] text-[14px] font-semibold mb-[25px] uppercase">
                  {store.storeState}
                </h4>
                <ul class="flex flex-col gap-8 pr-8">
                  {store.address?.map((address) => (
                    <div
                      className="font-acumin lg:text-base-300 text-[12px]"
                      dangerouslySetInnerHTML={{ __html: address ?? "" }}
                    />
                  ))}
                </ul>
              </Slider.Item>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default StoresList;
