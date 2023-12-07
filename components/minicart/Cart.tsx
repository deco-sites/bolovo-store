// import { platform } from "$store/apps/storefront.ts";
import { lazy } from "preact/compat";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { MiniCartProps } from  '$store/components/minicart/vnda/Cart.tsx'

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));
const CartVNDA = lazy(() => import("./vnda/Cart.tsx"));
const CartWake = lazy(() => import("./wake/Cart.tsx"));
const CartLinx = lazy(() => import("./linx/Cart.tsx"));
const CartShopify = lazy(() => import("./shopify/Cart.tsx"));

export interface Props {
  platform: ReturnType<typeof usePlatform>;
  miniCart?: MiniCartProps
}

function Cart({ platform, miniCart }: Props) {
  const {ctaCheckout, ctaBackStore, freeShippingTarget, freeShippingText, freeShippingValueColor, modalCloseText,cartIsEmpty,buttonCartIsEmpty,cartTitle,gotFreeShipping,cartTotalText,installmentsText} = miniCart;

  if (platform === "vtex") {
    return <CartVTEX />;
  }

  if (platform === "vnda") {
    return <CartVNDA 
             ctaCheckout={ctaCheckout} 
             ctaBackStore={ctaBackStore}  
             freeShippingTarget={freeShippingTarget}  
             freeShippingText={freeShippingText} 
             freeShippingValueColor={freeShippingValueColor} 
             modalCloseText={modalCloseText}
             cartIsEmpty={cartIsEmpty}
             buttonCartIsEmpty={buttonCartIsEmpty}
             cartTitle={cartTitle}
             gotFreeShipping={gotFreeShipping}
             cartTotalText={cartTotalText}
             installmentsText={installmentsText}
            />;
  }

  if (platform === "wake") {
    return <CartWake />;
  }
  
  if (platform === "linx") {
    return <CartLinx />;
  }

  if (platform === "shopify") {
    return <CartShopify />;
  }

  return null;
}

export default Cart;
