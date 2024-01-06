import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonLinx from "$store/islands/AddToCartButton/linx.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import AddToCartButtonVNDA from "$store/islands/AddToCartButton/vnda.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import AddToCartButtonWake from "$store/islands/AddToCartButton/wake.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import markdownToHtml from "../../sdk/marktownToHTML.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm@0.3.0/mod.ts";



function PDPProductInfo({ page }: { page: ProductDetailsPage }) {
    const platform = usePlatform();

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
        gtin,
        isVariantOf,
        additionalProperty = [],
    } = product;
    const description = product.description || isVariantOf?.description;
    const {
        price = 0,
        listPrice,
        seller = "1",
        installments,
        availability,
    } = useOffer(offers);
    const productGroupID = isVariantOf?.productGroupID ?? "";
    const discount = price && listPrice ? listPrice - price : 0;

    return (
        <div class="flex flex-col w-full p-4">
            <div class="">
                <h1>
                    <span class="font-semibold text-base capitalize">
                        {name}
                    </span>
                </h1>
                {/* Prices */}
                <div>
                    <div class="flex flex-row gap-2 items-center">
                        {(listPrice ?? 0) > price && (
                            <span class="line-through text-base-300 text-xs">
                                {formatPrice(listPrice, offers?.priceCurrency)}
                            </span>
                        )}
                        <span class=" text-base">
                            {formatPrice(price, offers?.priceCurrency)}
                        </span>
                    </div>
                </div>
            </div>
            {/* Sku Selector */}
            <div class="mt-4 sm:mt-6">
                <ProductSelector product={product} />
            </div>
            {/* Add to Cart and Favorites button */}
            <div class="mt-4 sm:mt-10 flex flex-col gap-2">
                {console.log("teste", availability)}
                {availability === "https://schema.org/InStock"
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
                <span class="text-sm">
                    {console.log("prod", product)}
                    {description && (
                        < details >
                            {console.log("description", markdownToHtml(description))}
                            <summary class="cursor-pointer">Descrição</summary>
                            <div
                                class="ml-2 mt-2"
                                dangerouslySetInnerHTML={{ __html: markdownToHtml(description) }}
                            />
                            {/* {markdownToHtml(description)} */}
                            <style dangerouslySetInnerHTML={{ __html: CSS }} />
                            <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }} />
                            <div
                                class="markdown-body"
                                style={{ padding: "16px 32px" }}
                                dangerouslySetInnerHTML={{
                                    __html: render(description, {
                                        allowIframes: true,
                                        allowMath: true,
                                        disableHtmlSanitization: true,
                                    }),
                                }}
                            />
                        </details>
                    )}
                </span>
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
        </div >
    );
}

export default PDPProductInfo;
