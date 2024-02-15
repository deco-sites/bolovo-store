import type { SectionProps } from "deco/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  sectionMenu: {
    /** @title */
    sectionTitle: string;
    menuItems: {
      label: string;
      href: string;
    }[];
  }[];
  /**
   * @default center
   */
  desktopButtonAlign?: "center" | "left";
}

export function loader(ctx: Props, req: Request) {
  const url = new URL(req.url);
  const { pathname } = url;

  return {
    ...ctx,
    pathname,
  };
}

function AsideMenu(
  { sectionMenu, pathname: currentUrl, desktopButtonAlign }: SectionProps<
    typeof loader
  >,
) {
  const currentSection = sectionMenu.find((sectionItem) =>
    sectionItem?.menuItems.find((item) => item.href === currentUrl)
  );

  const currentRoute = currentSection?.menuItems.find((item) =>
    item.href === currentUrl
  );

  return (
    <aside class="w-full text-primary font-medium flex lg:justify-end">
      <ul class="lg:flex flex-col gap-[10px] w-full hidden">
        {sectionMenu.map((sectionItem, index) => (
          <>
            <li
              class={`${
                index !== 0 && "border-t"
              } text-primary pt-2 font-medium`}
            >
              {sectionItem?.sectionTitle}
            </li>
            {sectionItem?.menuItems.map(
              (item, index) => (
                <li key={index}>
                  <a
                  class={`${
                    currentUrl === item.href ? "bg-primary text-white " : ""
                  } ${
                    desktopButtonAlign === "center"
                      ? "justify-center"
                      : "justify-start"
                  } flex items-center font-normal px-[10px] py-1 uppercase`}
                    
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </>
        ))}
      </ul>
      <div class="lg:hidden block w-full pb-5">
        <div class="collapse  collapse-arrow w-full rounded-none">
          <input type="checkbox" class="min-h-[0] min-w-full" />
            <div class="collapse-title text-white items-center col-start-0 min-h-[0] h-9 bg-black p-3 flex gap-2 w-full min-w-full font-medium after:!right-3">
              <span class="w-full text-sm leading-[22px] uppercase">
                {currentRoute?.label ?? "Menu"}
              </span>
            </div>
            <div class="collapse-content rounded-none px-0">
              <ul class="flex flex-col p-2 bg-neutral-100">
                {sectionMenu.map((sectionItem) =>  (
                  <>
                    <li class="text-primary font-semibold">
                      {sectionItem?.sectionTitle}
                    </li>
                    {sectionItem?.menuItems.map(
                      (item, index) => (
                        <li key={index}>
                          <a
                           class={`${
                             currentUrl === item.href ? "bg-primary text-white " : ""
                           } ${
                             desktopButtonAlign === "center"
                               ? "justify-center"
                               : "justify-start"
                           } flex items-center font-normal text-sm leading-[28px] px-[10px] uppercase`}
                             
                             href={item.href}
                           >
                             {item.label}
                           </a>
                         </li>
                         ),
                       )}
                     </>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
