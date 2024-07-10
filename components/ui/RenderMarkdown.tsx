import type { AlignText } from "$store/sdk/markdownToHtml.ts";
import { createParagraph, createTable } from "$store/sdk/markdownToHtml.ts";

interface RenderMarkdownProps {
  description: string;
  type?: "paragraph" | "table";
  alignText?: AlignText;
}

export default function RenderMarkdown(
  { description, type = "paragraph", alignText = "left" }: RenderMarkdownProps,
) {
  if (type === "paragraph") {
    return (
      <div
        class={`w-full flex flex-col gap-1`}
        dangerouslySetInnerHTML={{
          __html: createParagraph(
            description ?? "",
            alignText,
          ),
        }}
      />
    );
  }

  return (
    <div
      class={`w-full flex flex-col gap-4`}
      dangerouslySetInnerHTML={{ __html: createTable(description) }}
    />
  );
}
