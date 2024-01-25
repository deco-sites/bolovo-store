import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import GalleryControls from "$store/islands/GalleryControls.tsx";
import { Result } from "$store/components/search/SearchResult.tsx"
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery from "../product/ProductGallery.tsx";
import NotFound from "$store/components/search/NotFound.tsx";
import type { PropsNotFound } from "$store/components/search/NotFound.tsx"
import type { SectionProps } from "deco/types.ts";
import type { Section } from "$store/components/search/PhotoAndProducts.tsx"

/**
 * @titleBy category
 */
export interface Category{
  /** @description RegExp to enable this category on the current URL. Use /camisetas to display this on camisetas category  */
  matcher: string;
  category: string;
  url: string
  /**
 * @description Subcategorias existentes
 */
  items?: { 
    label: string; 
    url: string
  }[]; 
}

export interface Props {
  /** @title Integration */
  categories: Category[];
  page: ProductListingPage | null;
  /**
  * @title Highlights 
  */
  photoOnPLP?: Section[];
  notFound: PropsNotFound;
}

function ResultCategory({
  page,
  currentCategory,
  parentCategory,
  subCategories,
  categoryURL,
  section,
  isMobile,
}: Omit<Props, "page"> & { 
  page: ProductListingPage;
  currentCategory?: string;
  subCategories: {
    label: string;
    url: string;
  }[];
  parentCategory?: string;
  categoryURL?: string;
  isMobile: boolean;
  section?: Section;
  
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  return (
    <div>
      <GalleryControls
        subCategories={subCategories}
        parentCategory={parentCategory}
        currentCategory={currentCategory}
        categoryURL={categoryURL}
        sortOptions={sortOptions}
        filters={filters}
        breadcrumb={breadcrumb}
      />
      <Result
        page={page}
        searchTerm={""}
        textSearch={""}
        section={section}
        isMobile={isMobile}
        isCategory={true}
      />
    </div>
  );
}

function CategoryResult(props: SectionProps<ReturnType<typeof loader>>) {
  const { page, notFound, section, isMobile } = props;

  if (!page || page?.products.length === 0) {
    return <NotFound props={notFound} searchedLabel={''}/>;
  }

  return <ResultCategory {...props} page={page} section={section} isMobile={isMobile} />;
}

export const loader = (props: Props, req: Request) => {
  
  const { categories, photoOnPLP } = props;

  const url = new URL(req.url);

  const section = photoOnPLP?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(url)
  );

  const isMobile = req.headers.get("user-agent")!.includes('Mobile')

  const urlSegments = url.pathname.split('/').filter(Boolean);
  const firstSegment = urlSegments.length > 0 ? urlSegments[0] : null;
  const secondSegment = urlSegments.length > 1 ? urlSegments[1] : null;

  const foundCategory = categories?.filter(({ category }) => category === firstSegment);

  const categoryURL = foundCategory[0]?.url;

  if (foundCategory && foundCategory.length > 0) {

    let currentCategory: string | undefined;
    let subCategories: { label: string; url: string }[] = [];

    if (secondSegment) {
      const foundSubCategory = foundCategory[0]?.items?.find(
        (subCategory) => subCategory.url === url.pathname
      );
      
      currentCategory = foundSubCategory?.label;
    }
    else{
      currentCategory = foundCategory[0]?.category;
    }
    const parentCategory = foundCategory[0]?.category ? foundCategory[0]?.category : undefined;

    if (foundCategory[0]?.items) {
      subCategories = foundCategory[0].items.map((subCategory) => ({
        label: subCategory.label,
        url: subCategory.url,
      }));
    }

    return {
      ...props,
      currentCategory,
      subCategories: subCategories.length > 0 ? subCategories : [],
      parentCategory,
      categoryURL,
      section,
      isMobile
    };
  } else {
    return {
      ...props,
      parentCategory: urlSegments[0] || '',
      currentCategory: urlSegments[0] || '',
      subCategories: [],
      categoryURL,
      section,
      isMobile
    };
  }
};

export default CategoryResult;
