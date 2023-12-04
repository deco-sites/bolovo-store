import { Signal, signal } from "@preact/signals";

const loading = signal<boolean>(false);

type UseNewsletterHook = {
  loading: Signal<boolean>;
  send(props: SendProps): Promise<number>;
};

interface SendProps {
  email: string;
}

const send: UseNewsletterHook["send"] = async (
  { email },
) => {
  const baseUrl = `https://www.bolovo.com.br/webform`
  const form = new FormData();
  form.append("key", "bolovo-newsletter");
  form.append("reply_to", email);
  form.append("vnda", "");
  form.append("email", email);

  const response = await fetch(baseUrl , {
    method: "POST",
    body: form,
  });

  return response.status;
};

type Middleware = (fn: () => Promise<number>) => Promise<number>;

/**
 * Usually we add a withCart middleware here, but it wouldn't work
 * with VNDA because it doesn't create a Cart structure before
 * adding items.
 */

const withLoading: Middleware = async (cb) => {
  try {
    loading.value = true;
    return await cb();
  } finally {
    loading.value = false;
  }
};

const state: UseNewsletterHook = {
  loading,
  send: (opts) => withLoading(() => send(opts)),
};

export const useNewsletter = () => state;