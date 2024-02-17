import { Color } from "$store/components/search/SearchResult.tsx";

interface Props {
  /** @title Color props */
  colors: Color[];
}
/** @title Color Map Configuration */
const loader = ({ colors }: Props): Color[] => colors;

function colorSelector(colors: Color[]) {
  return colors.map((colorVariant, index) => { // Adicione o retorno aqui
    const selectedColor = colors.find(color => color.label.toLowerCase() === colorVariant.label.toLowerCase());
    if (!selectedColor) return null;

    const isSvg = selectedColor.hex !== undefined;

    return (
      <li key={index}>
        <div
          className="w-[22px] h-[22px] flex items-center justify-center border"
          title={`Cor ${colorVariant.label}`}
        >
          {isSvg ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <rect x="0" y="0" width="22" height="22" fill={selectedColor.hex} />
            </svg>
          ) : (
            <img src={selectedColor.src} alt={`Cor ${colorVariant.label}`} />
          )}
        </div>
      </li>
    );
  });
}

export const Preview = (props: Props) => {
  const { colors } = props;

  return (
    <div class="flex flex-col gap-[7px] mb-4 mt-4">
      <span class="font-semibold text-[15px] leading-[34.5px] uppercase">
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