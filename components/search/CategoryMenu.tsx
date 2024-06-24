import GalleryControls from "$store/islands/GalleryControls.tsx";
import type { Product, ProductListingPage } from "apps/commerce/types.ts";
import type { SectionProps } from "deco/types.ts";
import { FilterName } from "./SearchResultMenu.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { ButtonsPaginationProps } from "./ButtonsPagination.tsx";
import { useUI } from "../../sdk/useUI.ts";
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
  /**
   * @default Ver Tudos
   */
  labelViewAll?: string;
  categories?: Category[];
  buttonsPagination?: ButtonsPaginationProps;
  /**
   * @default ORDENAR
   */
  labelOrdenation?: string;
  labelsOfFilters?: {
    /**
     * @default Filtrar
     */
    labelFilter?: string;
    /**
     * @default Fechar
     */
    labelClose?: string;
  };
  filterColors?: Color[];
  filtersNames?: FilterName[];
  /** @description Choose if you would like to showcase the color variants in the product cards  */
  textFilters?: string;
  appliedFiltersText?: string;
  applyFiltersText?: string;
  removeFiltersText?: string;
}

function ResultCategory({
  page,
  currentCategory,
  parentCategory,
  subCategories,
  categoryURL,
  filterColors,
  filtersNames,
  textFilters,
  appliedFiltersText,
  applyFiltersText,
  removeFiltersText,
  url,
  labelOrdenation = "ORDENAR",
  labelsOfFilters = {
    labelFilter: "Filtrar",
    labelClose: "Fechar",
  },
  labelViewAll = "Ver Todos",
  isDesktop,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  currentCategory?: string;
  subCategories: {
    label: string;
    url: string;
  }[];
  parentCategory?: string;
  categoryURL?: string;
  url: string;
  isDesktop: boolean;
}) {
  const { filters, breadcrumb, sortOptions } = page;
  const { activePriceIntl } = useUI();

  return (
    <div>
      <GalleryControls
        subCategories={subCategories}
        parentCategory={parentCategory}
        currentCategory={currentCategory}
        categoryURL={categoryURL}
        sortOptions={sortOptions}
        filtersNames={filtersNames}
        filterColors={filterColors}
        textFilters={textFilters}
        appliedFiltersText={appliedFiltersText}
        applyFiltersText={applyFiltersText}
        removeFiltersText={removeFiltersText}
        filters={filters}
        url={url}
        breadcrumb={breadcrumb}
        priceIntl={activePriceIntl.value.active}
        labelOrdenation={labelOrdenation}
        labelsOfFilters={labelsOfFilters}
        labelViewAll={labelViewAll}
        isDesktop={isDesktop}
      />
    </div>
  );
}

function CategoryResult(props: SectionProps<ReturnType<typeof loader>>) {
  const {
    page,
    buttonsPagination,
    url,
    currentCategory,
    subCategories,
    parentCategory,
    categoryURL,
  } = props;

  if (!page) return null;

  return (
    <ResultCategory
      {...props}
      page={page}
      buttonsPagination={buttonsPagination}
      url={url}
      currentCategory={currentCategory}
      subCategories={subCategories}
      parentCategory={parentCategory}
      categoryURL={categoryURL}
    />
  );
}

export async function getColorRelatedProducts(
  products: Product[] | undefined,
  ctx: AppContext,
) {
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

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const { categories } = props;

  const url = new URL(req.url);
  const isDesktop = ctx.device === "desktop";

  const urlSegments = url.pathname.split("/").filter(Boolean);
  const firstSegment = urlSegments.length > 0 ? urlSegments[0] : null;
  const secondSegment = urlSegments.length > 1 ? urlSegments[1] : null;

  const foundCategory = categories?.filter(({ category }) =>
    category === firstSegment
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
      url: req.url,
      isDesktop,
    };
  } else {
    return {
      ...props,
      parentCategory: urlSegments[0] || "",
      currentCategory: urlSegments[0] || "",
      subCategories: [],
      categoryURL,
      url: req.url,
      isDesktop,
    };
  }
};

export default CategoryResult;
