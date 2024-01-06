interface MarkdownSection {
  title?: string;
  content?: string;
}

interface ParsedMarkdown {
  sections: MarkdownSection[];
  html: string;
}

function splitString(inputString: string, separator: string) {
  return inputString.split(separator);
}

function splitByLine(inputString: string): string[] {
  return inputString.split("\n");
}

export default function markdownToHtml(markdownText: string): string {

  const arrayDescriptions: string[] = splitString(markdownText, "- - -");

  console.log("array", arrayDescriptions);

  // Substitui títulos (##, ###, ####, etc.)
  markdownText = markdownText.replace(/^(#{1,6})\s(.+)$/gm, (match, p1, p2) => {
    const level = p1.length;
    return `<h${level}>${p2}</h${level}>`;
  });

  // Substitui listas
  markdownText = markdownText.replace(/^\s*-\s(.+)$/gm, (match, p1) => {
    return `<li>${p1}</li>`;
  });
  markdownText = `<ul>${markdownText}</ul>`;

  // Substitui parágrafos
  markdownText = markdownText.replace(/^(.+)$/gm, (match, p1) => {
    return `<p>${p1}</p>`;
  });

  // Substitui texto em negrito (**texto**)
  markdownText = markdownText.replace(/\*\*(.+?)\*\*/g, (match, p1) => {
    return `<strong>${p1}</strong>`;
  });

  // Substitui tabelas
  markdownText = markdownText.replace(/(\|.+?\|)/gm, (match, p1) => {
    const rows = p1.trim().split("\n").map((row) => {
      const cells = row.split("|").filter((cell) => cell.trim() !== "");
      return `<tr>${
        cells.map((cell) => `<td>${cell.trim()}</td>`).join("")
      }</tr>`;
    });

    return `<table>${rows.join("")}</table>`;
  });

  return markdownText;
}
