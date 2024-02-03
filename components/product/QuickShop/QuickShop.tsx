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
}

export default function QuickShop({ product, customClass }: Props) {
  const {
    productID,
    offers,
    isVariantOf,
    additionalProperty = [],
  } = product;

  const { availability } = useOffer(offers);
  const variants = isVariantOf && variantAvailability(isVariantOf);

  const stepsQuickShop = useSignal(0);
  const showQuickShop = useSignal(false);

  const { addItem } = useCart();
  const onAddItem = async (
  id: string,
  additionalProperty: PropertyValue[],
) => {
  try {
    stepsQuickShop.value = 1;

    await addItem({
      quantity: 1,
      itemId: await id,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    });
  } finally {
    stepsQuickShop.value = 2;
    setTimeout(() => {
      stepsQuickShop.value = 0;
      showQuickShop.value = false;
    }, 1000);
  }
};

  function defineAction(id: string) {
    if (variants) {
      if (variants.length > 1) {
        showQuickShop.value = !showQuickShop.value;
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
        showQuickShop.value || stepsQuickShop.value !== 0
          ? " bg-base-100 translate-y-0"
          : " bg-transparent lg:bg-white translate-y-[100%]"
      } ${customClass}`}
    >
      {stepsQuickShop.value === 0 && (
        <>
          <button
            onClick={() => defineAction(productID)}
            class={`${
              !showQuickShop.value ? "translate-y-[-145%]" : "translate-y-0"
            }`}
          >
            {!showQuickShop.value
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
          <ul
            class={`${
              showQuickShop.value ? "w-full flex" : "w-0 hidden"
            } flex-row gap-2 justify-around lg:w-full lg:flex text-[15px] flex-wrap gap-x-1`}
          >
            {variants && (
              <SkuSelector
                variants={variants}
                productID={productID}
                availability={availability}
                additionalProperty={additionalProperty}
                onAddItem={onAddItem}
              />
            )}
          </ul>
        </>
      )}

      {stepsQuickShop.value === 1 && (
        <span className="loading loading-spinner m-auto h-[23px] w-[23px]">
        </span>
      )}
      {stepsQuickShop.value === 2 && (
        <div class="m-auto">
          <Icon id="Check" size={24} />
        </div>
      )}
    </div>
  );
}
