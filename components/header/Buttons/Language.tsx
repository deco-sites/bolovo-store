import Icon from "deco-sites/bolovo-store/components/ui/Icon.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import type { Country } from "../Header"

export default function LanguageSwitcher({ countryFlag }: {
    countryFlag: Country[];
}) {
    return (
        <>
            <details className="dropdown px-0">
                <summary className=" btn px-2 flex flex-row flex-nowrap border-none hover:border-none bg-transparent hover:bg-transparent w-max uppercase text-base font-normal" >
                    <Image src={countryFlag[0].countryImg.img} alt={countryFlag[0].countryImg.alt} width={19} height={12} />
                    {countryFlag[0].countryLabel}
                    <Icon
                        id="ChevronDown"
                        size={11}
                        strokeWidth={2}
                        fill="none"
                    /></summary>
                <ul className="p-2 shadow menu w-auto dropdown-content z-[1] bg-base-100 rounded-box">
                    {countryFlag.map((iten) => {
                        return (
                            <button className=" cursor-pointer m-1 flex justify-center items-center uppercase gap-2 h-8 px-0 flex-row flex-nowrap border-none hover:border-none bg-transparent hover:bg-transparent w-max   text-base font-normal"
                                {...usePartialSection({ props: { Abbreviation: iten.languageAbbreviation } })}>
                                <Image src={iten.countryImg.img} alt={iten.countryImg.alt} width={19} height={12} loading={"eager"} />
                                {iten.countryLabel}
                            </button>
                        )
                    })}
                </ul>
            </details>
        </>
    )
}