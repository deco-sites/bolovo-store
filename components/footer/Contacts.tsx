import InnerHTML from "$store/components/ui/InnerHTML.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface ContactsProps {
  title: string;
  text: HTMLWidget;
}

const contacts1 = [
  { title: "instagram:", text: "@bolovopinheiros" },
  { title: "whats loja:", text: "(11) 91725-0298" },
  { title: "telefone:", text: "(11) 3086-1020" },
];

export default function Contacts({ content }: { content?: ContactsProps }) {
  return (
    <div>
      <h2 class="uppercase font-bold leading-[26px] text-base mb-4 lg:text-left text-center">
        CONTATO
      </h2>
      <div class="flex flex-col">
        {contacts1.map((contact) => (
          <div class="flex flex-row lg:justify-start justify-center gap-1 ">
            <span class="font-bold text-base leading-[26px] uppercase">
              {contact.title}
            </span>
            <span class="font-normal text-base leading-[26px]">
              <InnerHTML html={contact.text} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
