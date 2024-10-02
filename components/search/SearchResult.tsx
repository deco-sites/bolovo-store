import type { AppContext } from "$store/apps/site.ts";
import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { getColorRelatedProducts } from "$store/components/search/CategoryMenu.tsx";
import type { Section } from "$store/components/search/PhotoAndProducts.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import LazyImagesJS from "site/components/ui/LazyLoadImages.tsx";
import ShowMore from "site/islands/ShowMore.tsx";
import ProductGallery from "../product/ProductGallery.tsx";
import ButtonsPagination, {
  ButtonsPaginationProps,
} from "./ButtonsPagination.tsx";
import type { PropsNotFound } from "./NotFound.tsx";
import NotFound from "./NotFound.tsx";
import { usePartialSection } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";
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
  /** @format rich-text */
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
export function Result(
  {
    page,
    section,
    isMobile,
    filterColors,
    colorVariant,
    showColorVariants,
    card,
    url,
    hasBanner,
    buttonsPagination,
  }: Omit<Props, "page"> & {
    page: ProductListingPage;
    searchTerm: string;
    section?: Section;
    isMobile: boolean;
    url: string;
    isCategory?: boolean;
    card?: CardSEO;
  } & {
    colorVariant: {
      [productName: string]: Product[];
    };
  } & {
    hasBanner?: boolean;
  },
) {
  const { products, pageInfo } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;
  const nextPage = pageInfo.nextPage ? new URL(pageInfo.nextPage, url) : null;
  const partialUrl = nextPage ? new URL(nextPage.href) : null;
  if (pageInfo.nextPage && nextPage) {
    partialUrl?.searchParams.set("partial", "true");
  }
  const [department, category] = page.breadcrumb.itemListElement;
  return (
    <>
      <LazyImagesJS />
      <div class="lg:px-8 px-[15px] mb-[15px]">
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
        {buttonsPagination?.layoutPagination === "Ver mais"
          ? (
            <ShowMore pageInfo={pageInfo}>
              {partialUrl
                ? (
                  <button
                    id={`show-more-button-${pageInfo.currentPage}`}
                    class="hidden"
                    {...usePartialSection({
                      href: partialUrl.href,
                      mode: "append",
                    })}
                  >
                    Ver Mais
                  </button>
                )
                : null}
            </ShowMore>
          )
          : <ButtonsPagination page={page} props={buttonsPagination} />}
      </div>
      {department && category && (
        <SendEventOnLoad
          event={department && category
            ? {
              name: "acessou-categoria",
              params: {
                nome_departamento: department.name!,
                nome_categoria: category.name!,
              },
            }
            : {
              name: "acessou-departamento",
              params: {
                nome_departamento: department.name!,
              },
            }}
        />
      )}
    </>
  );
}
function SearchResult(
  props: Awaited<SectionProps<ReturnType<typeof loader>>> & {
    colorVariant: {
      [productName: string]: Product[];
    };
  },
) {
  const { page, notFound, searchTerm, section, isMobile, buttonsPagination } =
    props;
  if (!page || page?.products.length === 0) {
    return <NotFound props={notFound} searchedLabel={searchTerm} />;
  }
  return (
    <Result
      {...props}
      page={page}
      section={section}
      isMobile={isMobile}
      buttonsPagination={buttonsPagination}
    />
  );
}
export default SearchResult;
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { photoOnPLP, cardSEO, showColorVariants } = props;
  const section = photoOnPLP?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  const card = cardSEO?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  const term = new URLSearchParams(new URL(req.url).search).get("q");
  const isMobile = ctx.device !== "desktop";
  let colorRelated: {
    [productName: string]: Product[];
  } = {};
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
    isMobile,
    url: req.url,
    card,
    colorVariant: colorRelated || {},
  };
};
