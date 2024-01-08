import { useSignal } from "@preact/signals";
import type { Description, SectionDescription } from "../../sdk/markdownToObj.ts";
import Icon from "./Icon.tsx";
import RenderMarkdown from "../../islands/RenderMarkdown.tsx";
export interface Props {
    descriptionProps: Description;
    tabIndex?: number;
}

export default function NavigationDescription({ descriptionProps, tabIndex }: Props) {
    const { description, descriptionTabs } = descriptionProps;
    const itemVisible = useSignal(0)

    return (
        <div class="w-full flex flex-col ">
            {description && <RenderMarkdown description={description.content} alignText={"justify"} />}
            <ul class="w-full flex flex-row lg:justify-start lg:gap-6 justify-between pb-3 pt-6">
                {descriptionTabs && descriptionTabs.map((tab, index) => (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px] cursor-pointer"
                        onClick={() => (itemVisible.value = index)}
                    >
                        <span>{tab.title}</span>
                        <Icon id="ArrowDown" size={11} class={` ${itemVisible.value == index ? 'flex' : 'hidden'}`} />
                    </li>
                ))}
                {/* {descriptionTechnique && (
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
                )} */}
            </ul>
            <ul class="w-full flex flex-row ">
                {descriptionTabs && descriptionTabs.map((description, index) => (
                    <li class={` ${itemVisible.value == index ? 'flex' : 'hidden'} text-xs w-full`} style={{ fontSize: '11px' }}>
                        <RenderMarkdown description={description.content} type={description.type} />
                    </li>
                ))}

                {/* {descriptionTechnique && (
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
                )} */}
            </ul>
        </div>
    );
}
