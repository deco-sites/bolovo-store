import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "apps/vnda/mod.ts";
import { useUI } from "deco-sites/bolovo-store/sdk/useUI.ts";
import {
  Cookie,
  deleteCookie,
  getCookies,
  setCookie,
} from "std/http/cookie.ts";
import type { PropsNotFound } from "../search/NotFound.tsx";
import NotFound from "../search/NotFound.tsx";
import PDPGallerySlider from "./Gallery/PDPImageSlider.tsx";
import PDPProductInfo from "./PDPProductInfo.tsx";
import { SendEventOnLoad } from "deco-sites/bolovo-store/components/Analytics.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  reloadInSelector?: boolean;
  /**
   * @default Comprar
   */
  buyButton?: string;
  /** @title Color Configuration */
  colors: Color[];
  notFound: PropsNotFound;
}

export const loader = async (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  // Procurar pela type_tag desejada
  const typeTagProperty = props.page?.product.additionalProperty?.find((
    property,
  ) =>
    property["@type"] === "PropertyValue" && property.name === "variante_cor"
  );

  const { activeDescriptionIntl } = useUI();
  const cookies = getCookies(req.headers);

  if (cookies.language === "en") {
    activeDescriptionIntl.value.active = true;
    activeDescriptionIntl.value.value = cookies.language;

    const headers = new Headers();
    const cookie: Cookie = {
      name: "language",
      value: "en",
      path: "/",
      maxAge: 3600,
      secure: true,
      httpOnly: true,
      sameSite: "Lax",
    };
    setCookie(headers, cookie);
  } else {
    activeDescriptionIntl.value.active = false;
    activeDescriptionIntl.value.value = cookies.language;
    const headers = new Headers();
    deleteCookie(headers, "language");
  }

  const typeTagValue = typeTagProperty?.value;

  if (!typeTagValue) {
    return {
      ...props,
      colorRelated: null, // Não há type_tag definida, retornar null
    };
  }

  // Fazer a chamada para buscar os produtos com base na type_tag específica
  const data = await ctx.get({
    "__resolveType": "vnda/loaders/productList.ts",
    "typeTags": [{ key: "variante_cor", value: typeTagValue }],
  });

  return {
    ...props,
    colorRelated: data ?? [],
  };
};

function PageOfProduct(
  {
    page,
    reloadInSelector = false,
    colorRelated,
    colors,
    notFound,
    buyButton = "Comprar",
  }:
    & Props
    & { colorRelated: Product[] },
) {
  if (page === null) {
    return <NotFound props={notFound} searchedLabel={""} />;
  }

  const { activeDescriptionIntl } = useUI();

  return (
    <div class="pt-0 lg:py-11 lg:px-[8%] flex justify-center flex-col lg:flex-row md:gap-12 lg:gap-[6%] py-11">
      <div class="w-full lg:w-3/5">
        <PDPGallerySlider page={page} />
      </div>
      <div class="w-full lg:w-2/5 lg:max-w-[400px]">
        <PDPProductInfo
          page={page}
          reloadInSelector={reloadInSelector}
          colorRelated={colorRelated}
          colors={colors}
          buyButton={buyButton}
          activeDescriptionIntl={activeDescriptionIntl.value.active}
        />
      </div>
    </div>
  );
}

export default PageOfProduct;
