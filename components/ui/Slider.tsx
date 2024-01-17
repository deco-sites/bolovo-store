import type { ComponentChildren, JSX } from "preact";

function Dot({ index, children, customClass = "" }: {
  index: number;
  children: ComponentChildren;
  customClass?: string;
}) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      class={`focus:outline-none group  ${customClass}`}
    >
      {children}
    </button>
  );
}

function Progress() {
  return (
    <div class="`order-2 lg:order-1 w-[90%] ml-[5%] lg:ml-0 lg:mr-[10%] lg:w-[1px] absolute lg:relative top-[95%] lg:top-0 flex-row lg:flex-col z-10 bg-[#D0D0D0] h-[2px] lg:h-[90%] border-none border-opacity-0">
      <div data-progress class="bg-black ease-linear duration-300 min-h-full lg:max-w-full lg:min-h-0" id="0" style="height: 0; width:0"></div>
    </div>);
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

Slider.Dot = Dot;
Slider.Progress = Progress;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
