import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import SearchedWord from "$store/islands/SearchedWord.tsx";
import { Picture, Source } from "https://denopkg.com/deco-cx/apps@0.25.13/website/components/Picture.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import type { Props } from "$store/components/product/ProductShelf.tsx"

export interface PropsNotFound {
    title: string;
    imagem: {
        src: ImageWidget;
        alt: string;
    };
    /** @default "dark" */
    theme: "dark" | "light";
    stepsBySteps: RichText[];
    positionSteps: "horizontal" | "vertical";
    backgroundImage?: {
        active?: boolean;
        mobile: ImageWidget;
        desktop: ImageWidget
        alt: string;
    };
    shelfs: {
        primaryShelf: Props;
        secondShelf: Props;
    }
}

export const BACKGROUND_COLOR = {
    "dark": "bg-black",
    "light": "bg-white",
}

export const TEXT_COLOR = {
    "dark": "text-black",
    "light": "text-white",
}

const POSITION_STEPS = {
    "horizontal": "lg:flex-row",
    "vertical": "lg:flex-col items-center",
}

function Container({ props }: { props: PropsNotFound }) {
    const { title, imagem, stepsBySteps, theme, positionSteps} = props;

    return (
        <div class="w-full flex justify-center items-center pt-12 pb-28 px-4 flex-col gap-7 ">
            <Image
                loading="lazy"
                width={106}
                height={106}
                src={imagem.src}
                alt={imagem.alt}
                class=" animate-spin-slow"
            >
            </Image>
            <div>
                <SearchedWord theme={theme} />

            </div>
            <p class={`uppercase font-bold text-center ${TEXT_COLOR[theme ?? "dark"]}`}>
                {title}
            </p>
            <ul class={`flex w-full flex-col gap-4 pt-8 lg:pt-16 pb-12 justify-evenly ${POSITION_STEPS[positionSteps ?? "horizontal"]}`}>
                {stepsBySteps.map((step, index) => (
                    <li class={`flex flex-col ${POSITION_STEPS[positionSteps ?? "horizontal"]}`}>
                        <span class={`font-averia font-bold text-5xl italic text-center lg:text-start ${TEXT_COLOR[theme ?? "dark"]}`}>{index + 1}.</span>
                        <span class={`uppercase  text-center flex justify-center items-end flex-wrap ${TEXT_COLOR[theme ?? "dark"]}`}
                            dangerouslySetInnerHTML={{ __html: step.richeText }} ></span>
                    </li>
                ))}
            </ul>
        </div>
    );

}


export default function NotFound({ props }: { props: PropsNotFound }) {

    const { backgroundImage, shelfs } = props
    const { primaryShelf, secondShelf } = shelfs;

    if (backgroundImage?.active) {
        return (
            <div class="flex flex-col w-full h-full">
                <div class="relative w-full h-full">
                    <Picture preload={false}>
                        <Source
                            media="(max-width: 641px)"
                            fetchPriority={"auto"}
                            src={backgroundImage.mobile}
                            width={375}
                            height={400}
                        />
                        <Source
                            media="(min-width: 642px and max-width: 1023px)"
                            fetchPriority={"auto"}
                            src={backgroundImage.mobile}
                            width={1023}
                            height={465}
                        />
                        <Source
                            media="(min-width: 1024px and max-width: 1365px)"
                            fetchPriority={"auto"}
                            src={backgroundImage.desktop}
                            width={1024}
                            height={465}
                        />
                        <Source
                            media="(min-width: 1366)"
                            fetchPriority={"auto"}
                            src={backgroundImage.desktop}
                            width={1366}
                            height={610}
                        />
                        <img
                            class="w-full h-full absolute top-0 left-0 object-cover"
                            loading={"lazy"}
                            src={backgroundImage.mobile}
                            alt={backgroundImage.alt}
                        />
                    </Picture>
                    <div class="relative w-full h-ful bg-[#0000002e]">
                        <Container props={props} />
                    </div>
                </div>
                <ProductShelf products={primaryShelf.products} title={primaryShelf.title} layout={primaryShelf.layout} cardLayout={primaryShelf.cardLayout} seeMore={primaryShelf.seeMore} />
                <ProductShelf products={secondShelf.products} title={secondShelf.title} layout={secondShelf.layout} cardLayout={secondShelf.cardLayout} seeMore={secondShelf.seeMore} />
            </div>

        )
    }

    return (
        <div class="flex flex-col w-full h-full">
            <Container props={props} />
            <ProductShelf products={primaryShelf.products} title={primaryShelf.title} layout={primaryShelf.layout} cardLayout={primaryShelf.cardLayout} seeMore={primaryShelf.seeMore} />
            <ProductShelf products={secondShelf.products} title={secondShelf.title} layout={secondShelf.layout} cardLayout={secondShelf.cardLayout} seeMore={secondShelf.seeMore} />
        </div>
    )


}