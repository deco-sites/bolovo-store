export interface Props {
  /** @format html */
  content: string;
  title: string;
}

export function AccordionItem({ title, content }: Props) {
  return (
    
    <div tabIndex={0} class="collapse collapse-arrow w-full rounded-none">
        <input type="checkbox" class="min-h-[0] min-w-full" />
      <div class="collapse-title text-sm leading-[22px] uppercase col-start-0 border-b min-h-[0] px-0 py-0 pb-1 flex gap-2 w-full min-w-full font-medium after:!right-1">
        {title}
      </div>
      <div class="collapse-content px-0 !pb-0 bg-neutral-100 rounded-b">
        <div class="py-[15px] px-[15px]">
          <div
            dangerouslySetInnerHTML={{__html: content.replace(/<p>|<\/p>/g, "\n")}}
          />
        </div>
      </div>
    </div>
  );
}

