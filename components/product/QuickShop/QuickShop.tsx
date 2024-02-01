import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";
import Icon from "../../ui/Icon.tsx";
import type { Product, PropertyValue } from "apps/commerce/types.ts";
import {
  useVariantPossibilities,
  variantAvailability,
} from "$store/sdk/useVariantPossiblities.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import Avatar from "../../ui/Avatar.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import ProductSelector from "$store/components/product/ProductVariantSelector.tsx";
import { skuid } from "$store/sdk/url.ts";
import { disableAll } from "../../../../../../AppData/Local/deno/npm/registry.npmjs.org/loglevel/1.9.1/index.d.ts";

export interface PropsT {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  url: string;
  onAddItem: () => Promise<void>;
}

export interface Props {
  product: Product;
}

export default function QuickShop({ product }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    additionalProperty = [],
  } = product;

  const [loading, setLoading] = useState(false);

  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments, availability } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);

  const variants = isVariantOf && variantAvailability(isVariantOf);

  const show = useSignal(false);

  const { addItem } = useCart();
  const onAddItem = async (id: string) => {
    try {
      setLoading(true);

      await addItem({
        quantity: 1,
        itemId: await id,
        attributes: Object.fromEntries(
          additionalProperty.map(({ name, value }) => [name, value]),
        ),
      });

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [{
            quantity: 1,
            price,
            item_url: url,
            item_name: name,
            item_id: productID,
            item_variant: name,
          }],
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const skuSelector = variants?.map((variant) => {
    return (
      <li>
        {variant.inStock
          ? (
            <button
              onClick={async () => {
                await onAddItem(variant.id ?? "");
              }}
            >
              {variant?.size?.substring(2, 0)}
            </button>
          )
          : (
            <button class="text-[#E0E0E0] cursor-not-allowed relative false md:w-[calc(10.3%_-_5px)] flex items-center justify-center group/number">
              <span class="cursor-not-allowed false flex h-6 w-6 text-center items-center justify-center">
                {variant?.size?.substring(2, 0)}
              </span>
              <span class="false absolute border-b border-[#E0E0E0] rotate-[-45deg] w-[34px]">
              </span>
            </button>
          )}
      </li>
    );
  });

  return (
    <div
      className={`flex flex-row-reverse p-2 absolute bottom-0 right-0 z-10 ease-in-out duration-500 transition-width ${
        show.value || loading ? "w-full bg-base-100" : "w-auto bg-transparent"
      }`}
    >
      {!loading
        ? (
          <>
            <button onClick={() => show.value = !show.value}>
              {!show.value
                ? <Icon id="QuickShop" size={24} />
                : <Icon id="Close" size={24} class="ml-2" />}
            </button>
            <ul
              class={`${
                show.value ? "w-full flex" : "w-0 hidden"
              } flex-row gap-2 justify-around`}
            >
              {skuSelector}
            </ul>
          </>
        )
        : (
          <span className="loading loading-spinner loading-lg m-auto h-5 w-5">
          </span>
        )}
    </div>
  );
}
