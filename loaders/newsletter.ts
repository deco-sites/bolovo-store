import type { AppContext } from "$store/apps/site.ts";
import { fetchSafe } from "apps/utils/fetch.ts";

export interface Props {
  email: string;
}

const newsletter = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<number> => {
  const form = new FormData();
  const baseUrl = ctx.commerce?.platform == "vnda"
    ? `${ctx.commerce?.publicUrl}webform`
    : "";
  const { email } = props;
  form.append("key", "bolovo-newsletter");
  form.append("reply_to", email);
  form.append("vnda", "");
  form.append("email", email);

  const response = await fetchSafe(baseUrl, {
    method: "POST",
    body: form,
  });

  return response.status;
};

export default newsletter;
