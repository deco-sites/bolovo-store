import { marked, Tokens } from "marked/mod.ts";

export function createTable(
  guide: string,
  tableClass: string = "w-full",
  headerClass: string = "uppercase",
  bodyClass: string = "border border-black uppercase text-[0.688rem]",
  rowClass: string = "",
  cellClass: string = "p-1 uppercase",
): string {
  const customRenderer = new marked.Renderer();

  const tableCell = (
    cells: Tokens.TableCell[],
  ) => {
    return cells.map((cell) => {
      const tag = cell.header ? "th" : "td";
      const cellClassString = cell.header ? headerClass : bodyClass;
      const cellClassAttribute = cellClassString
        ? ` class="${cellClassString + " " + cellClass}"`
        : "";
      return `<${tag} ${cellClassAttribute}${
        cell.align ? ` style="text-align:${cell.align}"` : ""
      }>${cell.text}</${tag}>`;
    }).join("");
  };

  const tableRow = (content: string) => {
    const rowClassAttribute = rowClass ? ` class="${rowClass}" ` : "";
    return `<tr ${rowClassAttribute} >${content}</tr>`;
  };

  customRenderer.table = function ({ header, rows }: Tokens.Table) {
    // Adiciona classes à tabela, cabeçalho e corpo
    const tableWithClass =
      `<table class="${tableClass} w-full"><thead class="${headerClass}">${
        tableRow(tableCell(header))
      }</thead><tbody class="${bodyClass}">${
        rows.map((row) => tableRow(tableCell(row))).join("")
      }</tbody></table>`;

    return tableWithClass;
  };

  const [table1, table2] = guide.split("\n\n");

  const html1 = marked.parse(table1, {
    renderer: customRenderer,
    async: false,
  });

  if (table2) {
    const html2 = marked.parse(table2, {
      renderer: customRenderer,
      async: false,
    });

    return ((html1 as string) + (html2 as string));
  }

  return (html1 as string);
}

export type AlignText = "center" | "justify" | "left";

export function createParagraph(
  paragraph: string,
  alignText: AlignText,
): string {
  const customRenderer = new marked.Renderer();
  customRenderer.paragraph = function ({ text }: Tokens.Paragraph) {
    return `<p style="text-align:${
      alignText || "justify"
    }" class="text-sm leading-5 last:mt-4">${
      text.replace(/\*(.*?)\*/g, '<span class="custom-italic">$1</span>')
        .replace(
          /\*\*(.*?)\*\*/g,
          '<span class="custom-bold">$1</span>',
        )
    }</p>`;
  };

  const html = marked.parse(paragraph, {
    renderer: customRenderer,
    async: false,
  });

  return html as string;
}
