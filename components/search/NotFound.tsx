import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import SearchedWord from "$store/islands/SearchedWord.tsx";
import { Picture, Source } from "https://denopkg.com/deco-cx/apps@0.25.13/website/components/Picture.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";
import type { Shelf } from "$store/components/search/SearchResult.tsx"

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

// function LoaderShelf({ shelfs }: PropsNotFound) {

//     const { listShelfs } = shelfs

//     if (!listShelfs[0].products || listShelfs[0].products.length === 0) {
//         return null;
//     }

//     return (
//         <div>{
//             listShelfs.map((shelf) => (
//                 <ProductShelf products={shelf.products} title={shelf?.title} layout={shelf?.layout} cardLayout={shelf?.cardLayout} seeMore={shelf?.seeMore} />

//             ))
//         }</div>
//     )
// }

function Container({ props, shelf }: { props: PropsNotFound, shelf: Shelf }) {
    const { title, imagem, stepsBySteps, theme, positionSteps} = props
    return (
        <div class="w-full flex justify-center items-center pt-12 pb-28 px-4 flex-col gap-7">
            <Image
                loading="lazy"
                width={106}
                height={106}
                src={imagem.src}
                alt={imagem.alt}
            >
            </Image>
            <div>
                <SearchedWord theme={theme} />

            </div>
            <p class={`uppercase font-bold text-center ${TEXT_COLOR[theme ?? "dark"]}`}>
                {title}
            </p>
            <ul class={`flex w-full flex-col gap-4 pt-8 lg:pt-16 justify-evenly ${POSITION_STEPS[positionSteps ?? "horizontal"]}`}>
                {stepsBySteps.map((step, index) => (
                    <li class={`flex flex-col ${POSITION_STEPS[positionSteps ?? "horizontal"]}`}>
                        <span class={`font-averia font-bold text-5xl italic text-center lg:text-start ${TEXT_COLOR[theme ?? "dark"]}`}>{index + 1}.</span>
                        <span class={`uppercase  text-center flex justify-center items-end flex-wrap ${TEXT_COLOR[theme ?? "dark"]}`}
                            dangerouslySetInnerHTML={{ __html: step.richeText }} ></span>
                    </li>
                ))}
            </ul>
            <ProductShelf {...shelf}/>
        </div>
    );

}


export default function NotFound({ props, shelf }: { props: PropsNotFound, shelf: Shelf }) {

    const { backgroundImage, } = props

    if (backgroundImage?.active) {
        return (
            <div class="relative w-full h-full">
                <Picture preload={false}>
                    <Source
                        media="(max-width: 1023px)"
                        fetchPriority={"auto"}
                        src={backgroundImage.mobile}
                        width={320}
                        height={465}
                    />
                    {/* add  souce mobile e desk */}
                    <Source
                        media="(min-width: 1024px)"
                        fetchPriority={"auto"}
                        src={backgroundImage.desktop}
                        width={1024}
                        height={505}
                    />
                    <img
                        class="w-full h-full absolute top-0 left-0 object-cover"
                        loading={"lazy"}
                        src={backgroundImage.desktop}
                        alt={backgroundImage.alt}
                    />
                </Picture>
                <div class="relative w-full h-ful bg-[#0000002e]">
                    <Container props={props} shelf={shelf} />
                </div>
            </div>
        )
    }

    return (
        <Container props={props} shelf={shelf} />
    )


}