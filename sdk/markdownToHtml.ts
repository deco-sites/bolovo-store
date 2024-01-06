import { marked } from "https://deno.land/x/marked/mod.ts";

export async function createTable(guide: string) {
  const customRenderer = new marked.Renderer();

  customRenderer.table = function (header: string, body: string) {
    return `<table class="custom-table">\n<thead>${header}</thead>\n<tbody>${body}</tbody>\n</table>`;
  };

  const html = await marked.parse(guide, { renderer: customRenderer });

  return html;
}

export async function createParagraph(paragraph: string) {
  const customRenderer = new marked.Renderer();

  customRenderer.paragraph = function (text: string) {
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="custom-bold">$1</span>',
    );

    text = text.replace(/\*(.*?)\*/g, '<span class="custom-italic">$1</span>');

    return `<p>${text}</p>`;
  };

  const html = await marked.parse(paragraph, { renderer: customRenderer });

  return html;
}


