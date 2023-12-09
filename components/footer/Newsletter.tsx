import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;
  const loading = useSignal(false);
  const showMessage = useSignal("")
  
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      loading.value = true;
      const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;
      const status = await invoke({
        key:"deco-sites/bolovo-store/loaders/newsletter.ts",
        props: {
          email: email,
        }
      },)
      if(status >= 400){
        showMessage.value = "error"
      }else{
        showMessage.value = "success"
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={`flex ${
        tiled
          ? "flex-col gap-4 lg:flex-row lg:w-full lg:justify-between"
          : "flex-col gap-4 max-w-[378px] w-full"
      }`}
    >
      <div class="flex flex-col gap-4">
        {content?.title && (
          <h3 class={tiled ? "text-2xl lg:text-3xl" : "text-base leading-[26px] font-bold text-[#121212]"}>
            {content?.title}
          </h3>
        )}
        {content?.description && <div>{content?.description}</div>}
      </div>
      <div class="flex flex-col">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 h-[38px] relative items-center">
            <input
              name="email"
              class="flex-auto h-[38px] md:flex-none rounded-[20px] input input-bordered w-full text-base-content join-item"
              placeholder={content?.form?.placeholder || "Digite seu email"}
              required
            />
            <button
              type="submit"
              class="bg-[#121212] h-[30px] px-[30px] py-[5px] text-white rounded-[15px] disabled:loading text-base leading-5 font-normal uppercase join-item absolute right-1"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        {
          showMessage.value == "error" ? 
          <div class="text-sm leading-none text-[#d44c47] mt-1">
            Aconteceu algum erro ao cadastrar o email, tente novamente!
          </div> : showMessage.value == "success" ? 
          <div class="text-sm leading-none text-green-600 mt-1">
            E-mail cadastrado com sucesso !
          </div> : ""
        }
        {content?.form?.helpText && (
          <div
            class="text-[10px] font-normal leading-4 text-[#121212]"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;