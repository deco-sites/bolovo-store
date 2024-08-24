import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  url: string;
  buyButton?: string;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export const ADD_TO_CART_ID = "pdp-add-to-cart";

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <>
      <Button
        id={ADD_TO_CART_ID}
        {...btnProps}
        data-deco="add-to-cart"
        class="w-full uppercase h-[30px] rounded-full bg-white border-black border-2 text-sm text-black no-animation btn btn-active btn-sm  hover:bg-white
      "
      >
        {props.buyButton}
      </Button>
    </>
  );
}
