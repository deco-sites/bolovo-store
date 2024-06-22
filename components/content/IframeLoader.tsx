import { useEffect, useRef } from "preact/hooks";

interface IframeLoaderProps {
  videoLink: string;
  preload?: boolean;
}

const IframeLoader = ({ videoLink, preload }: IframeLoaderProps) => {
  const targetElement = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const currentElement = targetElement.current;

    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentElement.src = videoLink;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(currentElement);

    return () => observer.disconnect();
  }, []);

  return (
    <iframe
      width={400}
      height={225}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      class="w-full h-full"
      allowFullScreen
      ref={targetElement}
      loading={preload ? "eager" : "lazy"}
    >
    </iframe>
  );
};

export default IframeLoader;
