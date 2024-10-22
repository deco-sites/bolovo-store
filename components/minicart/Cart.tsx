// import { platform } from "$store/apps/storefront.ts";
import { lazy } from "preact/compat";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { MiniCartProps } from "$store/components/minicart/vnda/Cart.tsx";

const CartVNDA = lazy(() => import("./vnda/Cart.tsx"));

export interface Props {
  platform: ReturnType<typeof usePlatform>;
  miniCart: MiniCartProps;
  priceIntl: boolean;
}

function Cart({ miniCart, priceIntl }: Props) {
  return (
    <CartVNDA
      miniCartProps={miniCart}
      priceIntl={priceIntl}
    />
  );
}

export default Cart;
