import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
  priceIntl?: boolean;
}

function Notify({ productID, priceIntl = false }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vnda.actions.notifyme({
        sku: productID,
        key: "bolovo-avise-me",
        email,
      });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base">
        {priceIntl
          ? "This product is currently unavailable."
          : "Este produto está indisponivel no momento"}
      </span>
      <span class="text-sm">
        {priceIntl
          ? "Notify me when it becomes available."
          : "Avise-me quando estiver disponivel"}
      </span>

      <input
        placeholder={priceIntl ? "Name" : "Nome"}
        class="input input-bordered"
        name="name"
      />
      <input placeholder="Email" class="input input-bordered" name="email" />

      <button class="btn disabled:loading" disabled={loading}>
        {priceIntl ? "Send" : "Enviar"}
      </button>
    </form>
  );
}

export default Notify;
