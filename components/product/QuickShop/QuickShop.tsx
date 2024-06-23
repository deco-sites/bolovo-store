import { useSignal } from "@preact/signals";
import Icon from "../../ui/Icon.tsx";
import type { Product, PropertyValue } from "apps/commerce/types.ts";
import { variantAvailability } from "$store/sdk/useVariantPossiblities.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import SkuSelector from "./SkuSelector.tsx";

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
  customClass: string;
  priceIntl?: boolean;
}

type Steps = "loading" | "success" | "waiting" | "show";

export default function QuickShop(
  { product, customClass, priceIntl = false }: Props,
) {
  const {
    productID,
    offers,
    isVariantOf,
    additionalProperty = [],
  } = product;

  const { availability } = useOffer(offers);
  const variants = isVariantOf && variantAvailability(isVariantOf);
  const step = useSignal<Steps>("waiting");

  const { addItem } = useCart();
  const onAddItem = async (
    id: string,
    additionalProperty: PropertyValue[],
  ) => {
    try {
      step.value = "loading";

      await addItem({
        quantity: 1,
        itemId: await id,
        attributes: Object.fromEntries(
          additionalProperty.map(({ name, value }) => [name, value]),
        ),
      });
    } catch {
      step.value = "waiting";
    } finally {
      step.value = "success";
      setTimeout(() => {
        step.value = "waiting";
      }, 1000);
    }
  };

  function defineAction(id: string) {
    if (variants) {
      if (variants.length > 1) {
        step.value = step.value === "show" ? "waiting" : "show";
      } else {
        onAddItem(id, additionalProperty);
      }
    } else {
      onAddItem(id, additionalProperty);
    }
  }

  return (
    <div
      className={`flex flex-row-reverse p-2 absolute bottom-0 right-0 z-10 ease-in-out duration-500 transition-width w-full min-h-[40px] ${
        step.value !== "waiting"
          ? " bg-base-100 translate-y-0"
          : " bg-transparent lg:bg-white translate-y-[100%]"
      } ${customClass}`}
    >
      {(step.value != "loading" &&
        step.value != "success") && (
        <>
          <button
            onClick={() => defineAction(productID)}
            class={`${
              step.value === "waiting"
                ? "translate-y-[-145%] h-min"
                : "translate-y-0"
            }`}
          >
            {step.value === "waiting"
              ? (
                <Icon
                  id="QuickShop"
                  width={17}
                  height={18}
                  class="m-2 lg:hidden"
                />
              )
              : (
                <Icon
                  id="Close"
                  size={21}
                  class="ml-2 lg:hidden mt-[-2px] text-[#b8b8b8]"
                />
              )}
          </button>
          <ul class="w-full flex flex-row gap-2 justify-around lg:w-full lg:flex text-[0.938rem] flex-wrap gap-x-1">
            {variants && (
              <SkuSelector
                variants={variants}
                productID={productID}
                availability={availability}
                additionalProperty={additionalProperty}
                onAddItem={onAddItem}
                priceIntl={priceIntl}
              />
            )}
          </ul>
        </>
      )}

      {step.value === "loading" && (
        <span className="loading loading-spinner m-auto h-[23px] w-[23px]">
        </span>
      )}
      {step.value === "success" && (
        <div class="m-auto">
          <Icon id="Check" size={24} />
        </div>
      )}
    </div>
  );
}
