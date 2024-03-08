import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import LanguageSwitcher from "$store/islands/Header/ButtonLanguage.tsx";
import { Country } from "$store/components/header/Header.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/bolovo-store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
  /** @format html */
  extraInfo?: HTMLWidget;
  newTab?: boolean;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface FooterLogos {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface FooterTexts {
  footerTitle: ImageWidget;
  alt: string;
  subTitle: string;
  /** @format html */
  text: string;
}

export interface WhatsApp {
  whatsAppButtonText?: string;
  whatsAppNumber?: string;
  whatsAppText?: string;
}

export interface SocialItem {
  label:
    | "Instagram"
    | "Youtube"
    | "Spotify"
    | "WhatsApp";
  link: string;
  newTab?: boolean;
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpTextDesktop?: string;
  /** @format html */
  helpTextMobile?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  hide?: {
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  newsletter?: {
    titleDesktop?: string;
    titleMobile?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  backToTheTop?: {
    text?: string;
  };
  footerTexts?: FooterTexts;
  footerLogos?: FooterLogos[];
  showLanguageVariant?: boolean;
  changeCountryText?: string;
  countryFlag: Country[];
  followBolovoText?: string;
  /** @format html */
  extraInfo?: string;
  layout?: Layout;
  whatsApp?: WhatsApp;
}

function Footer({
  newsletter = {
    titleDesktop: "Newsletter",
    titleMobile: "Newsletter",
    description: "",
    form: {
      placeholder: "",
      buttonText: "",
      helpTextDesktop: "",
      helpTextMobile: "",
    },
  },
  followBolovoText,
  changeCountryText,
  whatsApp,
  footerTexts,
  footerLogos,
  sections = [{
    "label": "Sobre",
    "items": [
      {
        "href": "/quem-somos",
        "label": "Quem somos",
      },
      {
        "href": "/termos-de-uso",
        "label": "Termos de uso",
      },
      {
        "href": "/trabalhe-conosco",
        "label": "Trabalhe conosco",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/centraldeatendimento",
        "label": "Central de atendimento",
      },
      {
        "href": "/whatsapp",
        "label": "Fale conosco pelo WhatsApp",
      },
      {
        "href": "/trocaedevolucao",
        "label": "Troca e devolução",
      },
    ],
  }],
  social,
  backToTheTop,
  showLanguageVariant,
  countryFlag,
  extraInfo,
  layout = {
    backgroundColor: "Primary",
    hide: {
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
      whatsApp={whatsApp}
      sections={sections}
      justify={false}
    />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} />;

  return (
    <footer
      class={`w-full flex flex-col pt-10 pb-[15px] gap-[15px] ${
        ColorClasses(layout)
      }`}
    >
      <div class="w-full">
        <div>
          <div class="flex flex-row justify-center pt-[45px] pb-[51px] md:pt-[65px] md:pb-[71px] md:bg-transparent bg-[#F6F6F6] border-y border-primary">
            {_newsletter}
          </div>
          <div class="flex flex-col w-full flex-grow gap-5">
            <div class="w-full flex flex-row items-center justify-between pl-[29px] pr-[25px] pt-[57px] md:pt-[45px]">
              {footerLogos?.map((logo) => (
                <img
                  src={logo.src}
                  width={logo.width}
                  height={logo.height}
                  alt={logo.alt}
                  loading="lazy"
                />
              ))}
            </div>
            <div class="text-center w-full pb-[19px] md:pb-[49px] pt-[10px]">
              <Image
                class="md:mx-auto px-4 md:px-0"
                src={footerTexts?.footerTitle ?? ""}
                alt={footerTexts?.alt}
                loading="lazy"
                width={514}
                height={38}
              />
              <p class="pb-9 text-[11px] font-normal text-primary pt-5">
                {footerTexts?.subTitle}
              </p>
              <div
                class="md:mx-auto px-4 md:px-0 md:max-w-[512px] w-full font-normal text-xs leading-[22px] tracking-[2%]"
                dangerouslySetInnerHTML={{ __html: footerTexts?.text ?? "" }}
              />
            </div>
            <div class="md:hidden flex flex-row items-center justify-center mb-[34px]">
              <span class="font-medium leading-[22px] text-sm uppercase text-primary mr-[11px]">
                {changeCountryText}
              </span>
              {showLanguageVariant && (
                <LanguageSwitcher
                  countryFlag={countryFlag}
                  width={24}
                  height={24}
                  textClass="text-[14px]"
                  class="w-auto "
                  classFlags="shadow-[0px_-3px_7px_2px_rgba(0, 0, 0, 0.1)] bottom-full"
                />
              )}
            </div>
            <div class="flex pb-[34px] w-full flex-grow gap-[30px] md:pl-[29px] ms:px-0 px-[15px] md:pr-[25px]">
              {_sectionLinks}
            </div>
            <div class="border-b ml-7 mr-[25px]" />
            <div class="flex flex-row justify-between items-center md:pl-[29px] md:pr-[25px] px-[15px] md:px-0 w-full">
              {whatsApp && (
                <a
                  href={`https://api.whatsapp.com/send?phone=${whatsApp.whatsAppNumber}&text=${whatsApp.whatsAppText}`}
                  class="md:hidden flex flex-row rounded-[19px] border border-primary items-center cursor-pointer h-[38px] w-[214px]"
                >
                  <span class="block rounded-full bg-primary items-center pt-[6px] pb-[9px] pr-[7px] pl-2">
                    <Icon size={23} id="WhatsApp" />
                  </span>
                  <span class="text-sm font-medium leading-[22px] text-right w-full pr-[19px]">
                    {whatsApp.whatsAppButtonText}
                  </span>
                </a>
              )}
              <div class="flex flex-row items-center">
                <span class="font-medium leading-[22px] text-sm uppercase text-primary mr-[9px] md:flex hidden">
                  {followBolovoText}
                </span>
                {_social}
              </div>
              <div class="md:flex hidden flex-row items-center">
                <span class="font-medium leading-[22px] text-sm uppercase text-primary mr-1">
                  {changeCountryText}
                </span>
                {showLanguageVariant && (
                  <LanguageSwitcher
                    countryFlag={countryFlag}
                    width={24}
                    height={24}
                    textClass="text-[14px] mt-1"
                    class="w-auto"
                    classFlags="shadow-[0px_-3px_7px_2px_rgba(0,0,0,0.1)] bottom-full"
                  />
                )}
              </div>
            </div>
            <div class="flex flex-col-reverse md:flex-row md:justify-center gap-[15px] border-t border-primary">
              <div
                class="text-center font-normal text-xs pt-[15px]"
                dangerouslySetInnerHTML={{ __html: extraInfo ?? "" }}
              />
            </div>
          </div>
        </div>
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
