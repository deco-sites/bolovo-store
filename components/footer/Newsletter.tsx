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
          : "flex-row justify-center w-full"
      }`}
    >
      <div class="flex flex-row gap-4">
        {content?.title && (
          <h3 class={tiled ? "text-2xl lg:text-3xl" : "w-[288px] text-[15px] font-medium leading-[16.5px] text-primary uppercase text-right"}>
            {content?.title}
          </h3>
        )}
      </div>
        <form
          class="form-control w-[321px] ml-[29px] mr-8"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 h-[38px] relative items-center">
            <input
              name="email"
              class="flex-auto h-[38px] md:flex-none rounded-[20px] input input-bordered border-primary w-full text-base-content join-item pl-[21px] placeholder:text-[12px] placeholder:uppercase placeholder:font-normal"
              placeholder={content?.form?.placeholder || "Digite seu email"}
              required
            />
            <button
              type="submit"
              class="bg-primary h-[38px] px-[20px] py-[5px] text-white rounded-[19px] disabled:loading text-sm leading-[18px] font-normal uppercase join-item absolute right-0"
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
            class="w-[458px] text-[11px] font-normal  leading-[16.4px] text-primary"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
    </div>
  );
}

export default Newsletter;
