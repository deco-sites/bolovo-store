import { BACKGROUND_COLOR } from "../search/NotFound.tsx"
import Icon from "./Icon.tsx"

export interface PropsSearchedWord {
    theme: "dark" | "light";
    searchedLabel: string;
}

export const TEXT_COLOR = {
    "dark": "text-white",
    "light": "text-black",
}

export default function SearchedWord({ theme, searchedLabel }: PropsSearchedWord) {

    return (
        <div class={`flex flex-row w-auto rounded-full gap-2 justify-start items-center min-w-[287px] h-[48px] px-5 ${BACKGROUND_COLOR[theme ?? "dark"]}`}>
            <Icon id={"MagnifyingGlass"} class={`${TEXT_COLOR[theme ?? "dark"]}`} size={19}  >
            </Icon>
            <p class={`w-full text-center uppercase pr-7 font-medium ${TEXT_COLOR[theme ?? "dark"]}`}>
                {searchedLabel}
            </p>

        </div>
    )
}