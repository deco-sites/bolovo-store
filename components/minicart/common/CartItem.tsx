import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
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
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

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
        style={{ aspectRatio: "105 / 105" }}
        width={105}
        height={105}
        class="h-full object-contain"
      />

      <div class="flex flex-col gap-2 pl-8">
        <span class="text-[15px] leading-5 text-[#121212] font-semibold">{name}</span>
        <div class="flex items-center gap-2 flex-row w-full justify-between">
          <span class="text-sm font-normal text-[#121212]">
            {formatPrice(list, currency, locale)}
          </span>
          <span class="text-sm text-[#121212] font-normal">
           Tam: G
          </span>
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
              analyticsItem.quantity = diff;

              sendEvent({
                name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                params: { items: [analyticsItem] },
              });
            }
          })}
        />
         <div class="flex justify-between items-center">
          <Button
            disabled={loading || isGift}
            loading={loading}
            variant="ghost"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
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
