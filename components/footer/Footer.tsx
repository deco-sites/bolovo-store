import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import type {ContactsProps} from "$store/components/footer/Contacts.tsx"
import LanguageSwitcher from "$store/components/header/Buttons/Language.tsx";
import { Country } from "$store/components/header/Header.tsx";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export type Item = {
  label: string;
  href: string;
  /** @format html */
  extraInfo?: HTMLWidget;
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


export interface SocialItem {
  label:
  | "Instagram"
  | "Youtube"
  | "Spotify"
  | "WhatsApp";
  link: string;
  newTab?: boolean
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Hiper" | "Visa" | "Amex" | "Boleto";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
    contacts?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  footerTexts?: FooterTexts;
  footerLogos?: FooterLogos[]
  countryFlag: Country[];
  contacts?: ContactsProps[];
   /** @format html */
  extraInfo?: string
  layout?: Layout;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
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
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  contacts = [
    {title:"instagram:", text:"@bolovopinheiros"},
    {title:"whats loja:", text:"(11) 91725-0298"},
    {title:"telefone:", text:"(11) 3086-1020"},
  ],
  countryFlag,
  extraInfo = "© BOLOVO | VNDA - TECNOLOGIA EM ECOMMERCE | CNPJ: 11625557/0001-34",
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
      contacts: false,
    },
  },
}: Props) {
  const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
  const _newsletter = layout?.hide?.newsletter ? <></> : (
    <Newsletter
      content={newsletter}
      layout={{
        tiled: layout?.variation == "Variation 4" ||
          layout?.variation == "Variation 5",
      }}
    />
  );
  const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
    <FooterItems
    sections={sections}
    justify={layout?.variation == "Variation 2" ||
      layout?.variation == "Variation 3"}
  />
  );
  const _social = layout?.hide?.socialLinks
    ? <></>
    : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
  const _payments = layout?.hide?.paymentMethods
    ? <></>
    : <PaymentMethods content={payments} />;
  const _apps = layout?.hide?.mobileApps
    ? <></>
    : <MobileApps content={mobileApps} />;
  const _region = layout?.hide?.regionOptions
    ? <></>
    : <RegionSelector content={regionOptions} />;
  const _links = layout?.hide?.extraLinks
    ? <></>
    : <ExtraLinks content={extraLinks} />;

  return (
    <footer
      class={`w-full flex flex-col pt-10 pb-[15px] gap-[15px] ${
        ColorClasses(layout)
      }`}
    >
      <div class="w-full">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col w-full flex-grow gap-5">
            <Divider class="border-primary" />
            <div class="flex flex-row justify-center pt-[45px] pb-[51px]">
              {_newsletter}
            </div>
            <Divider class="border-primary" />
            <div class="w-full flex flex-row items-center justify-between pl-[29px] pr-[25px] pt-[25px]">
              {footerLogos?.map((logo) => <img src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} />)}
            </div>
            <div class="text-center w-full pb-[49px] pt-[10px]">
              <Image
                class="mx-auto"
                src={footerTexts?.footerTitle ?? ""}
                alt={footerTexts?.alt}
                width={514}
                height={38}
              />
              <p class="pb-9 text-[11px] font-normal text-primary pt-5">{footerTexts?.subTitle}</p>
              <div
                 class="mx-auto max-w-[512px] font-normal text-xs leading-[22.8px] tracking-[2%]"
                 dangerouslySetInnerHTML={{ __html: footerTexts?.text ?? ""}}
               />
            </div>
            <div class="flex pb-[34px] w-full flex-grow gap-[30px] pl-[29px] pr-[25px]">
              {_sectionLinks}
            </div>
            <div class="border-b ml-7 mr-[25px]" />
            <div class="flex flex-row justify-between items-center pl-[29px] pr-[25px] w-full">
              <div class="flex flex-row items-center">
                <span class="font-medium leading-[22.4px] text-sm uppercase text-primary mr-[9px]">SIGA A BOLOVO</span>
                {_social}
              </div>
              <div class="flex flex-row items-center">
                <span class="font-medium leading-[22.4px] text-sm uppercase text-primary mr-1">MUDAR PAÍS</span>
                <LanguageSwitcher countryFlag={countryFlag} width={24} height={24} textClass="text-[14px]" />
              </div>
            </div>
            <Divider class="border-primary" />
            <div class="flex flex-col-reverse md:flex-row md:justify-center gap-[15px]">
               <div
                 class="text-center"
                 dangerouslySetInnerHTML={{ __html: extraInfo}}
               />
            </div>
          </div>
        )}
        {layout?.variation == "Variation 2" && (
          <div class="flex flex-col gap-10">
            <div class="flex flex-col md:flex-row gap-10">
              <div class="flex flex-col gap-10 lg:w-1/2">
                {_logo}
                {_social}
                {_payments}
                {_apps}
                {_region}
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
                {_newsletter}
                {_sectionLinks}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 3" && (
          <div class="flex flex-col gap-10">
            {_logo}
            <div class="flex flex-col lg:flex-row gap-14">
              <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
                {_newsletter}
                <div class="flex flex-col gap-10">
                  {_payments}
                  {_apps}
                </div>
              </div>
              <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
                <div class="flex flex-col md:flex-row gap-10">
                  {_sectionLinks}
                  {_social}
                </div>
                {_region}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
              <PoweredByDeco />
              {_links}
            </div>
          </div>
        )}
        {layout?.variation == "Variation 4" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
              {_sectionLinks}
              <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
                <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
                  <div class="lg:flex-auto">
                    {_payments}
                  </div>
                  <div class="lg:flex-auto">
                    {_social}
                  </div>
                </div>
                <div class="flex flex-col gap-10 lg:gap-10">
                  {_region}
                  {_apps}
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
              {_logo}
              <PoweredByDeco />
            </div>
          </div>
        )}
        {layout?.variation == "Variation 5" && (
          <div class="flex flex-col gap-10">
            {_newsletter}
            {layout?.hide?.newsletter ? <></> : <Divider />}
            {_logo}
            <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
              {_sectionLinks}
              <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
                {_payments}
                {_social}
                {_apps}
              </div>
            </div>
            <Divider />
            <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
              <PoweredByDeco />
              <div class="flex flex-col md:flex-row gap-10 md:items-center">
                {_links}
                {_region}
              </div>
            </div>
          </div>
        )}
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
