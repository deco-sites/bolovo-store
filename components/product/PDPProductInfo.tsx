import {
  HandleProductOnCartEvent,
  SendEventOnClick,
  SendEventOnLoad,
} from "$store/components/Analytics.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import NavigationDescription from "$store/islands/NavigationDescription.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { ADD_TO_CART_ID } from "site/components/product/AddToCartButton/common.tsx";
import type { Description } from "../../sdk/markdownToObj.ts";
import markdownToObj from "../../sdk/markdownToObj.ts";
import { useUI } from "../../sdk/useUI.ts";
import ProductSelector from "./ProductVariantSelector.tsx";

function PDPProductInfo(
  {
    page,
    reloadInSelector,
    buyButton,
    colorRelated,
    colors,
    activeDescriptionIntl,
  }: {
    page: ProductDetailsPage;
    reloadInSelector: boolean;
    buyButton: string;
    colorRelated?: Product[];
    colors: Color[];
    activeDescriptionIntl: boolean;
  },
) {
  const platform = usePlatform();
  const colorVariants = [];
  if (colorRelated) {
    for (const relatedProduct of colorRelated) {
      const additionalProperties = relatedProduct.additionalProperty;
      if (additionalProperties && additionalProperties.length > 0) {
        for (const property of additionalProperties) {
          const { value } = property;
          if (value && property.name !== "Tamanho" && property.name !== "Cor") {
            try {
              const parsedValue = JSON.parse(value);
              if (parsedValue && parsedValue.type === "cor") {
                const colorVariant = {
                  name: parsedValue.name as string,
                  url: relatedProduct.url as string,
                };
                colorVariants.push(colorVariant);
                break;
              }
            } catch (e) {
              console.log(e);
            }
          }
        }
      }
    }
  }

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }
  const {
    product,
  } = page;
  const {
    url,
    productID,
    offers,
    name = "",
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    price = 0,
    listPrice,
    salePrice,
    seller = "1",
    availability,
    priceIntl = 0,
    listPriceIntl,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const objDescription: Description | null = description
    ? markdownToObj(description)
    : null;
  const { activePriceIntl } = useUI();
  const currency = activePriceIntl.value.active
    ? offers?.offers[1]?.priceCurrency || "USD"
    : offers?.priceCurrency || "BRL";
  const productPrice = activePriceIntl.value.active
    ? priceIntl || 0
    : (salePrice ?? 0);
  const productListPrice = listPriceIntl || listPrice || 0;
  const discount = productPrice && productListPrice
    ? productListPrice - productPrice
    : 0;

  return (
    <div class="flex flex-col w-full p-4 lg:p-0">
      <div class="">
        <h1>
          <span class="font-semibold text-base capitalize">
            {name}
          </span>
        </h1>
        {/* Prices */}
        <div>
          <div class="flex flex-row gap-2 items-center">
            {(productListPrice ?? 0) > productPrice
              ? (
                <>
                  <span class="line-through text-base-300 text-base">
                    {formatPrice(productListPrice, currency)}
                  </span>
                  <span class="text-base font-light text-red-500">
                    {formatPrice(productPrice, currency) ?? " US$ 0,00"}
                  </span>
                </>
              )
              : (
                <span class="text-base font-light">
                  {formatPrice(productPrice, currency) ?? " US$ 0,00"}
                </span>
              )}
          </div>
        </div>
      </div>

      {/* Sku Selector */}
      <div class="mt-4 sm:mt-6">
        <ProductSelector
          product={product}
          reloadInSelector={reloadInSelector}
          priceIntl={activePriceIntl.value.active}
          colorRelated={colorVariants}
          colors={colors}
        />
      </div>
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 sm:mt-10 flex flex-col gap-2">
        {activePriceIntl.value.active
          ? productPrice
            ? (
              <>
                {platform === "vtex" && (
                  <>
                    <AddToCartButtonVTEX
                      url={url || ""}
                      name={name}
                      productID={productID}
                      productGroupID={productGroupID}
                      price={price}
                      discount={discount}
                      seller={seller}
                    />
                    <WishlistButton
                      variant="full"
                      productID={productID}
                      productGroupID={productGroupID}
                    />
                  </>
                )}
                {platform === "wake" && (
                  <AddToCartButtonWake
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                  />
                )}
                {platform === "linx" && (
                  <AddToCartButtonLinx
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                  />
                )}
                {platform === "vnda" && (
                  <AddToCartButtonVNDA
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    additionalProperty={additionalProperty}
                    buyButton={buyButton}
                  />
                )}
                {platform === "shopify" && (
                  <AddToCartButtonShopify
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                  />
                )}
              </>
            )
            : (
              <OutOfStock
                productID={productID}
                priceIntl={activePriceIntl.value.active}
              />
            )
          : availability === "https://schema.org/InStock"
          ? (
            <>
              {platform === "vtex" && (
                <>
                  <AddToCartButtonVTEX
                    url={url || ""}
                    name={name}
                    productID={productID}
                    productGroupID={productGroupID}
                    price={price}
                    discount={discount}
                    seller={seller}
                  />
                  <WishlistButton
                    variant="full"
                    productID={productID}
                    productGroupID={productGroupID}
                  />
                </>
              )}
              {platform === "wake" && (
                <AddToCartButtonWake
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "linx" && (
                <AddToCartButtonLinx
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
              {platform === "vnda" && (
                <AddToCartButtonVNDA
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                  additionalProperty={additionalProperty}
                  buyButton={buyButton}
                />
              )}
              {platform === "shopify" && (
                <AddToCartButtonShopify
                  url={url || ""}
                  name={name}
                  productID={productID}
                  productGroupID={productGroupID}
                  price={price}
                  discount={discount}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Description card */}
      <div class="mt-4 sm:mt-6">
        {objDescription
          ? (
            <div>
              <NavigationDescription
                descriptionProps={objDescription}
                activeDescriptionIntl={activeDescriptionIntl}
              />
            </div>
          )
          : null}
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        key={product.productID}
        event={{
          name: "acessou-produto",
          params: parseProductToEvent(product, productPrice),
        }}
      />
      <SendEventOnClick
        id={ADD_TO_CART_ID}
        event={{
          name: "adicionou-produto-ao-carrinho",
          params: parseProductToEvent(
            product,
            productPrice,
            1,
          ),
        } as HandleProductOnCartEvent}
      />
    </div>
  );
}

export const parseProductToEvent = (
  product: Product,
  price: number,
  quantity?: number,
) => (
  {
    nome_departamento: product.additionalProperty?.find((prop) =>
      prop.name?.toLowerCase() === "categoria"
    )?.value!,
    nome_produto: product.name!,
    preco_produto: price,
    id_produto: product.isVariantOf?.productGroupID!,
    cor: product.additionalProperty?.find((prop) =>
      prop.name?.toLowerCase() === "cor"
    )
      ?.value!,
    tamanhos: product.additionalProperty?.find((prop) =>
      prop.name?.toLowerCase() === "tamanho"
    )
      ?.value!,
    url_produto: product.url!,
    sku_produto: product.sku,
    ...(quantity ? { quantidade: quantity } : null),
  }
);

export default PDPProductInfo;
