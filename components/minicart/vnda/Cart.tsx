import { itemToAnalyticsItem, useCart } from "apps/vnda/hooks/useCart.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import BaseCart from "../common/Cart.tsx";

export interface MiniCartProps{
  /**
   * @format color
   * @title Cor do valor do frete
   * @default #FFFFFF
   */
  freeShippingValueColor?: string
  freeShippingText?: HTMLWidget
  freeShippingTarget?: number
  ctaCheckout?: string
  ctaBackStore?: string
  modalCloseText?: string,
  cartIsEmpty?: string,
  buttonCartIsEmpty?: string,
  cartTitle?: string
  gotFreeShipping?: string
  cartTotalText?: string
  installmentsText?: string
}

const normalizeUrl = (url: string) =>
  url.startsWith("//") ? `https:${url}` : url;

function Cart({ctaCheckout, ctaBackStore, freeShippingTarget, freeShippingText,  freeShippingValueColor, modalCloseText,cartIsEmpty,buttonCartIsEmpty,cartTitle,gotFreeShipping,cartTotalText,installmentsText} : MiniCartProps) {
  const { cart, loading, updateItem, update } = useCart();
  const items = cart.value?.orderForm?.items ?? [];
  const total = cart.value?.orderForm?.total ?? 0;
  const subtotal = cart.value?.orderForm?.subtotal ?? 0;
  const discounts = cart.value?.orderForm?.subtotal_discount ?? 0;
  const locale = "pt-BR";
  const currency = "BRL";
  const coupon = cart.value?.orderForm?.coupon_code ?? undefined;
  const token = cart.value?.orderForm?.token;
  console.log( modalCloseText)
  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: normalizeUrl(item.image_url), alt: item.product_name },
        quantity: item.quantity,
        name: item.variant_name,
        price: {
          sale: item.variant_price,
          list: item.variant_price,
        },
      }))}
      modalCloseText={modalCloseText}
      cartIsEmpty={cartIsEmpty}
      buttonCartIsEmpty={buttonCartIsEmpty}
      cartTitle={cartTitle}
      gotFreeShipping={gotFreeShipping}
      cartTotalText={cartTotalText}
      installmentsText={installmentsText}
      total={total}
      subtotal={subtotal}
      discounts={discounts}
      locale={locale}
      currency={currency}
      ctaCheckout={ctaCheckout}
      ctaBackStore={ctaBackStore}
      loading={loading.value}
      freeShippingValueColor={freeShippingValueColor ?? "#121212"}
      freeShippingTarget={freeShippingTarget ?? 0}
      freeShippingText={freeShippingText ?? ""}
      coupon={coupon}
      checkoutHref={`/checkout/${token}`}
      onAddCoupon={(code) => update({ coupon_code: code })}
      onUpdateQuantity={(quantity: number, index: number) =>
        updateItem({ quantity, itemId: items[index].id })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
