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

  const start = (e) => {
    isDown = true;
    slider.classList.add("cursor-grab");
    items.forEach((item) => {
      item.children[0].classList.add("lg:pointer-events-none");
    });
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = x - startX;
    slider.scrollLeft = scrollLeft - dist;
  };

  (() => {
    slider.addEventListener("mousedown", start);
    slider.addEventListener("touchstart", start);

    slider.addEventListener("mousemove", move);
    slider.addEventListener("touchmove", move);

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
