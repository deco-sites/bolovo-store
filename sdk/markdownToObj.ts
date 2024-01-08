export interface SectionDescription {
  title: string;
  content: string;
  type?: "table" | "paragraph";
}

export interface Description {
  description?: SectionDescription;
  descriptionTabs?: SectionDescription[];
}

const TITLE = {
  "## DESCRIÇÃO TÉCNICA": "COMPOSIÇÃO",
  "## GUIA DE TAMANHOS": "MEDIDAS",
  "## INSTRUÇÕES DE LAVAGEM": "LAVAGEM",
};

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
          result.descriptionTabs?.push({
            title: "MEDIDAS",
            content,
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

  return result;
}

export default function markdownToObj(markdownText: string): Description {
  const descriptionObject = parseSections(markdownText);

  return descriptionObject;
}
