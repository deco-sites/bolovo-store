import { useSignal } from "@preact/signals";
import { useState, useRef, useEffect } from "preact/hooks";
import type { Description } from "../../sdk/markdownToObj.ts";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm@0.3.0/mod.ts";
import Icon from "./Icon.tsx";
import { createParagraph, createTable } from "$store/sdk/markdownToHtml.ts";
import type { AlignText } from "$store/sdk/markdownToHtml.ts";
export interface Props {
    descriptionProps: Description;
}

interface RenderMarkdownProps {
    description: string;
    type?: "paragraph" | "table";
    alignText?: AlignText;
}

function RenderMarkdown({ description, type = "paragraph", alignText = "left" }: RenderMarkdownProps) {

    const refMarkdown = useRef<HTMLInputElement>(null);

    useEffect(() => {

        const fetchData = async () => {
            if (refMarkdown.current && description && alignText) {
                if (type == "paragraph") {
                    refMarkdown.current.innerHTML = await createParagraph(description, alignText);
                } else if (type == "table")
                    refMarkdown.current.innerHTML = await createTable(description);
            }
        };

        fetchData();

    }, [refMarkdown, description, type, alignText])

    return (
        <span ref={refMarkdown}></span>
    )
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
