import { useSignal } from "@preact/signals";
import { useState, useRef, useEffect } from "preact/hooks";
import type { Description } from "../../sdk/markdownToObj.ts";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm@0.3.0/mod.ts";
import Icon from "./Icon.tsx";
import { createParagraph } from "$store/sdk/markdownToHtml.ts";
export interface Props {
    descriptionProps: Description;
}

export default function NavigationDescription({ descriptionProps }: Props) {
    const { description, descriptionTechnique, guide, instructions } = descriptionProps;
    const itemVisible = useSignal(0);
    const refDescription = useRef<HTMLInputElement>(null);
    const refTechnique = useRef<HTMLInputElement>(null);
    const refGuide = useRef<HTMLInputElement>(null);
    const refInstruction = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (refTechnique.current && descriptionTechnique) {
                refTechnique.current.innerHTML = await createParagraph(descriptionTechnique.content);
            }
            if (refGuide.current && guide) {
                refGuide.current.innerHTML = await createParagraph(guide.content);
            }
            if (refInstruction.current && instructions) {
                refInstruction.current.innerHTML = await createParagraph(instructions.content);
            }
            if (refDescription.current && description) {
                refDescription.current.innerHTML = await createParagraph(description.content);
            }
        };

        fetchData();
    }, [descriptionTechnique, guide, instructions, refGuide, refTechnique, refInstruction, refDescription, description]);

    return (
        <div class="w-full flex flex-col ">
            <div class="w-full text-sm flex flex-col gap-2" ref={refDescription}>

            </div>
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }} />
            <ul class="w-full flex flex-row justify-between pb-3 pt-6">
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
            <ul class="w-full flex flex-row markdown-body">
                {descriptionTechnique && (
                    <li class={` ${itemVisible.value == 1 ? 'flex' : 'hidden'} text-xs `} style={{ fontSize: '12px' }}>
                        <span ref={refTechnique}  ></span>
                    </li>
                )}
                {guide && (
                    <li class={` ${itemVisible.value == 2 ? 'flex' : 'hidden'} text-xs `} style={{ fontSize: '12px' }}>
                        <span ref={refGuide}  ></span>
                    </li>
                )}
                {instructions && (
                    <li class={` ${itemVisible.value == 3 ? 'flex' : 'hidden'} text-xs `} style={{ fontSize: '12px' }}>
                        <div ref={refInstruction} />
                    </li>
                )}
            </ul>
        </div>
    );
}
