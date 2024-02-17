import Icon from "deco-sites/bolovo-store/components/ui/Icon.tsx";
import type { AvailableIcons } from "deco-sites/bolovo-store/components/ui/Icon.tsx"
  
  export interface Props {
    cards: {
      heading: {
        /** @title */
        title: string;
        icon?: AvailableIcons;
      };
      content: {
        subtitle?: string;
        paragraphs?: string[];
      };
      links: {
        label: string;
        url: string;
        icon?: AvailableIcons;
      }[];
    }[];
  }
  
  function CardsContent({ cards }: Props) {
    return (
      <div class="flex flex-wrap gap-[30px] pb-12">
        {cards.map((card) => (
          <div class="card card-bordered rounded-none border-2 border-neutral-100 w-[360px]">
            <div class="card-body p-4">
              <div class="flex items-center gap-[10px] min-h-12 text-primary">
                <Icon id={card.heading.icon ?? "Instagram"}  width={24} height={24} />
                <h6 class="font-medium max-w-[87%] break-words">
                  {card.heading.title}
                </h6>
              </div>
              <div class="flex flex-col gap-[2px] text-sm text-black">
                <span class="font-bold">{card.content.subtitle}</span>
                {card.content.paragraphs &&
                  card.content.paragraphs.map((paragraph) => (
                    <p class="break-words">{paragraph}</p>
                  ))}
              </div>
              <div class="flex flex-col gap-[6px] items-start font-bold text-base-content">
                {card.links.map((link) => (
                  <a href={link.url} class="flex items-center gap-[10px] text-sm">
                    <Icon
                      id={link.icon ?? "Instagram"}
                      width={18}
                      height={18}
                      strokeWidth={2}
                    />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default CardsContent;
  