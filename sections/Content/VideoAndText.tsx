import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Images {
    src: ImageWidget;
    alt: string;
}

export interface Props {
    /**
     * @title reversed order?
     */
    directionInverse?: boolean;

    /**
    * @title Image of title content
    * @description Infos of primary column
    */
    image: {
        src: ImageWidget;
        alt: string;
    };
    /**
     * @title Text content 
     * @format html 
     */
    textContent: string;

    /**
     * @title List of imagens
     */
    listImages: Images[]
    /**
     * @title Link of video 
     * @description Infos of second column
     */
    videoLink: string;

}

export default function VideoAndText({ directionInverse, image, textContent, listImages, videoLink }: Props) {
    return (
        <div class="flex flex-row px-2 w-full py-8 2xl:py-16">
            <div style={{ flexDirection: directionInverse ? "row-reverse" : "row" }} class="flex flex-row justify-center items-center gap-4 w-full">
                <div class="flex flex-col justify-between h-full items-center w-2/4 gap-3 2xl:gap-20">
                    <Image src={image.src} alt={image.alt} width={350} height={69} loading={"lazy"} class="max-w-[200px] md:max-w-[220px] xl:max-w-[350px] 2xl:max-w-[400px]" />
                    <div dangerouslySetInnerHTML={{ __html: textContent }} class=" font-acumin font-normal text-[10px] leading-4 lg:text-[13px] lg:leading-5 xl:text-sm xl:leading-6 2xl:text-base 2xl:leading-7">

                    </div>
                    <div class="flex flex-row gap-2">
                        {listImages.map((img) => {
                            return (
                                <div>
                                    <Image src={img.src} alt={img.alt} width={100} height={37} loading={"lazy"} class="max-w-[70px] xl:max-w-[100px] 2xl:max-w-[150px]" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div class="flex w-2/4 h-full">
                    <div class="w-full h-full">
                        <iframe width="560" height="315" src={videoLink + "?si=n_vAKsEE_BMTv0jn"} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            class={"w-full h-full"}
                            allowfullscreen>

                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}