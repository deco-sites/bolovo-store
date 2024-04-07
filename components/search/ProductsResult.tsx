import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery from "../product/ProductGallery.tsx";
import NotFound from "./NotFound.tsx";
import type { PropsNotFound } from "./NotFound.tsx";
import type { SectionProps } from "deco/types.ts";
import type { Section } from "$store/components/search/PhotoAndProducts.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ButtonsPagination, {
  ButtonsPaginationProps,
} from "./ButtonsPagination.tsx";
import type { AppContext } from "$store/apps/site.ts";
import { getColorRelatedProducts } from "./CategoryMenu.tsx";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  textSearch?: string;
  buttonsPagination?: ButtonsPaginationProps;
  notFound: PropsNotFound;
  /**
   * @title Highlights
   */
  photoOnPLP?: Section[];
  filterColors?: Color[]; 
  /** @description Choose if you would like to showcase the color variants in the product cards  */
  showColorVariants?: boolean;
  cardSEO?: CardSEO[];
}

export interface CardSEO {
  /** @title WARNING: Be careful not to configure the SEO Text on the same page where you are configuring the SEO Card */
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @format html */
  text: string;
}

export interface FilterName {
  /**
   * @title Filter name
   */
  filter: string;
  /**
   * @title New filter name
   */
  label: string;
}

export interface Color {
  /**
   * @title Color name
   */
  label: string;
  /**
   * @title Color
   * @format color
   */
  hex?: string;
  /**
   * @title Image
   */
  src?: ImageWidget;
}

export function Result({
  page,
  section,
  isMobile,
  filterColors,
  colorVariant,
  showColorVariants,
  card,
  hasBanner,
  buttonsPagination,
}:
  & Omit<Props, "page">
  & {
    page: ProductListingPage;
    searchTerm: string;
    section?: Section;
    isMobile: boolean;
    url: string;
    card?: CardSEO;
  }
  & { colorVariant: { [productName: string]: Product[] } }
  & { hasBanner?: boolean }) {
  const { products, pageInfo } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  return (
    <>
      <div class="lg:px-8 px-[15px]">
        <div class="flex-grow">
          <ProductGallery
            products={products}
            offset={offset}
            photoOnPLP={section}
            page={page}
            isMobile={isMobile}
            cardSEO={card}
            hasBanner={hasBanner}
            colorVariant={colorVariant}
            colors={filterColors}
            showColorVariants={showColorVariants}
          />
        </div>
        <ButtonsPagination page={page} props={buttonsPagination} />
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  props: SectionProps<ReturnType<typeof loader>> & {
    colorVariant: { [productName: string]: Product[] };
  },
) {
  const { page, notFound, searchTerm, section, isMobile, buttonsPagination } = props;

  if (!page || page?.products.length === 0) {
    return <NotFound props={notFound} searchedLabel={searchTerm} />;
  }

  return (
    <Result
      {...props}
      notFound={notFound}
      page={page}
      section={section}
      isMobile={isMobile}
      buttonsPagination={buttonsPagination}
    />
  );
}

export default SearchResult;

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { photoOnPLP, cardSEO, showColorVariants, notFound } = props;

  const section = photoOnPLP?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  const card = cardSEO?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  const term = new URLSearchParams(new URL(req.url).search).get("q");

  const isMobile = req.headers.get("user-agent")!.includes("Mobile");

  let colorRelated: { [productName: string]: Product[] } = {};

  if (showColorVariants) {
    try {
      colorRelated = await getColorRelatedProducts(props.page?.products, ctx);
    } catch (error) {
      console.error("Erro ao obter produtos relacionados por cor:", error);
    }
  }

  return {
    ...props,
    searchTerm: term ?? "",
    section,
    notFound,
    isMobile,
    url: req.url,
    card,
    colorVariant: colorRelated || {},
  };
};
