import InnerHTML from  "$store/components/ui/InnerHTML.tsx"
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Icon from "deco-sites/bolovo-store/components/ui/Icon.tsx";

export interface ContactsProps {
    title: string
    text: HTMLWidget
}

const contacts1 = [
    {title:"instagram:", text:"@bolovopinheiros"},
    {title:"whats loja:", text:"(11) 91725-0298"},
    {title:"telefone:", text:"(11) 3086-1020"},
  ]

export default function Contacts ( { content }: { content?: ContactsProps }) {
    return (
    <div>
        <h2 class="uppercase font-medium text-sm leading-[22.4px] border-b">CONTATO</h2>
        <div class="flex flex-col flex-grow mt-[14px]">
            {contacts1.map((contact) => (
              <div class="flex flex-row lg:justify-start justify-center gap-1 ">
                 <span class="font-normal text-xs leading-[26.4px] uppercase">{contact.title}</span>
                 <span class="font-medium text-xs leading-[26.4px]">
                   <InnerHTML html={contact.text} />
                 </span>
             </div>
            ))}
            <a class="flex flex-row rounded-[19px] border border-primary items-center cursor-pointer h-[38px] mt-[14px]">
             <span class="block rounded-full bg-primary items-center pt-[6.5px] pb-[9px] pr-[7px] pl-2">
                <Icon size={23} id="WhatsApp" />
              </span>
              <span class="text-sm font-medium leading-[22.4px] text-right pl-[10px] pr-[19px]">COMPRE PELO WHATS</span>
            </a>
        </div>
    </div>
    )
}