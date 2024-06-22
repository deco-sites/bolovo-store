import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Color {
  /**
   * @title Color name
   */
  label: string;
  /**
   * @title Color
   * @format color
   */
  hex?: string;
  /**
   * @title Image
   */
  src?: ImageWidget;
}

interface Props {
  /** @title Color props */
  colors: Color[];
}
/** @title Color Map Configuration */
const loader = ({ colors }: Props): Color[] => colors;

function colorSelector(colors: Color[]) {
  return colors.map((colorVariant, index) => {
    const selectedColor = colors.find((color) =>
      color.label.toLowerCase() === colorVariant.label.toLowerCase()
    );
    const isImg = selectedColor?.src !== undefined;
    const isSvg = selectedColor?.hex !== undefined;

    return (
      <li key={index}>
        <div
          className="w-[22px] h-[22px] flex items-center justify-center border"
          title={`Cor ${colorVariant.label}`}
        >
          {isSvg
            ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <rect
                  x="0"
                  y="0"
                  width="22"
                  height="22"
                  fill={selectedColor.hex}
                />
              </svg>
            )
            : isImg
            ? <img src={selectedColor.src} alt={`Cor ${colorVariant.label}`} />
            : <span class="w-3 h-3 border"></span>}
        </div>
      </li>
    );
  });
}

export const Preview = (props: Props) => {
  const { colors } = props;

  return (
    <div class="flex flex-col gap-[7px] mb-4 mt-4">
      <span class="font-semibold text-[0.938rem] leading-[34.5px] uppercase">
        CORES
      </span>
      <div class="group">
        <ul class="flex items-center gap-[26px] lg:gap-[24px] justify-start ">
          {colorSelector(colors)}
        </ul>
      </div>
    </div>
  );
};

export default loader;
