import type { AlignText } from "$store/sdk/markdownToHtml.ts";
import { useRef, useEffect } from "preact/hooks";
import { createParagraph, createTable } from "$store/sdk/markdownToHtml.ts";


interface RenderMarkdownProps {
    description: string;
    type?: "paragraph" | "table";
    alignText?: AlignText;
}

export default function RenderMarkdown({ description, type = "paragraph", alignText = "left" }: RenderMarkdownProps) {

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