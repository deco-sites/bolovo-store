    import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
    import { useUI } from "$store/sdk/useUI.ts";

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
    }

    function ColorSelector({
        colorVariants = [],
        colors = [],
        showColorVariants,
    }: ColorSelectorProps) {
        if (!colorVariants.length || !showColorVariants) {
            return null;
        }

        const { selectedColorVariant } = useUI(); // Acessar o sinal

        const handleColorSelect = (colorVariant: ColorVariant) => {
            // Atualize o signal com o novo valor da cor selecionada
            selectedColorVariant.value = {
                name: colorVariant.name,
                url: colorVariant.url,
                front: colorVariant.frontImage,
                back: colorVariant.backImage,

            };

            console.log("Signal atualizado: ", selectedColorVariant);
        };

        return (
            <ul class="flex items-center gap-[11px] lg:gap-1 justify-start lg:justify-end">
                {colorVariants.map((colorVariant, index) => {
                    const selectedColor = colors.find(
                        (color) =>
                            color.label.toLowerCase() ===
                                colorVariant.name.toLowerCase(),
                    );
                    console.log(colorVariant, "teste");
                    const isSvg = selectedColor?.hex !== undefined;
                    const isImg = selectedColor?.src !== undefined;

                    return (
                        <div class="items-center">
                            {index < 4
                                ? (
                                    <li key={index}>
                                        <button
                                            onClick={() => handleColorSelect(colorVariant)}
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
