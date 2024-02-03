import type { ItemAvailability, PropertyValue } from "apps/commerce/types.ts";

interface Props {
  productID: string;
  additionalProperty: PropertyValue[];
  availability: ItemAvailability | undefined;
  onAddItem: (productID: string, additionalProperty: PropertyValue[]) => void;
}

export default function BuyButton(
  { availability, productID, additionalProperty, onAddItem }: Props,
) {
  return (
    <li class="w-full hidden lg:flex">
      {availability === "https://schema.org/InStock"
        ? (
          <button
            class="text-primary w-full m-auto uppercase hover:font-semibold"
            onClick={() => onAddItem(productID, additionalProperty)}
          >
            Adicionar ao carrinho
          </button>
        )
        : (
          <button class="text-[#E0E0E0] cursor-not-allowed relative false w-auto flex items-center justify-center group/number ">
            <span class="cursor-not-allowed false flex h-6 w-6 text-center items-center justify-center uppercase">
              Produto indisponivel
            </span>
            <span class="absolute border-b border-[#E0E0E0] rotate-[-45deg] w-[34px]">
            </span>
          </button>
        )}
    </li>
  );
}
