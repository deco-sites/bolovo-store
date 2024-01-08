import { marked } from "https://deno.land/x/marked/mod.ts";

export async function createTable(
  guide: string,
  tableClass: string = "w-full",
  headerClass: string = "uppercase",
  bodyClass: string = "border border-black uppercase text-[11px]",
  rowClass: string = "",
  cellClass: string = "p-1 uppercase",
) {
  const customRenderer = new marked.Renderer();

  customRenderer.table = function (header: string, body: string) {
    // Adiciona classes à tabela, cabeçalho e corpo
    const tableWithClass =
      `<table class="${tableClass} w-full">\n<thead class="${headerClass}">${header}</thead>\n<tbody class="${bodyClass}">${body}</tbody>\n</table>`;

    return tableWithClass;
  };

  // Adiciona classes às células do cabeçalho e do corpo
  customRenderer.tablecell = function (
    content: string,
    flags: { header: boolean; align: string },
  ) {
    const tag = flags.header ? "th" : "td";
    const cellClassString = flags.header ? headerClass : bodyClass;
    const cellClassAttribute = cellClassString
      ? ` class="${cellClassString + " " + cellClass}"`
      : "";
    return `<${tag} ${cellClassAttribute}${
      flags.align ? ` style="text-align:${flags.align}"` : ""
    }>${content}</${tag}>`;
  };

  // Adiciona classe à linha, se fornecida
  customRenderer.tablerow = function (content: string) {
    const rowClassAttribute = rowClass ? ` class="${rowClass} ` : "  '";
    return `<tr ${rowClassAttribute} >${content}</tr>`;
  };

  const html = await marked.parse(guide, { renderer: customRenderer });

  return html;
}

export type AlignText = "center" | "justify" | "left";

export async function createParagraph(paragraph: string, alignText: AlignText) {

  const customRenderer = new marked.Renderer();

  customRenderer.paragraph = function (text: string) {
    text = text.replace(
      /\*\*(.*?)\*\*/g,
      '<span class="custom-bold">$1</span>',
    );

    text = text.replace(/\*(.*?)\*/g, '<span class="custom-italic">$1</span>');

    return `<p style="text-align:${alignText}" class="text-xs mb-2 leading-5 text-justify">${text}</p>`;
  };

  const html = await marked.parse(paragraph, { renderer: customRenderer });

  return html;
}
