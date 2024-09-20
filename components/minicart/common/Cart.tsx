import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import type { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import { useCart } from "apps/vnda/hooks/useCart.ts";
import Icon from "$store/components/ui/Icon.tsx";
import InnerHTML from "$store/components/ui/InnerHTML.tsx";

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
  freeShippingValueColor: string;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
  cartTranslations?: {
    /** @format rich-text */
    freeShippingText?: string;
    ctaCheckout?: string;
    ctaBackStore?: string;
    modalCloseText?: string;
    cartIsEmpty?: string;
    buttonCartIsEmpty?: string;
    cartTitle?: string;
    gotFreeShipping?: string;
    cartTotalText?: string;
    installmentsText?: string;
  };
  priceIntl: boolean;
}

function Cart({
  items,
  total,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  freeShippingValueColor,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  cartTranslations,
  priceIntl,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;
  const { cart } = useCart();
  let totalCart = 0;
  if (cart) {
    cart.value?.relatedItems?.map((item) => totalCart += item.total);
  }
  console.log(items)
  console.log("TOTAL CART:", totalCart)
  const qtyInstalments = cart.value?.orderForm?.installments?.length;
  const valueInstallments = totalCart / qtyInstalments;
  const numberFormated = valueInstallments.toFixed(2);
  const installments = numberFormated.replace(".", ",");
  const checkoutUrlIntl = checkoutHref.concat("");

  return (
    <div>
      {isEmtpy
        ? (
          <div class="md:hidden flex flex-row w-full justify-end items-center">
            <span class="text-base mt-2">
              {cartTranslations?.modalCloseText}
            </span>
            <Button
              class="btn btn-ghost hover:bg-transparent disabled:bg-transparent md:hidden block p-4"
              onClick={() => displayCart.value = false}
            >
              <Icon
                id="XMark"
                size={25}
                strokeWidth={2}
                class="text-[#121212]"
              />
            </Button>
          </div>
        )
        : <></>}
      <div
        class="flex flex-col justify-center items-center overflow-hidden w-full"
        style={{
          minWidth: "calc(min(90vw, 425px))",
          maxWidth: "425px",
          height: "90vh",
        }}
      >
        {isEmtpy
          ? (
            <div class="flex flex-col gap-6">
              <span class="font-medium text-2xl">
                {cartTranslations?.cartIsEmpty}
              </span>
              <Button
                class="btn-outline"
                onClick={() => {
                  displayCart.value = false;
                }}
              >
                {cartTranslations?.buttonCartIsEmpty}
              </Button>
            </div>
          )
          : (
            <>
              <div class="flex flex-row justify-between w-full md:mt-0 mt-4">
                <div class="flex flex-col md:flex-row text-[0.938rem] leading-[17px] justify-between w-full px-[18px] py-3">
                  <span class="font-semibold">
                    {cartTranslations?.cartTitle}
                  </span>
                  <span class="font-normal md:mt-0 mt-1">
                    {items.length} {items.length > 1 ? "ITEMS" : "ITEM"}
                  </span>
                </div>
                <Button
                  class="btn btn-ghost hover:bg-transparent disabled:bg-transparent md:hidden block p-4"
                  onClick={() => displayCart.value = false}
                >
                  <Icon
                    id="XMark"
                    size={25}
                    strokeWidth={2}
                    class="text-[#121212]"
                  />
                </Button>
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
                      priceIntl={priceIntl}
                    />
                  </li>
                ))}
              </ul>
              {/* Total */}
              <div class="border-t border-[#121212] opacity-30 w-[91%] flex justify-center px-[18px]" />
              <div class="pt-8 pb-2 flex flex-col justify-end items-end gap-2 w-full px-[18px]">
                <div class="flex justify-between items-center w-full font-semibold">
                  <span class="text-[0.938rem] leading-5">
                    {cartTranslations?.cartTotalText}
                  </span>
                  <span class="font-bold text-lg leading-6">
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
                {!priceIntl &&
                  (
                    <div
                      class={`flex flex-row items-center leading-5 text-[0.938rem] w-full ${
                        freeShippingTarget - total > 0
                          ? "justify-end"
                          : "justify-between"
                      }`}
                    >
                      {freeShippingTarget - total > 0
                        ? ""
                        : (
                          <div class="flex flex-row items-center font-semibold">
                            <span class="mt-1">
                              {cartTranslations?.gotFreeShipping}
                            </span>
                            <img
                              src="/image/Dog.gif"
                              alt="Dog"
                              width="46"
                              height="46"
                              class="ml-1"
                            />
                          </div>
                        )}
                      {!priceIntl &&
                        (
                          <span class="font-normal">
                            <InnerHTML
                              html={cartTranslations?.installmentsText?.replace(
                                "$valor",
                                `<span>${installments}</span>`,
                              ).replace(
                                "$instalments",
                                `<span>${qtyInstalments}</span>`,
                              ) ?? ""}
                            />
                          </span>
                        )}
                    </div>
                  )}
              </div>
              {/* Free Shipping Bar */}
              {!priceIntl &&
                (
                  <div class="px-[18px] w-full">
                    <FreeShippingProgressBar
                      freeShippingValueColor={freeShippingValueColor}
                      freeShippingText={cartTranslations?.freeShippingText}
                      total={total}
                      locale={locale}
                      currency={currency}
                      target={freeShippingTarget}
                    />
                  </div>
                )}
              {/* Cart Footer */}
              <footer class="w-full px-[18px]">
                <div class="pb-2">
                  <a
                    class="inline-block w-full"
                    href={priceIntl
                      ? `${checkoutHref}?language=en`
                      : checkoutHref}
                  >
                    <Button
                      class="btn btn-active btn-sm w-full rounded-[15px] bg-black text-white hover:bg-black"
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
                      {cartTranslations?.ctaCheckout}
                    </Button>
                  </a>
                </div>
                <div class="pb-4">
                  <div class="inline-block w-full">
                    <Button
                      class="btn btn-active btn-sm w-full rounded-[15px] bg-white border border-black hover:bg-white"
                      disabled={loading || isEmtpy}
                      onClick={() => {
                        displayCart.value = false;
                      }}
                    >
                      {cartTranslations?.ctaBackStore}
                    </Button>
                  </div>
                </div>
              </footer>
            </>
          )}
      </div>
    </div>
  );
}

export default Cart;
