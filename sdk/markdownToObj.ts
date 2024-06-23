export interface SectionDescription {
  title: string;
  content: string;
  type?: "table" | "paragraph";
}

export interface Description {
  description?: SectionDescription;
  descriptionTabs?: SectionDescription[];
}

function parseSections(input: string): Description {
  const sections = input.split("- - -");
  const result: Description = {
    descriptionTabs: [],
  };

  sections.forEach((section) => {
    const [title, ...contentArray] = section.trim().split("\n");
    const content = contentArray.join("\n").trim();

    if (title === "## DESCRIÇÃO") {
      result.description = { title: title.trim(), content };
    } else if (
      title === "## DESCRIÇÃO TÉCNICA" || title === "## GUIA DE TAMANHOS" ||
      title === "## INSTRUÇÕES DE LAVAGEM"
    ) {
      const existingTab = result.descriptionTabs?.find((tab) =>
        tab.title === title.trim()
      );

      if (!existingTab) {
        if (title === "## DESCRIÇÃO TÉCNICA") {
          result.descriptionTabs?.push({
            title: "COMPOSIÇÃO",
            content,
            type: "paragraph",
          });
        } else if (title === "## GUIA DE TAMANHOS") {
          const formattedContent = processTable(content);
          result.descriptionTabs?.push({
            title: "MEDIDAS",
            content: formattedContent,
            type: "table",
          });
        } else if (title === "## INSTRUÇÕES DE LAVAGEM") {
          result.descriptionTabs?.push({
            title: "LAVAGEM",
            content,
            type: "paragraph",
          });
        }
      }
    }
  });

  if (result.descriptionTabs) {
    [result.descriptionTabs[0], result.descriptionTabs[1]] = [
      result.descriptionTabs[1],
      result.descriptionTabs[0],
    ];
  }

  return result;
}

function processTable(tableMarkdown: string): string {
  // Divide a tabela markdown em linhas
  const lines = tableMarkdown.split("\n");

  // Verifica se há linhas suficientes para ser uma tabela válida
  if (lines.length < 3) {
    return tableMarkdown;
  }

  function processSingleTable(startIndex: number): void {
    if (
      !lines[startIndex] || !lines[startIndex + 1] || !lines[startIndex + 2]
    ) {
      return;
    }

    const headers = lines[startIndex].split("|");

    // Conta o número de barras verticais (|) na primeira linha
    const numBarsInFirstLine = headers.length - 1;

    // Divide a segunda linha (separadores) em seus itens
    const separators = lines[startIndex + 1].split("|");

    // Conta o número de barras verticais (|) na segunda linha
    const numBarsInSecondLine = separators.length - 1;

    // Se houver mais barras verticais na segunda linha do que na primeira, remove o excesso
    if (numBarsInSecondLine > numBarsInFirstLine) {
      const correctedSeparatorLine = lines[startIndex + 1].replace(
        ":-----:|",
        "",
      );
      lines[startIndex + 1] = correctedSeparatorLine;
    }
  }

  processSingleTable(0);

  // Se houver mais de uma tabela, processa as demais
  if (lines.length > 5) {
    for (let i = 6; i < lines.length; i += 14) {
      processSingleTable(i);
    }
  }

  // Retorna a tabela markdown atualizada
  return lines.join("\n");
}

export default function markdownToObj(markdownText: string): Description {
  const descriptionObject = parseSections(markdownText);

  return descriptionObject;
}
