import Icon from "deco-sites/bolovo-store/components/ui/Icon.tsx";

export interface WhatsApp {
  whatsAppButtonText?: string;
  whatsAppNumber?: string;
  whatsAppText?: string;
}

export type Item = {
  label: string;
  href?: string;
  /** @format rich-text */
  extraInfo?: string;
  newTab?: boolean;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  {
    sections,
    justify = true,
    whatsApp = {
      whatsAppButtonText: "COMPRE PELO WHATS",
      whatsAppNumber: "11917250298",
      whatsAppText: "Olá, gostaria de comprar um produto",
    },
  }: { sections: Section[]; justify: boolean; whatsApp?: WhatsApp },
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
                  <span class="font-medium text-sm leading-[22px] uppercase border-b">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        {item.extraInfo
                          ? (
                            <div class="flex flex-row items-center">
                              <span class="block leading-[26px] font-normal text-base uppercase text-baserimary">
                                {item.label}
                              </span>

                              <a
                                target={item.newTab ? "_blank" : ""}
                                href={item.href}
                                class="block leading-[26px] font-normal text-base text-baserimary pl-1"
                              >
                                <div
                                  class="block leading-[26px] font-normal text-base text-baserimary"
                                  dangerouslySetInnerHTML={{
                                    __html: item.extraInfo,
                                  }}
                                />
                              </a>
                            </div>
                          )
                          : (
                            <a
                              href={item.href}
                              class="block leading-[26.4px] font-normal text-base uppercase text-primary"
                              target={item.newTab ? "_blank" : ""}
                            >
                              {item.label}
                            </a>
                          )}
                      </li>
                    ))}
                    {section.label === "CONTATO" && whatsApp &&
                      (
                        <a
                          href={`https://api.whatsapp.com/send?phone=${whatsApp?.whatsAppNumber}&text=${whatsApp?.whatsAppText}`}
                          class="flex flex-row rounded-[19px] border border-primary items-center cursor-pointer h-[38px] w-[214px] mt-[14px]"
                        >
                          <span class="block rounded-full bg-primary items-center pt-[6px] pb-[9px] pr-[7px] pl-2">
                            <Icon size={23} id="WhatsApp" />
                          </span>
                          <span class="text-sm font-medium leading-[22px] text-right w-full pr-[19px]">
                            {whatsApp?.whatsAppButtonText}
                          </span>
                        </a>
                      )}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col md:hidden gap-4 w-full">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow w-full rounded-none">
                  <input type="checkbox" class="min-h-[0] min-w-full" />
                  <div class="collapse-title col-start-0  min-h-[0] px-0 py-0 pb-1 flex gap-2 w-full min-w-full font-medium after:!right-1">
                    <span class="border-b w-full text-sm leading-[22px] uppercase">
                      {section.label}
                    </span>
                  </div>
                  <div class="collapse-content px-0">
                    <ul
                      class={`flex flex-col pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block text-base leading-[25px] font-normal uppercase text-primary"
                            target={item.newTab ? "_blank" : ""}
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
