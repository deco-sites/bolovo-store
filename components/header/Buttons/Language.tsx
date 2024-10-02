import Icon from "site/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import type { Country } from "$store/components/header/Header.tsx";
import { useEffect } from "preact/hooks";
import { useUI } from "../../../sdk/useUI.ts";

export interface Props {
  countryFlag: Country[];
  width?: number;
  height?: number;
  textClass?: string;
  class?: string;
  classFlags?: string;
}

export default function LanguageSwitcher(
  {
    countryFlag,
    width,
    height,
    textClass,
    class: _class = "",
    classFlags = "",
  }: Props,
) {
  const { activePriceIntl } = useUI();
  const cookieValue = useSignal<string>(
    activePriceIntl.value.value || countryFlag[0].languageAbbreviation,
  );

  function setLanguageCookie(languageCode: string) {
    document.cookie = "language=" + languageCode.toLowerCase() + "; path=/";
    location.reload();
  }
  useEffect(() => {
    const cookieName = "language";

    // Divide a string de cookies em pares chave/valor
    const cookiesArray = document.cookie.split(";");

    // Procura o cookie desejado na lista de cookies
    for (let i = 0; i < cookiesArray.length; i++) {
      const cookie = cookiesArray[i].trim();

      // Verifica se o cookie começa com o nome desejado
      if (cookie.startsWith(cookieName + "=")) {
        // Retorna o valor do cookie
        cookieValue.value = decodeURIComponent(
          cookie.substring(cookieName.length + 1),
        );
        activePriceIntl.value.value = cookieValue.value;
        activePriceIntl.value.active = cookieValue.value === "en"
          ? true
          : false;
        return; // Interrompe a execução após encontrar o cookie
      }
    }

    // Se o cookie não for encontrado, use um valor padrão
    cookieValue.value = countryFlag[0].languageAbbreviation;
  }, [cookieValue.value]);

  return (
    <>
      <details
        class={`dropdown px-0 ${_class}`}
      >
        <summary class=" btn px-0 md:px-2 flex flex-row flex-grow md:flex-nowrap border-none hover:border-none justify-between md:justify-normal bg-transparent hover:bg-transparent w-full">
          {countryFlag.map((iten) => (
            iten.languageAbbreviation.toLowerCase() ===
              cookieValue.value.toLowerCase() && (
              <div
                className="flex flex-row items-center"
                key={iten.countryLabel}
              >
                <Image
                  src={iten.countryImg.img}
                  alt={iten.countryImg.alt}
                  width={19}
                  height={12}
                  className={`w-[${width}] h-[${height}] mr-1`}
                />
                <span
                  className={`${
                    textClass ?? "text-[0.938rem]"
                  } uppercase font-normal`}
                >
                  {iten.countryLabel}
                </span>
              </div>
            )
          ))}
          <Icon
            id="ChevronDown"
            size={11}
            strokeWidth={2}
            fill="none"
          />
        </summary>
        <ul
          class={`p-2 shadow menu w-auto dropdown-content z-[1] bg-white rounded-box ${classFlags}`}
        >
          {countryFlag.map((iten) => {
            return (
              <button
                class="cursor-pointer m-1 flex justify-center items-center uppercase gap-2 h-8 px-0 flex-row flex-nowrap border-none hover:border-none bg-transparent hover:bg-transparent w-max text-base font-normal"
                onClick={() => setLanguageCookie(iten.languageAbbreviation)}
              >
                <Image
                  src={iten.countryImg.img}
                  alt={iten.countryImg.alt}
                  width={19}
                  height={12}
                  loading={"eager"}
                />
                {iten.countryLabel}
              </button>
            );
          })}
        </ul>
      </details>
    </>
  );
}
