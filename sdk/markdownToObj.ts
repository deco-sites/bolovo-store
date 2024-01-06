export interface Description {
  description?: {
    title: string;
    content: string;
  };
  descriptionTechnique?: {
    title: string;
    content: string;
  };
  guide?: {
    title: string;
    content: string;
  };
  instructions?: {
    title: string;
    content: string;
  };
}

function parseSections(input: string): Description {
  const sections = input.split("- - -");
  const result: Description = {};

  sections.forEach((section) => {
    const [title, ...contentArray] = section.trim().split("\n");
    const content = contentArray.join("\n").trim();

    if (title === "## DESCRIÇÃO") {
      result.description = { title: title.trim(), content };
    } else if (title === "## DESCRIÇÃO TÉCNICA") {
      result.descriptionTechnique = { title: title.trim(), content };
    } else if (title === "## GUIA DE TAMANHOS") {
      result.guide = { title: title.trim(), content: content };
    } else if (title === "## INSTRUÇÕES DE LAVAGEM") {
      result.instructions = { title: title.trim(), content };
    }
  });

  return result;
}

export default function markdownToObj(markdownText: string): Description {
  const descriptionObject = parseSections(markdownText);

  console.log("des", descriptionObject.instructions?.content);

  return descriptionObject;
}
