import { useSignal } from "@preact/signals";
import Icon from "../../ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";
import { variantAvailability } from "$store/sdk/useVariantPossiblities.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useCart } from "apps/vnda/hooks/useCart.ts";

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

  const loading = useSignal(0);
  const show = useSignal(false);

  const { addItem } = useCart();
  const onAddItem = async (id: string) => {
    try {
      loading.value = 1;

      await addItem({
        quantity: 1,
        itemId: await id,
        attributes: Object.fromEntries(
          additionalProperty.map(({ name, value }) => [name, value]),
        ),
      });
    } finally {
      loading.value = 2;
      setTimeout(() => {
        loading.value = 0;
        show.value = false;
      }, 1000);
    }
  };

  function SkuSelector() {
    return (
      <>
        {variants && variants.length !== 1
          ? variants?.map((variant) => (
            <li
              class={`ease-in-out duration-500 delay-300`}
            >
              {variant.inStock
                ? (
                  <button
                    onClick={async () => {
                      await onAddItem(variant.id ?? "");
                    }}
                    class="hover:font-semibold"
                  >
                    {variant?.size?.substring(2, 0)}
                  </button>
                )
                : (
                  <button class="text-[#E0E0E0] cursor-not-allowed relative false w-auto flex items-center justify-center group/number ">
                    <span class="cursor-not-allowed false flex h-6 w-6 text-center items-center justify-center">
                      {variant?.size?.substring(2, 0)}
                    </span>
                    <span class="false absolute border-b border-[#E0E0E0] rotate-[-45deg] w-[24px]">
                    </span>
                  </button>
                )}
            </li>
          ))
          : <BuyButton />}
      </>
    );
  }

  function BuyButton() {
    return (
      <li class="w-full">
        {availability === "https://schema.org/InStock"
          ? (
            <button
              class="text-primary w-full m-auto uppercase hover:font-semibold"
              onClick={async () => {
                await onAddItem(productID ?? "");
              }}
            >
              Adicionar ao carrinho
            </button>
          )
          : (
            <button class="text-[#E0E0E0] cursor-not-allowed relative false w-auto flex items-center justify-center group/number ">
              <span class="cursor-not-allowed false flex h-6 w-6 text-center items-center justify-center uppercase">
                Produto indisponivel
              </span>
              <span class="false absolute border-b border-[#E0E0E0] rotate-[-45deg] w-[34px]">
              </span>
            </button>
          )}
      </li>
    );
  }

  function defineAction(id: string) {
    console.log(variants, variants?.length);

    if (variants) {
      if (variants.length > 1) {
        show.value = !show.value;
      } else {
        onAddItem(id);
      }
    } else {
      onAddItem(id);
    }
  }

  return (
    <div
      className={`flex flex-row-reverse p-2 absolute bottom-0 right-0 z-10 ease-in-out duration-500 transition-width w-full min-h-[40px] ${
        show.value || loading.value !== 0
          ? " bg-base-100 translate-y-0"
          : " bg-transparent lg:bg-white translate-y-[100%]"
      } ${customClass}`}
    >
      {loading.value === 0 && (
        <>
          <button
            onClick={() => defineAction(productID)}
            class={`${!show.value ? "translate-y-[-145%]" : "translate-y-0"}`}
          >
            {!show.value
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
              show.value ? "w-full flex" : "w-0 hidden"
            } flex-row gap-2 justify-around lg:w-full lg:flex text-[15px] flex-wrap gap-x-1`}
          >
            {variants ? <SkuSelector /> : <BuyButton />}
          </ul>
        </>
      )}

      {loading.value === 1 && (
        <span className="loading loading-spinner m-auto h-[23px] w-[23px]">
        </span>
      )}
      {loading.value === 2 && (
        <div class="m-auto">
          <Icon id="Check" size={24} />
        </div>
      )}
    </div>
  );
}
