import { AppContext } from "apps/vnda/mod.ts";

export interface Props {
  email: string;
}

const action = async (
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<void> => {
  const teste = ctx;
  console.log(teste)
  const form = new FormData();
  const baseUrl = ``;
  const { email } = props;
  
  form.append("key", "bolovo-newsletter");
  form.append("reply_to", email);
  form.append("vnda", "");
  form.append("email", email);
  
  await fetch(baseUrl, {
    method: "POST",
    body: form,
  });

};

export default action;