import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import {
  HandleProductOnCartEvent,
  ProductParam,
} from "site/components/Analytics.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
    listIntl?: number;
  };
  size?: string;
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;
  priceIntl?: boolean;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => ProductParam | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    priceIntl,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list, listIntl }, quantity, size } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const listProduct = priceIntl ? listIntl : list;
  const priceProduct = priceIntl ? listIntl : sale;

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        {...image}
        width={105}
        height={105}
        class="h-full object-contain"
      />

      <div class="flex flex-col gap-2 pl-8">
        <p class="text-[0.938rem] leading-5 text-[#121212] font-semibold max-w-[244px] text-ellipsis overflow-hidden">
          {name}
        </p>
        <div class="flex items-center gap-2 flex-row w-full justify-start">
          {(listProduct ?? 0) > (priceProduct ?? 0)
            ? (
              <>
                <span class="line-through text-base-300 text-base">
                  {formatPrice(listProduct, currency)}
                </span>
                <span class="text-base font-normal text-red-500">
                  {formatPrice(priceProduct, currency, locale)}
                </span>
              </>
            )
            : (
              <span class="text-base font-normal text-[#121212]">
                {formatPrice(priceProduct, currency, locale)}
              </span>
            )}

          {size && (
            <span class="text-sm text-[#121212] font-normal">
              Tam: {priceIntl
                ? size.substring(4).replace("|", "")
                : size.substring(0, 2)}
            </span>
          )}
        </div>
        <div class="flex flex-row justify-between items-center">
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                analyticsItem.quantidade = diff;

                sendEvent({
                  name: diff < 0
                    ? "removeu-produto-do-carrinho"
                    : "adicionou-produto-ao-carrinho",
                  params: analyticsItem,
                } as HandleProductOnCartEvent);
              }
            })}
          />
          <div class="flex justify-between items-center">
            <Button
              disabled={loading || isGift}
              loading={loading}
              class="btn btn-ghost p-0 hover:bg-white"
              onClick={withLoading(async () => {
                const analyticsItem = itemToAnalyticsItem(index);

                await onUpdateQuantity(0, index);

                analyticsItem && sendEvent({
                  name: "removeu-produto-do-carrinho",
                  params: analyticsItem,
                } as HandleProductOnCartEvent);
              })}
            >
              <Icon id="Trash" height={20} width={17} class="border-none" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
