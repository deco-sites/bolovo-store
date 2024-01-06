import { useSignal } from "@preact/signals";
import { useState, useRef, useEffect } from "preact/hooks";
import type { Description } from "../../sdk/markdownToObj.ts";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm@0.3.0/mod.ts";
import Icon from "./Icon.tsx";
import { createParagraph } from "$store/sdk/markdownToHtml.ts";

export interface Props {
    description: Description;
}

export default function NavigationDescription({ description }: Props) {
    const { descriptionTechnique, guide, instructions } = description;
    const itemVisible = useSignal(0);
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
        };

        fetchData();
    }, [descriptionTechnique, guide, instructions, refGuide, refTechnique, refInstruction]);

    return (
        <div class="w-full flex flex-col pb-3 pt-6">
            <style />
            <style />
            <ul class="w-full flex flex-row pb-2 justify-between">
                {descriptionTechnique && (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px]"
                        onClick={() => (itemVisible.value = 1)}
                    >
                        <span>COMPOSIÇÃO</span>
                        <Icon id="ArrowDown" size={11} class={` ${itemVisible.value == 1 ? 'flex' : 'hidden'}`} />
                    </li>
                )}
                {guide && (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px]"
                        onClick={() => (itemVisible.value = 2)}
                    >
                        <span>MEDIDAS</span>
                        <Icon id="ArrowDown" size={11} class={` ${itemVisible.value == 2 ? 'flex' : 'hidden'}`} />
                    </li>
                )}
                {instructions && (
                    <li
                        class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px]"
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
