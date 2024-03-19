import { effect, signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  direction: "vertical" | "horizontal";
  interval?: number;
  initialSlide?: number;
  THRESHOLD?: number;
  imagesLength?: number;
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
};

const DIRECTION = {
  vertical: "Y",
  horizontal: "X",
};

const setup = (
  { rootId, interval, initialSlide, THRESHOLD, direction: _direction }: Props,
) => {
  const root = document.getElementById(rootId);
  const slider = root?.querySelector<HTMLUListElement>(
    `[${ATTRIBUTES["data-slider"]}]`,
  );
  const items = root?.querySelectorAll<HTMLElement>(
    `[${ATTRIBUTES["data-slider-item"]}]`,
  );
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);

  if (!root || !slider || !items || items.length === 0) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, rootId },
    );

    return;
  }

  const TIMEOUT = signal<number | undefined>(undefined);
  const currentSlide = signal(initialSlide ?? 0);
  const direction = DIRECTION[_direction];

  const getStyles = (obj: Record<string, string>) =>
    Object.keys(obj).map((key) => `${key}:${obj[key]}`).join(";");

  const nextSlide = () => {
    handleInterval();
    if (items.length === currentSlide.value + 1) {
      currentSlide.value = 0;
    } else {
      currentSlide.value++;
    }
  };

  const previousSlide = () => {
    handleInterval();
    if (currentSlide.value === 0) {
      currentSlide.value = items.length - 1;
    } else {
      currentSlide.value--;
    }
  };

  const handleInterval = () => {
    if (TIMEOUT.value) clearTimeout(TIMEOUT.value);
    TIMEOUT.value = interval && setTimeout(nextSlide, interval);
  };

  const goToSlide = (slideIndex = 0) => {
    handleInterval();
    currentSlide.value = slideIndex;
  };

  effect(() => {
    dots?.forEach((dot, index) => {
      if (index === currentSlide.value) {
        dot?.setAttribute("disabled", "");
      } else {
        dot?.removeAttribute("disabled");
      }
    });

    items.forEach((item, index) => {
      if (index === currentSlide.value) {
        requestAnimationFrame(function () {
          item.style.opacity = "1";
          item.style.zIndex = "20";
          item.style.transition = "opacity 500ms ease 0s";
        });
      } else {
        item.style.opacity = "0";
        item.style.zIndex = "10";
        item.style.transition = "opacity 500ms ease 0s";
      }

      if (currentSlide.value !== 0) {
        item.parentElement?.classList.remove("carouselItem");
      }
    });
  });

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToSlide(it));
  }

  let touchstartX = 0;
  let touchstartY = 0;
  function handleTouchStart(event: TouchEvent) {
    touchstartX = event.touches[0]?.clientX;
    touchstartY = event.touches[0]?.clientY;
  }

  function handleTouchEnd(event: TouchEvent) {
    const touchendX = event.changedTouches[0]?.clientX;
    const touchendY = event.changedTouches[0]?.clientY;

    const horizontalDifference = Math.abs(touchstartX - touchendX);
    const verticalDifference = Math.abs(touchstartY - touchendY);

    const touchThreshold = horizontalDifference > 50 &&
      verticalDifference < 200;

    if (touchendX < touchstartX && touchThreshold) {
      return nextSlide();
    }
    if (touchendX > touchstartX && touchThreshold) {
      return previousSlide();
    }
  }
  slider.addEventListener("touchstart", handleTouchStart, { passive: true });
  slider.addEventListener("touchend", handleTouchEnd, { passive: true });

  prev?.addEventListener("click", previousSlide);
  next?.addEventListener("click", nextSlide);

  if (initialSlide !== undefined) {
    goToSlide(initialSlide);
  }

  TIMEOUT.value = interval && setTimeout(nextSlide, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToSlide(it));
    }

    prev?.removeEventListener("click", previousSlide);
    next?.removeEventListener("click", nextSlide);

    clearTimeout(TIMEOUT.value);
  };
};
/**
 * @description Para o componente funcionar apropriadamente lembre-se de usar `grid overflow-hidden` no Slider e `row-start-1 col-start-1`
 */
function CarouselJS({
  rootId,
  direction = "horizontal",
  interval,
  initialSlide = 0,
  THRESHOLD = 0.6, // Percentage of the item that has to be inside the container for it it be considered as inside the container
  imagesLength, // Update component when changing sku images
}: Props) {
  useEffect(
    () => setup({ rootId, direction, interval, initialSlide, THRESHOLD }),
    [
      rootId,
      direction,
      interval,
      initialSlide,
      THRESHOLD,
      imagesLength,
    ],
  );
  return <div data-carousel-controller-js />;
}

export default CarouselJS;