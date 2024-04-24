import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";

interface ColorVariant {
  name: string;
  url: string;
  image: string;
}

interface Props {
  colorVariants: ColorVariant[];
  colors?: Color[];
}

const onColorMouseEnter = (colorVariant: ColorVariant) => {
  // Exibir a primeira foto da cor que está com o hover
  console.log("URL da primeira foto da cor: ", colorVariant.image);
};

function ColorVariantSelector({ colorVariants, colors }: Props) {
  return (
    <>
      {colorVariants.map((colorVariant, index) => {
        const selectedColor = colors?.find((color) =>
          color.label.toLowerCase() === colorVariant.name.toLowerCase()
        );
        const isSvg = selectedColor?.hex !== undefined;
        const isImg = selectedColor?.src !== undefined;

        return (
          <>
            {index < 4
              ? (
                <li class="items-center" key={index}>
                  <div href={colorVariant.url}>
                    <div
                      onMouseEnter={() => onColorMouseEnter(colorVariant)}
                      onClick={() => onColorMouseEnter(colorVariant)}
                      class="w-[12px] h-[12px] flex items-center justify-center border"
                      title={`Cor ${colorVariant.name}`}
                    >
                      {isSvg
                        ? (
                          // Se a cor for um SVG
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
                              fill={selectedColor?.hex}
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
                        : undefined}
                    </div>
                  </div>
                </li>
              )
              : index === 5
              ? (
                <div class="w-[12px] h-[12px] flex items-center justify-center mb-[2px]">
                  +
                </div>
              )
              : undefined}
          </>
        );
      })}
    </>
  );
}

export default ColorVariantSelector;
