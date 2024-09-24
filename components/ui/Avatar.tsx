/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-baserimary",
  "activePdp": "text-white",
};

interface Props {
  variant?: "active" | "disabled" | "default" | "activePdp";
  content: string;
  priceIntl?: boolean;
  inStock?: boolean;
}

const variants = {
  active: "font-semibold hover:border",
  activePdp: "bg-black",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default: "hover:border ",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder">
      <div
        class={`rounded-full w-8 h-8 ${colors[content] ?? colors[variant]} ${
          variants[variant]
        }`}
      >
        <span class="uppercase text-[0.875rem] text-[#121212] leading-[130%]">
          {content ? (colors[content] ? "" : content.substring(0, 2)) : ""}
        </span>
      </div>
    </div>
  );
}

export function AvatarPDP(
  { content, variant = "default", priceIntl, inStock }: Props,
) {
  return (
    <div class="avatar placeholder">
      <div
        class={`rounded-full w-8 h-5 ${colors[content] ?? colors[variant]} ${
          variants[variant]
        } ${variant === "activePdp" && !inStock ? "opacity-40" : ""}`}
      >
        <span
          class={`uppercase text-[0.875rem] leading-[130%] ${
            !inStock ? "opacity-20" : "opacity-100"
          }`}
        >
          {content
            ? (colors[content]
              ? ""
              : priceIntl
              ? content.substring(4).replace("|", "")
              : content.substring(0, 3).replace("|", ""))
            : ""}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
