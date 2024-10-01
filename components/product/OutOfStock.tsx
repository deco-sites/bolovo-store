import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { Product } from "apps/commerce/types.ts";
import { EMAIL_REGEX } from "deco-sites/bolovo-store/sdk/regex.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
  priceIntl?: boolean;
}

function Notify({ productID, priceIntl = false }: Props) {
  const loading = useSignal(false);
  const notifySuccess = useSignal(false);
  const notifyInvalid = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      if ((!email || !EMAIL_REGEX.test(email))) {
        notifyInvalid.value = true;
        return;
      }

      await invoke.vnda.actions.notifyme({
        sku: productID,
        key: "bolovo-avise-me",
        email,
      });
      notifySuccess.value = true;
    } catch {
      notifyInvalid.value = true;
    } finally {
      loading.value = false;
    }
  };

  return (
    <div>
      {notifySuccess.value && (
        <div class="flex flex-col justify-center">
          <span class="text-lg font-semibold">
            {priceIntl ? "Thank you!" : "Obrigado!"}
          </span>
          <p class="text-base font-medium mt-2">
            {priceIntl
              ? "Email successfully registered."
              : "Email cadastrado com sucesso."}
          </p>
        </div>
      )}
      {!notifySuccess.value && (
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
          <input
            placeholder="Email"
            class="input input-bordered"
            name="email"
          />

          <button class="btn disabled:loading" disabled={loading}>
            {priceIntl ? "Send" : "Enviar"}
          </button>
          {notifyInvalid.value && (
            <span class="text-red-500">
              {priceIntl ? "Invalid email" : "Email inválido"}
            </span>
          )}
        </form>
      )}
    </div>
  );
}

export default Notify;
