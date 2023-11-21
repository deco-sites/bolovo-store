import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import { useCart } from "apps/vnda/hooks/useCart.ts";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;
  const { cart } = useCart();
  let totalCart = 0;
  if(cart){
    cart.value?.relatedItems?.map((item) => totalCart += item.total)
  }
  const valueInstallments = totalCart / 6;
  const numberFormated = valueInstallments.toFixed(2);
  const installments = numberFormated.replace('.', ',');

  
  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <Button
              class="btn-outline"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Escolher produtos
            </Button>
          </div>
        )
        : (
          <>
          <div class="flex flex-row text-[15px] leading-[17px] justify-between w-full px-[18px] py-3">
            <span class="font-semibold">CARRINHO DE COMPRAS</span>
            <span class="font-normal">{items.length} {items.length > 1 ? "ITEMS" : "ITEM"}</span>
          </div>
            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-[18px] flex-grow overflow-y-auto flex flex-col gap-8 w-full pb-8"
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>
           
              {/* Total */}
              <div  class="border-t border-[#121212] opacity-30 w-[91%] flex justify-center px-[18px]"/>
              <div class="pt-8 pb-2 flex flex-col justify-end items-end gap-2 w-full px-[18px]">
                <div class="flex justify-between items-center w-full font-semibold">
                  <span class="text-[15px] leading-5">Total</span>
                  <span class="font-bold text-lg leading-6">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                <div class={`flex flex-row items-center leading-5 text-[15px] w-full ${freeShippingTarget - total > 0 ? "justify-end" : "justify-between"}`}>
                  {freeShippingTarget - total > 0 ? "" : 
                  <div class="flex flex-row items-center font-semibold"><span class="mt-1">Frete Grátis </span>
                   <img
                    src="/image/Dog.gif"
                    alt="Dog"
                    width="46"
                    height="46"
                    class="ml-1"
                   />
                  </div>}
                  <span class="font-normal ">{`R$ ${installments} em 6x`}</span>
                </div>
              </div>

             {/* Free Shipping Bar */}
          
             <div class="px-[18px] w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>
             

            {/* Cart Footer */}
            <footer class="w-full px-[18px]">
              <div class="pb-2">
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    variant="primary"
                    data-deco="buy-button"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    CHECKOUT
                  </Button>
                </a>
              </div>
              <div class="pb-4">
                <a class="inline-block w-full" href="/">
                  <Button
                    variant="secundary"
                    disabled={loading || isEmtpy}
                  >
                   CONTINUAR COMPRANDO
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
