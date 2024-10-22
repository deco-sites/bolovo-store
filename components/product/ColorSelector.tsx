import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { Signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

interface ColorVariant {
  name: string;
  url: string;
  frontImage: string;
  backImage: string;
}

export interface ColorSelectorProps {
  colorVariants?: ColorVariant[];
  colors?: Color[];
  showColorVariants: boolean;
  selectedColorVariant: Signal<
    {
      name: string;
      url: string;
      front: string;
      back: string;
    } | null
  >;
}

function ColorSelector({
  colorVariants = [],
  colors = [],
  showColorVariants,
  selectedColorVariant,
}: ColorSelectorProps) {
  const initialImage = useRef<
    {
      name: string;
      url: string;
      front: string;
      back: string;
    } | null
  >();
  useEffect(() => {
    initialImage.current = selectedColorVariant.value;
  }, []);

  if (!colorVariants.length || !showColorVariants) {
    return null;
  }

  const handleColorSelect = (colorVariant?: ColorVariant) => {
    if (!colorVariant) {
      selectedColorVariant.value = initialImage.current!;
      return;
    }

    selectedColorVariant.value = {
      name: colorVariant.name,
      url: colorVariant.url,
      front: colorVariant.frontImage,
      back: colorVariant.backImage,
    };
  };

  return (
    <ul class="flex items-center gap-[11px] lg:gap-1 justify-start lg:justify-end">
      {colorVariants.map((colorVariant, index) => {
        const selectedColor = colors.find(
          (color) =>
            color.label.toLowerCase() ===
              colorVariant.name.toLowerCase(),
        );
        const isSvg = selectedColor?.hex !== undefined;
        const isImg = selectedColor?.src !== undefined;

        return (
          <div class="items-center">
            {index < 4
              ? (
                <li key={index}>
                  <button
                    onClick={() => handleColorSelect(colorVariant)}
                    onMouseEnter={() => handleColorSelect(colorVariant)}
                    onMouseLeave={() => handleColorSelect()}
                  >
                    <div
                      class="w-[12px] h-[12px] flex items-center justify-center border"
                      title={`Cor ${colorVariant.name}`}
                    >
                      {isSvg
                        ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <rect
                              x="0"
                              y="0"
                              width="12"
                              height="12"
                              fill={selectedColor
                                ?.hex}
                            />
                          </svg>
                        )
                        : isImg
                        ? (
                          <img
                            src={selectedColor.src}
                            alt={`Cor ${colorVariant.name}`}
                          />
                        )
                        : null}
                    </div>
                  </button>
                </li>
              )
              : index === 5
              ? (
                <div class="w-[12px] h-[12px] flex items-center justify-center mb-[2px]">
                  +
                </div>
              )
              : null}
          </div>
        );
      })}
    </ul>
  );
}

export default ColorSelector;
