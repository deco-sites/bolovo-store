import type { SectionProps } from "deco/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { JSX } from "preact";

export type AsideMenu = JSX.Element

export interface Props {
  sectionMenu: {
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

  if(!sectionMenu) {
    return null 
  }

  return (
    <aside class="w-full text-primary font-medium flex lg:justify-end">
      <ul class="lg:join join-vertical gap-[10px] w-full hidden">
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
                    class={`
                  ${
                      currentUrl === item.href
                        ? "bg-primary text-white border-none"
                        : ""
                    } ${sectionItem?.menuItems.length - 1 === index && "mb-2"}
                    ${
                      desktopButtonAlign === "center"
                        ? "justify-center"
                        : "justify-start"
                    }
                  btn btn-ghost btn-block border border-primary py-2 hover:bg-primary font-normal hover:text-white
                `}
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
      <div class="lg:hidden w-full pb-5">
        <div class="dropdown w-full text-sm font-normal">
          <label
            tabIndex={0}
            class="btn btn-primary btn-block justify-between border-none"
          >
            {currentRoute?.label ?? "Menu"}
            <Icon id="ChevronDown" width={26} height={26} />
          </label>
          <ul class="shadow menu dropdown-content z-10 bg-base-100 mt-5 rounded-box w-full gap-2">
            {sectionMenu.map((sectionItem) => (
              <>
                <li class="text-primary font-semibold">
                  {sectionItem?.sectionTitle}
                </li>
                {sectionItem?.menuItems.map(
                  (item, index) => (
                    <li key={index}>
                      <a
                        class={`
                      ${
                          currentUrl === item.href
                            ? "bg-primary text-white border-none"
                            : "text-prima"
                        }
                      hover:bg-primary hover:text-white
                    `}
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
    </aside>
  );
}

export default AsideMenu;
