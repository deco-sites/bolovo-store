import { useEffect, useState } from 'preact/hooks';

interface IframeLoaderProps {
    videoLink: string;
}

const IframeLoader = ({ videoLink }: IframeLoaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = window.innerWidth < 765;

  useEffect(() => {

    const targetElement = document.getElementById('lazy-iframe');

    if (!targetElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, []);

  return isVisible ? (
    <iframe
      width={isMobile ? "400" : "560"}
      height={isMobile ? "225" : "315"}
      src={videoLink + "?si=n_vAKsEE_BMTv0jn"}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      class="w-full h-full"
      allowFullScreen
    ></iframe>
  ) : (
    <div id="lazy-iframe" style={{ height: '315px' }}></div>
  );
};

export default IframeLoader;