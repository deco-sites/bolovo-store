import Icon from "deco-sites/bolovo-store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href?: string;
  /** @format html */
  extraInfo?: string
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = true }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row flex-grow w-full gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li class="w-full flex flex-grow">
                <div class="flex flex-col gap-[14px] w-full flex-grow">
                  <span class="font-medium text-sm leading-[22.4px] uppercase border-b">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        {item.extraInfo ? 
                        <div class="flex flex-row items-center">
                          <span class="block leading-[26.4px] font-normal text-xs uppercase text-primary">{item.label}</span>
                          <a href={item.href} class="block leading-[26.4px] font-normal text-xs text-primary pl-1">
                            <div class="block leading-[26.4px] font-normal text-xs text-primary" dangerouslySetInnerHTML={{ __html: item.extraInfo }} /> 
                          </a>
                        </div> : 
                        <a href={item.href} class="block leading-[26.4px] font-normal text-xs uppercase text-primary">
                          {item.label}
                        </a>
                        }
                      </li>
                    ))}
                    {section.label === "CONTATO" &&  
                    <a class="flex flex-row rounded-[19px] border border-primary items-center cursor-pointer h-[38px] w-[214px] mt-[14px]">
             <span class="block rounded-full bg-primary items-center pt-[6.5px] pb-[9px] pr-[7px] pl-2">
                <Icon size={23} id="WhatsApp" />
              </span>
              <span class="text-sm font-medium leading-[22.4px] text-right w-full pr-[19px]">COMPRE PELO WHATS</span>
            </a> }
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow ">
                  <input type="checkbox" class="min-h-[0]" />
                  <div class="collapse-title min-h-[0] !p-0 flex gap-2">
                    <span>{section.label}</span>
                  </div>
                  <div class="collapse-content">
                    <ul
                      class={`flex flex-col gap-1 pl-5 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}