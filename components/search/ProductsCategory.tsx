import { Result } from "$store/components/search/ProductsResult.tsx";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import NotFound from "./NotFound.tsx";
import type { PropsNotFound } from "./NotFound.tsx";
import type { SectionProps } from "deco/types.ts";
import type { Section } from "$store/components/search/PhotoAndProducts.tsx";
import { Color } from "$store/components/search/SearchResult.tsx";
import { ButtonsPaginationProps } from "./ButtonsPagination.tsx";
import type { CardSEO } from "$store/components/search/SearchResult.tsx";
import type { AppContext } from "$store/apps/site.ts";

/** @titleBy category */
export interface Category {
  /** @description RegExp to enable this category on the current URL. Use /camisetas to display this on camisetas category  */
  matcher: string;
  category: string;
  url: string;
  /**
   * @description Subcategorias existentes
   */
  items?: {
    label: string;
    url: string;
  }[];
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  categories?: Category[];
  buttonsPagination?: ButtonsPaginationProps;
  /**
   * @title Highlights
   */
  photoOnPLP?: Section[];
  notFound: PropsNotFound;
  filterColors?: Color[];
  /** @description Choose if you would like to showcase the color variants in the product cards  */
  showColorVariants?: boolean;
  cardSEO?: CardSEO[];
}

function ResultCategory({
  page,
  section,
  isMobile,
  filterColors,
  colorVariant,
  showColorVariants,
  url,
  buttonsPagination,
  notFound,
  card,
  photoOnPLP,
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
  url: string;
  notFound: PropsNotFound;
  photoOnPLP?: Section[];
  card?: CardSEO;
} & { colorVariant: { [productName: string]: Product[] } }) {

  return (
    <div>
      <Result
        page={page}
        searchTerm={""}
        textSearch={""}
        section={section}
        isMobile={isMobile}
        buttonsPagination={buttonsPagination}
        notFound={notFound}
        photoOnPLP={photoOnPLP}
        filterColors={filterColors}
        url={url}
        card={card}
        colorVariant={colorVariant}
        showColorVariants={showColorVariants}
      />
    </div>
  );
}

function ProductsCategory(props: SectionProps<ReturnType<typeof loader>>) {
  const {
    page,
    notFound,
    section,
    isMobile,
    buttonsPagination,
    url,
    currentCategory,
    subCategories,
    parentCategory,
    categoryURL,
    photoOnPLP,
  } = props;

  if (!page || page?.products.length === 0) {
    return <NotFound props={notFound} searchedLabel={""} />;
  }

  return (
    <ResultCategory
      {...props}
      page={page}
      section={section}
      isMobile={isMobile}
      buttonsPagination={buttonsPagination}
      notFound={notFound}
      url={url}
      currentCategory={currentCategory}
      subCategories={subCategories}
      parentCategory={parentCategory}
      categoryURL={categoryURL}
      photoOnPLP={photoOnPLP}

    />
  );
}

export async function getColorRelatedProducts(products: Product[] | undefined, ctx: AppContext) {
  const colorRelated: { [productName: string]: Product[] } = {};

    for (const product of products || []) {
      let camisetaVariantProperty;

      for (const property of product.additionalProperty || []) {
        if (property.valueReference === "TAGS") {
          try {
            const data = JSON.parse(property.value || "");

            if (data.type === "variante_cor") {
              camisetaVariantProperty = data.name;
              break;
            }
          } catch (error) {
            console.error("Erro ao fazer parse do valor como JSON:", error);
          }
        }
      }

      if (camisetaVariantProperty) {
        const productList = await ctx.get({
          "__resolveType": "vnda/loaders/productList.ts",
          "typeTags": [{ key: "variante_cor", value: camisetaVariantProperty }],
        });
        if (productList && Array.isArray(productList)) {
          colorRelated[product.name || ""] = productList;
        }
      }
    }

  return colorRelated;
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { categories, photoOnPLP, cardSEO, showColorVariants } = { ...props };
  let colorRelated: { [productName: string]: Product[] } = {};

  if (showColorVariants) {
    try {
      colorRelated = await getColorRelatedProducts(props.page?.products, ctx);
    } catch (error) {
      console.error("Erro ao obter produtos relacionados por cor:", error);
    }
  }

  const url = new URL(req.url);

  const section = !url.search.includes("type_tags") &&
    photoOnPLP?.find(({ matcher }) =>
      new URLPattern({ pathname: matcher }).test(url)
    );

  const isMobile = req.headers.get("user-agent")!.includes("Mobile");

  const urlSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = urlSegments.length > 0 ? urlSegments[0] : null;
  const secondSegment = urlSegments.length > 1 ? urlSegments[1] : null;

  const foundCategory = categories?.filter(({ category }) =>
    category === firstSegment
  );

  const card = cardSEO?.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  const categoryURL = foundCategory?.[0]?.url;

  if (foundCategory && foundCategory.length > 0) {
    let currentCategory: string | undefined;
    let subCategories: { label: string; url: string }[] = [];

    if (secondSegment) {
      const foundSubCategory = foundCategory[0]?.items?.find(
        (subCategory) => subCategory.url === url.pathname,
      );

      currentCategory = foundSubCategory?.label;
    } else {
      currentCategory = foundCategory[0]?.category;
    }
    const parentCategory = foundCategory[0]?.category
      ? foundCategory[0]?.category
      : undefined;

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
      isMobile,
      url: req.url,
      photoOnPLP,
      card,
      colorVariant: colorRelated || {},
    };
  } else {
    return {
      ...props,
      parentCategory: urlSegments[0] || "",
      currentCategory: urlSegments[0] || "",
      subCategories: [],
      categoryURL,
      section,
      isMobile,
      url: req.url,
      photoOnPLP,
      card,
      colorVariant: colorRelated || {},
    };
  }
};

export default ProductsCategory;
