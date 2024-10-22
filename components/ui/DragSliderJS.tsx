import { useEffect } from "preact/hooks";

export interface Props {
  rootId: string;
  scroll?: "smooth" | "auto";
  interval?: number;
  infinite?: boolean;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
};

const setup = ({ rootId }: Props) => {
  const root = document.getElementById(rootId);
  const slider = root?.querySelector<HTMLUListElement>(
    `[${ATTRIBUTES["data-slider"]}]`,
  );
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);

  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, rootId },
    );

    return;
  }

  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const end = () => {
    isDown = false;
    slider.classList.remove("cursor-grab");
    items.forEach((item) => {
      item.children[0].classList.remove("lg:pointer-events-none");
    });
  };

  const start = (pageX: number) => {
    isDown = true;
    slider.classList.add("cursor-grab");
    startX = pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const move = (pageX: number) => {
    if (!isDown) return;

    items.forEach((item) => {
      item.children[0].classList.add("lg:pointer-events-none");
    });
    const x = pageX - slider.offsetLeft;
    const dist = x - startX;
    slider.scrollLeft = scrollLeft - dist;
  };

  (() => {
    slider.addEventListener("mousedown", (e: MouseEvent) => start(e.pageX));
    slider.addEventListener(
      "touchstart",
      (e: TouchEvent) => start(e.touches[0].pageX),
    );

    slider.addEventListener("mousemove", (e: MouseEvent) => move(e.pageX));
    slider.addEventListener(
      "touchmove",
      (e: TouchEvent) => move(e.touches[0].pageX),
    );

    slider.addEventListener("mouseleave", end);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("touchend", end);
  })();
};

function DragSlider({
  rootId,
  scroll = "smooth",
  interval,
  infinite = false,
}: Props) {
  useEffect(() => setup({ rootId, scroll, interval, infinite }), [
    rootId,
    scroll,
    interval,
    infinite,
  ]);

  return <div data-slider-controller-js />;
}

export default DragSlider;
