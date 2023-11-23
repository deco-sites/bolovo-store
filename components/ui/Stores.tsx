import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Socials {
    label?: string;
    text?: string;
    href?: string;
}

export interface Props {
    hero:{
        media?: ImageWidget;
        altImg?: string;
    }
    content:{
        /** @format html */ 
        address?: string;
        storeName?: string;
        socials?: Socials[];
    }
    alignment?: 'left' | 'right';
  }

  function StoresDisplay({ hero,  content, alignment = 'left' }: Props) {
    /** @format html */ 
    content.address = '';

    const containerClasses = alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row';

    return (
        <div className="stores-features-section">
            <div className="container mx-auto py-10">
                <div className={`flex flex-col ${containerClasses}`}>
                    {/* Imagem */}
                    <div className="lg:w-1/2">
                        <img src={hero.media} alt={hero.altImg} className="object-cover w-full max-h-[577px]" />
                    </div>

                    {/* Título e Subtítulo */}
                    <div className="lg:w-1/2 px-10 lg:px-0 lg:py-16">
                        <div className={` bg-[#F6F6F6] ${alignment === 'right' ? 'lg:pr-20' : 'lg:pl-20'} md:h-full flex justify-center items-center feature-text-container relative py-10 lg:py-0`}>
                            {/* Título e Subtítulo */}
                            <div className={` flex flex-col max-w-[433px] ${alignment === 'right' ? 'lg:ml-auto' : 'lg:mr-auto'} gap-5`}>
                                <h4 className="text-base font-bold">{content.storeName}</h4>
                                <div className="text-base-300 leading-[26px]" dangerouslySetInnerHTML={{ __html: content.address ?? '' }} />
                                <ul>
                                {content.socials?.map(({ label, text, href }, index) => (
                                        <li key={index}>
                                            <a href={href}>
                                                <strong>{label}: </strong>
                                                {text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default StoresDisplay;