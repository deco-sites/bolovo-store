import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { Color } from "https://deno.land/x/color@v0.3.0/mod.ts";
import { useScroll } from "$store/sdk/useScroll.ts";

export interface barColor {
  /**
   * @format color
   * @default #121212
   */
  background: string;
  /**
   * @format color
   * @title Text Color
   * @default #FFFFFF
   */
  text: string;
}

export interface Props {
  visible?: boolean;
  /** @format rich-text */
  text?: string;
  layout?: barColor;
  // interval?: number;
  href?: string;
}

function Alert({ visible = false, text = "", layout, href = "/" }: Props) {
  const id = useId();
  const scroll = useScroll();

  if (!visible) {
    return null;
  }

  const sliderStyle = {
    backgroundColor: layout?.background || "#121212",
  };

  const textStyle = {
    color: layout?.text || "#FFFFFF",
  };

  return (
    <div class={scroll.value > 1 ? "hidden" : ""} id={id}>
      <Slider
        style={sliderStyle}
        class={`carousel carousel-center w-screen gap-6`}
      >
        <div class="carousel-item">
          <a href={href} class="flex items-center">
            <span
              style={textStyle}
              class="text-base md:text-sm text-secondary-content flex justify-center items-center w-screen h-[36px]"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </a>
        </div>
      </Slider>
    </div>
  );
}

export default Alert;
