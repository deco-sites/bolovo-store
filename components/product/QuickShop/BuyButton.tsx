import type { ItemAvailability, PropertyValue } from "apps/commerce/types.ts";

interface Props {
  productID: string;
  additionalProperty: PropertyValue[];
  availability: ItemAvailability | undefined;
  priceIntl: boolean;
  onAddItem: (productID: string, additionalProperty: PropertyValue[]) => void;
}

export default function BuyButton(
  { availability, productID, additionalProperty, priceIntl, onAddItem }: Props,
) {

  return (
    <li class="w-full hidden lg:flex">
      {availability === "https://schema.org/InStock"
        ? (
          <button
            class="text-primary w-full m-auto uppercase hover:font-semibold"
            onClick={() => onAddItem(productID, additionalProperty)}
          >
            {priceIntl ? "add to cart" : "Adicionar ao carrinho"}
          </button>
        )
        : (
          <button class="text-[#E0E0E0] cursor-not-allowed relative false flex items-center justify-center group/number w-full">
            <span class="cursor-not-allowed false flex h-6 text-center items-center justify-center uppercase w-full">
              {priceIntl ? "out of stock" : " Produto indisponivel"}
            </span>
            <span class="absolute border-b border-[#E0E0E0] rotate-[-45deg] w-[34px]">
            </span>
          </button>
        )}
    </li>
  );
}
