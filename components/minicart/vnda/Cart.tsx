import { itemToAnalyticsItem, useCart } from "apps/vnda/hooks/useCart.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import BaseCart from "../common/Cart.tsx";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
export interface MiniCartProps {
  /**
   * @format color
   * @title Cor do valor do frete
   * @default #FFFFFF
   */
  freeShippingValueColor?: string;
  freeShippingTarget?: number;
  cartTranslations?: {
    /** @default Faltam R$ $valor para o frete grátis */
    freeShippingText?: HTMLWidget;
    /** @default CHECKOUT */
    ctaCheckout?: string;
    /** @default CONTINUAR COMPRANDO*/
    ctaBackStore?: string;
    /** @default Fechar */
    modalCloseText?: string;
    /** @default  Sua sacola está vazia */
    cartIsEmpty?: string;
    /** @default  Escolher Produtos */
    buttonCartIsEmpty?: string;
    /** @default  CARRINHO DE COMPRAS */
    cartTitle?: string;
    /** @default  Frete Grátis */
    gotFreeShipping?: string;
    /** @default  Escolher Total */
    cartTotalText?: string;
    /** @default  R$ $valor em 6x */
    installmentsText?: string;
  };
}

const normalizeUrl = (url: string) =>
  url.startsWith("//") ? `https:${url}` : url;

function Cart(
  { miniCartProps, priceIntl }: {
    miniCartProps: MiniCartProps;
    priceIntl: boolean;
  },
) {
  const { freeShippingTarget, freeShippingValueColor, cartTranslations } =
    miniCartProps;

  const { cart, loading, updateItem, update } = useCart();

  const items = cart.value?.orderForm?.items ?? [];
  const total = cart.value?.orderForm?.total ?? 0;
  const subtotal = cart.value?.orderForm?.subtotal ?? 0;
  const discounts = cart.value?.orderForm?.subtotal_discount ?? 0;
  const locale = priceIntl ? "en-US" : "pt-BR";
  const currency = priceIntl ? "USD" : "BRL";
  const coupon = cart.value?.orderForm?.coupon_code ?? undefined;
  const token = cart.value?.orderForm?.token;

  const priceTotalIntl = useSignal(0);

  useEffect(() => {
    async function PriceIntl() {
      priceTotalIntl.value = 0;
      if (items.length !== 0) {
        for (const item of items) {
          priceTotalIntl.value += await item.variant_intl_price * item.quantity;
        }
      }
    }

    PriceIntl();
  }, [items]);

  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: normalizeUrl(item.image_url), alt: item.product_name },
        quantity: item.quantity,
        name: item.variant_name,
        price: {
          sale: item.variant_price,
          list: item.variant_price,
          listIntl: item.variant_intl_price,
        },
      }))}
      cartTranslations={cartTranslations}
      total={priceIntl ? priceTotalIntl.value : total}
      subtotal={subtotal}
      discounts={discounts}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingValueColor={freeShippingValueColor ?? "#121212"}
      freeShippingTarget={freeShippingTarget ?? 0}
      coupon={coupon}
      checkoutHref={`/checkout/${token} `}
      onAddCoupon={(code) => update({ coupon_code: code })}
      onUpdateQuantity={(quantity: number, index: number) =>
        updateItem({ quantity, itemId: items[index].id })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
      priceIntl={priceIntl}
    />
  );
}

export default Cart;
