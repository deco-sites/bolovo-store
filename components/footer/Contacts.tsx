
export interface ContactsProps {
    title: string
    text: string
    link?: string 
    href?: string
}

const contacts1 = [
    {title:"instagram:", text:"@bolovopinheiros"},
    {title:"whats loja:", text:"(11) 91725-0298"},
    {title:"telefone:", text:"(11) 3086-1020", link: "VEJA MAIS", href: "https://www.bolovo.com.br/p/lojas"},
  ]

export default function Contacts ( { content }: { content?: ContactsProps }) {
    return (
    <div>
        <h2 class="uppercase font-bold leading-[26px] text-base mb-4">CONTATO</h2>
        <div class="flex flex-col">
            {contacts1.map((contact) => (
              <div class="flex flex-row gap-1">
                 <span class=" font-bold text-base leading-[26px] uppercase">{contact.title}</span>
                 <span class=" font-normal text-base leading-[26px]">{contact.text}</span>
                 <a href={contact.href} class="underline text-[#121212]">{contact.link}</a>
             </div>
            ))}
        </div>
    </div>
    )
}