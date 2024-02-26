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
  const { email } = props;
  
  if (ctx.commerce?.platform === "vnda") {
    const baseUrl = `${ctx.commerce.publicUrl}webform`;
    
    const formData = new URLSearchParams();
    formData.append("key", "bolovo-newsletter");
    formData.append("reply_to", email);
    formData.append("vnda", "");
    formData.append("email", email);
    
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: formData.toString(), 
    };
    
    const response = await fetchSafe(baseUrl, requestOptions);
    
    return response.status;
  } else {
    return 400; // Bad Request
  }
};

export default newsletter;
