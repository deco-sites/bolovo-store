import Icon from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Instagram"
    | "Youtube"
    | "Spotify"
    | "WhatsApp";
  link: string;
  newTab?: boolean;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && (
            <h2 class="text-base font-bold leading-[26px] lg:mx-0 mx-auto">
              {content.title}
            </h2>
          )}
          <ul
            class={`flex md:gap-[7px] gap-2 ${
              vertical
                ? "lg:flex-col lg:items-start"
                : "flex-wrap lg:mx-0 mx-auto items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target={item.newTab ? "_blank" : ""}
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="block rounded-full bg-[#C6C6C6] p-[9px]">
                      <Icon size={20} id={item.label} />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
