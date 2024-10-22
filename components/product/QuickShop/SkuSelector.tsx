import { VariantAvailability } from "../../../sdk/useVariantPossiblities.ts";
import type { ItemAvailability, PropertyValue } from "apps/commerce/types.ts";
import BuyButton from "./BuyButton.tsx";

interface Props {
  variants: VariantAvailability[] | null | undefined;
  productID: string;
  availability: ItemAvailability | undefined;
  additionalProperty: PropertyValue[];
  priceIntl: boolean;
  onAddItem: (id: string, additionalProperty: PropertyValue[]) => void;
}

export default function SkuSelector(
  {
    variants,
    productID,
    availability,
    additionalProperty,
    priceIntl,
    onAddItem,
  }: Props,
) {
  if (
    variants === undefined || variants === null || variants?.length == 0
  ) {
    return null;
  }

  return (
    <>
      {variants.length !== 1
        ? variants.map((variant) => (
          <li class="ease-in-out duration-500 delay-300">
            {variant.inStock
              ? (
                <button
                  onClick={() =>
                    onAddItem(
                      variant.id,
                      additionalProperty.map((item) => {
                        if (item.name === "Tamanho") {
                          item.value = variant.size;
                        }
                        return item;
                      }),
                    )}
                  class="hover:font-semibold"
                >
                  {priceIntl
                    ? variant.size?.substring(4).replace("|", "")
                    : variant.size?.substring(3, 0).replace("|", "")}
                </button>
              )
              : (
                <button class="text-[#E0E0E0] cursor-not-allowed relative false w-auto flex items-center justify-center group/number">
                  <span class="cursor-not-allowed false flex h-6 w-6 text-center items-center justify-center">
                    {priceIntl
                      ? variant.size?.substring(4).replace("|", "")
                      : variant.size?.substring(3, 0).replace("|", "")}
                  </span>
                  <span class="false absolute border-b border-[#E0E0E0] rotate-[-45deg] w-[24px]">
                  </span>
                </button>
              )}
          </li>
        ))
        : (
          <BuyButton
            productID={productID}
            additionalProperty={additionalProperty}
            availability={availability}
            onAddItem={onAddItem}
            priceIntl={priceIntl}
          />
        )}
    </>
  );
}
