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
import Contacts from "$store/components/footer/Contacts.tsx"
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import type {ContactsProps} from "$store/components/footer/Contacts.tsx"
import type { HTMLWidget } from "apps/admin/widgets.ts";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  items: Item[];
};

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
  items?: Section;
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
  items = [
    {label:"login", href:"/"},
    {label:"ajuda", href:"/"},
    {label:"contato", href:"/"},
    {label:"lojas", href:"/"},
    {label:"compre pelo whatsapp", href:"/"},
  ],
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
      items={items}
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
  const _contacts = layout?.hide?.contacts ? <></> : <Contacts content={contacts} />

  return (
    <footer
      class={`w-full flex flex-col pt-10 pb-[15px] gap-[15px] ${
        ColorClasses(layout)
      }`}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        {(!layout?.variation || layout?.variation == "Variation 1") && (
          <div class="flex flex-col gap-[15px] mx-[15px]">
            <div class="flex flex-col pb-20 md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
              <div class="lg:mb-0 mb-6">
               {_logo}
               {_payments}
              </div>
              {_sectionLinks}
              <div class="flex flex-col gap-5 lg:my-0 my-6">
                {_contacts}
                {_social}
              </div>
              <div class="lg:mx-0 mx-auto">
                {_newsletter}
              </div>
            </div>
            <Divider />
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
