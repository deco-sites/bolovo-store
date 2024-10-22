import { useId } from "$store/sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
const script = (id: string) => {
  const callback = () => {
    const KEY = "store-cookie-consent";
    const ACCEPTED = "accepted";
    const HIDDEN = "translate-y-[200%]";
    const consent = localStorage.getItem(KEY);
    const elem = document.getElementById(id);
    if (consent !== ACCEPTED && elem) {
      const accept = elem.querySelector("[data-button-cc-accept]");
      accept && accept.addEventListener("click", () => {
        localStorage.setItem(KEY, ACCEPTED);
        elem.classList.add(HIDDEN);
      });
      const close = elem.querySelector("[data-button-cc-close]");
      close &&
        close.addEventListener("click", () => elem.classList.add(HIDDEN));
      elem.classList.remove(HIDDEN);
    }
  };
  addEventListener("scroll", callback, { once: true });
};
export interface Props {
  title?: string;
  /** @format rich-text */
  text?: string;
  policy?: {
    text?: string;
    link?: string;
  };
  buttons?: {
    allowText: string;
    cancelText?: string;
  };
  layout?: {
    position?: "Expanded" | "Left" | "Center" | "Right";
    content?: "Tiled" | "Piled up";
  };
}
const DEFAULT_PROPS = {
  title: "Cookies",
  text:
    "Guardamos estatísticas de visitas para melhorar sua experiência de navegação.",
  policy: {
    text: "Saiba mais sobre sobre política de privacidade",
    link: "/politica-de-privacidade",
  },
  buttons: {
    allowText: "Aceitar",
    cancelText: "Fechar",
  },
  layout: {
    position: "Expanded",
    content: "Tiled",
  },
};
function CookieConsent(props: Props) {
  const id = useId();
  const { title, text, policy, buttons, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  return (
    <>
      <div
        id={id}
        class={`
          transform-gpu translate-y-[200%] transition fixed bottom-0 lg:bottom-2 w-screen z-50 lg:flex
          ${layout?.position === "Left" ? "lg:justify-start" : ""}
          ${layout?.position === "Center" ? "lg:justify-center" : ""}
          ${layout?.position === "Right" ? "lg:justify-end" : ""}
        `}
      >
        <div
          class={`
          p-4 mx-4 my-2 flex flex-col gap-4 shadow bg-white border border-base-200 
          ${
            !layout?.position || layout?.position === "Expanded"
              ? "lg:container lg:mx-auto"
              : `
            ${layout?.content === "Piled up" ? "lg:w-[480px]" : ""}
            ${
                !layout?.content || layout?.content === "Tiled"
                  ? "lg:w-[520px]"
                  : ""
              }
          `
          }
          ${
            !layout?.content || layout?.content === "Tiled"
              ? "lg:flex-row lg:items-end"
              : ""
          }
          
        `}
        >
          <div
            class={`flex-auto flex flex-col gap-4 ${
              !layout?.content || layout?.content === "Tiled" ? "lg:gap-2" : ""
            }`}
          >
            <h3 class="text-base leading-6 font-medium uppercase">{title}</h3>
            {text && (
              <div
                class="text-smfont-normal"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}

            <a href={policy.link} class="text-sm link link-primary">
              {policy.text}
            </a>
          </div>

          <div
            class={`flex flex-col gap-2 ${
              !layout?.position || layout?.position === "Expanded"
                ? "lg:flex-row"
                : ""
            }`}
          >
            <button
              class="btn btn-sm bg-primary hover:bg-primary text-white rounded-none"
              data-button-cc-accept
            >
              {buttons.allowText}
            </button>
            <button
              class="btn btn-sm rounded-none border hover:bg-transparent bg-transparent border-primary text-baserimary"
              data-button-cc-close
            >
              {buttons.cancelText}
            </button>
          </div>
        </div>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
export default CookieConsent;
