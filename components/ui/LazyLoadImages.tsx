import { useScript } from "deco/hooks/useScript.ts";
import { Head } from "$fresh/runtime.ts";

function lazyLoadImages() {
    const setup = () => {
        const images = document.querySelectorAll("img");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const src = img.getAttribute("src");
                    const srcset = img.getAttribute("srcset");

                    if (src) {
                        img.src = src;
                        img.removeAttribute("src");
                    }

                    if (srcset) {
                        img.srcset = srcset;
                        img.removeAttribute("srcset");
                    }

                    observer.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
        });

        images.forEach((img) => {
            observer.observe(img);
        });
    };
    setup();
}

function LazyLoadImagesSection() {
    return (
        <Head>
            <script
                defer
                dangerouslySetInnerHTML={{
                    __html: useScript(lazyLoadImages),
                }}
            />
        </Head>
    );
}

export default LazyLoadImagesSection;
