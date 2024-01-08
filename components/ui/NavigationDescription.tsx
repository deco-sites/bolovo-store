import { useSignal } from "@preact/signals";
import type { Description } from "../../sdk/markdownToObj.ts";
import Icon from "./Icon.tsx";
import RenderMarkdown from "../../islands/RenderMarkdown.tsx";
export interface Props {
    descriptionProps: Description;

}

export default function NavigationDescription({ descriptionProps }: Props) {
    const { description, descriptionTechnique, guide, instructions } = descriptionProps;
    const itemVisible = useSignal(0);

    return (
        <div class="w-full flex flex-col ">
            {description && <RenderMarkdown description={description.content} alignText={"justify"} />}
            <ul class="w-full flex flex-row lg:justify-start lg:gap-6 justify-between pb-3 pt-6">
                {descriptionTechnique && (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px] cursor-pointer"
                        onClick={() => (itemVisible.value = 1)}
                    >
                        <span>COMPOSIÇÃO</span>
                        <Icon id="ArrowDown" size={11} class={` ${itemVisible.value == 1 ? 'flex' : 'hidden'}`} />
                    </li>
                )}
                {guide && (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px] cursor-pointer"
                        onClick={() => (itemVisible.value = 2)}
                    >
                        <span>MEDIDAS</span>
                        <Icon id="ArrowDown" size={11} class={` ${itemVisible.value == 2 ? 'flex' : 'hidden'}`} />
                    </li>
                )}
                {instructions && (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px] cursor-pointer"
                        onClick={() => (itemVisible.value = 3)}
                    >
                        <span>LAVAGEM</span>
                        <Icon id="ArrowDown" size={11} class={` ${itemVisible.value == 3 ? 'flex' : 'hidden'}`} />
                    </li>
                )}
            </ul>
            <ul class="w-full flex flex-row ">
                {descriptionTechnique && (
                    <li class={` ${itemVisible.value == 1 ? 'flex' : 'hidden'} text-xs `} style={{ fontSize: '12px' }}>
                        <RenderMarkdown description={descriptionTechnique.content} />
                    </li>
                )}
                {guide && (
                    <li class={` ${itemVisible.value == 2 ? 'flex' : 'hidden'} text-xs `} style={{ fontSize: '12px' }}>
                        <RenderMarkdown description={guide.content} type={"table"} />
                    </li>
                )}
                {instructions && (
                    <li class={` ${itemVisible.value == 3 ? 'flex' : 'hidden'} text-xs `} style={{ fontSize: '12px' }}>
                        <RenderMarkdown description={instructions.content} />
                    </li>
                )}
            </ul>
        </div>
    );
}
