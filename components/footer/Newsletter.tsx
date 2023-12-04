import type { JSX } from "preact";
import { useNewsletter } from "../../sdk/useNewsletter.ts";
import { useState } from "preact/compat";

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
  const emptyData = { email: ""};
  const [data, setData] = useState({ ...emptyData });
  const [element, setElement] = useState<"invalid" | "error" | "success" | null>(null);
  const { send, loading } = useNewsletter();

  function showElement(content: "invalid" | "error" | "success") {
    setElement(content);
    setTimeout(() => setElement(null), 2000);
  }

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (data.email) {
      const status = await send(data);
      if (status >= 400) showElement("error");
      else showElement("success");
      setData({ ...emptyData });
    } else showElement("invalid");
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
      <div class="flex flex-col gap-4">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-3 h-[38px] relative items-center">
            <input
              name="email"
              class="flex-auto h-[38px] md:flex-none rounded-[20px] input input-bordered w-full text-base-content join-item"
              placeholder={content?.form?.placeholder || "Digite seu email"}
              value={data.email}
              onInput={(e) =>
                setData({ ...data, email: e.currentTarget.value })}
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
        {element === "invalid"
            ? (
              <div class="text-[16px] mt-[5px] w-full text-left">
                Preencha os campos obrigatórios
              </div>
            )
            : element === "success"
            ? (
              <div class="text-green text-center text-[14px] mt-[5px] font-bold">
                Obrigado! Enviado com sucesso.
              </div>
            )
            : element === "error"
            ? (
              <div class="text-orange text-center text-[14px] mt-[5px] font-bold">
                Problema ao enviar, tente novamente.
              </div>
            )
            : null}
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
