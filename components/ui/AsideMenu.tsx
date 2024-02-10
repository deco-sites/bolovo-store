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
              } text-primary border-dashed pt-2 font-bold`}
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
        <div tabIndex={0} class="collapse collapse-arrow w-full rounded-none text-sm font-normal">
          <input type="checkbox" class="h-0 min-w-full" />
          <div class="collapse-title items-center text-sm text-white leading-[22px] uppercase bg-primary col-start-0 h-0 px-0 pl-3 py-0 flex gap-2 w-full min-w-full font-medium">
            {currentRoute?.label ?? "Menu"}
          </div>
          <ul class="collapse-content px-0 !pb-0 bg-neutral-100 rounded-none w-full gap-3">
            {sectionMenu.map((sectionItem) => (
              <div class="my-5 mx-2">
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
                    } flex items-center font-normal px-[10px] py-1 uppercase`}
                      
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                  ),
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default AsideMenu;
