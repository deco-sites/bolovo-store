import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import markdownToObj from "../../sdk/markdownToObj.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import type { Description } from "../../sdk/markdownToObj.ts";
import NavigationDescription from "$store/islands/NavigationDescription.tsx";
import { useUI } from "../../sdk/useUI.ts";
import type { Color } from "$store/loaders/Layouts/ColorMap.tsx";

function PDPProductInfo(
  { page, reloadInSelector, buyButton, colorRelated, colors }: {
    page: ProductDetailsPage;
    reloadInSelector: boolean;
    buyButton: string;
    colorRelated?: Product[];
    colors: Color[];
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
    breadcrumbList,
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
  const productPrice = activePriceIntl.value.active ? priceIntl || 0 : price;
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
            {(productListPrice ?? 0) > productListPrice && (
              <span class="line-through text-base-300 text-base">
                {formatPrice(productListPrice, currency)}
              </span>
            )}
            <span class=" text-base font-light">
              {formatPrice(productPrice, currency) ?? " US$ 0,00"}
            </span>
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
              <NavigationDescription descriptionProps={objDescription} />
            </div>
          )
          : null}
      </div>
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </div>
  );
}

export default PDPProductInfo;
