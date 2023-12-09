export type Item = {
  label: string;
  href: string;
  newTab?: boolean
};

export type Section = {
  items: Item[];
};

export default function FooterItems(
  { items, justify = false }: { items: Section; justify: boolean },
) {
  return (
    <>
      
      {items.items.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden md:flex flex-row gap-6 lg:gap-10 ${
              justify && "lg:justify-between"
            }`}
          >
            <div class={`flex flex-col gap-4 flex-wrap text-sm`}>
              {items.items.map((item) => (
              <li>
                <a target={item.newTab ?  "_blank" : ""} href={item.href} class="block font-semibold text-base leading-[19px] uppercase">
                  {item.label}
                </a>
              </li>
              ))}
            </div>
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col mx-auto md:hidden gap-4">
          {items.items.map((item) => (
            <li>
              <a
                href={item.href}
                class="block font-semibold text-base leading-[19px] uppercase"
                >
                  {item.label}
              </a>
            </li>
          ))}
          </ul>
        </>
      )}
    </>
  );
}
