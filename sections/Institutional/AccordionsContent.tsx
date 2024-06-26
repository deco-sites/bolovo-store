import { AccordionItem } from "../../components/ui/AccordionItem.tsx";

export interface Props {
  sections: {
    /** @format rich-text */
    sectionText?: string;
    accordions: {
      label: string;
      /** @format rich-text */
      content: string;
    }[];
  }[];
}

function AccordionsContent({ sections }: Props) {
  return (
    <div class="flex flex-col gap-5 pb-12 lg:pb-20">
      {sections?.map((section) => (
        <>
          {section?.sectionText && (
            <div
              dangerouslySetInnerHTML={{
                __html: section?.sectionText.replace(/<p>|<\/p>/g, "\n"),
              }}
            />
          )}
          {section?.accordions?.map(
            (item, index) => (
              <AccordionItem
                title={item.label}
                content={item.content}
                key={index}
              />
            ),
          )}
        </>
      ))}
    </div>
  );
}

export default AccordionsContent;
