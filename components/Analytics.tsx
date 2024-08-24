import { sendEvent } from "$store/sdk/analytics.tsx";
import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

interface HomeEvent {
  name: "acessou-home";
}

interface NewsletterEvent {
  name: "cadastrou-newsletter";
}

interface SearchEvent {
  name: "buscou-produto";
  params: {
    termo: string;
  };
}

interface DepartmentViewEvent {
  name: "acessou-departamento";
  params: {
    nome_departamento: string;
  };
}

interface CategoryViewEvent {
  name: "acessou-categoria";
  params: {
    nome_departamento: string;
    nome_categoria: string;
  };
}

export interface ProductParam {
  nome_departamento: string;
  nome_produto: string;
  preco_produto: number;
  id_produto: string;
  cor: string;
  tamanhos: string;
  url_produto: string;
  quantidade: number;
  sku_produto: string;
}

interface ProductViewEvent {
  name: "acessou-produto";
  params: Omit<ProductParam, "quantidade">;
}

export interface HandleProductOnCartEvent {
  name: "removeu-produto-do-carrinho" | "adicionou-produto-ao-carrinho";
  params: ProductParam;
}

export type ExtendedEvents =
  | NewsletterEvent
  | DepartmentViewEvent
  | CategoryViewEvent
  | ProductViewEvent
  | HandleProductOnCartEvent
  | SearchEvent
  | HomeEvent
  | AnalyticsEvent;

const snippet = (id: string, event: ExtendedEvents) => {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(
      `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
    );
  } else {
    element.addEventListener(
      "click",
      () => window.DECO.events.dispatch(event),
    );
  }
};

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends ExtendedEvents>({ event, id }: {
  event: E;
  id: string;
}) => <script defer src={scriptAsDataURI(snippet, id, event)} />;

/**
 * This componente should be used when want to send event for rendered componentes.
 * This behavior is usefull for view_* events.
 */
export const SendEventOnLoad = <E extends ExtendedEvents>(
  { event }: { event: E },
) => <script defer src={scriptAsDataURI(sendEvent, event)} />;
