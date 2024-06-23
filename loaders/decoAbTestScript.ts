import type { AppContext } from "../apps/site.ts";

declare global {
  interface Window {
    trafficToDeco: number;
    decoUrl: string;
  }
}

const maybeRedirectUser = () => {
  const UTM_SOURCE_PARAMS = "utm_source";
  // Define keys for localStorage, using also traffic as key
  const redirectKey = `deco_redirect_${globalThis.window.trafficToDeco}`;
  const shouldRedirect = localStorage.getItem(redirectKey);

  // If the key doesn't exist, sort the user and set the flag accordingly
  if (shouldRedirect === null) {
    const random = Math.random();
    const userShouldRedirect = random <= globalThis.window.trafficToDeco;
    localStorage.setItem(redirectKey, userShouldRedirect.toString());
  }

  // Check the flag, and redirect if true
  if (localStorage.getItem(redirectKey) === "true") {
    const currentPath = globalThis.window.location.pathname;
    const searchParamsToPass = new URLSearchParams(
      globalThis.window.location.search,
    );

    // Append utm_source query parameter if it doesn't exist in globalThis.window.location.search
    // with the value from document.referrer (used to identify Google Organic source)
    if (!searchParamsToPass.has(UTM_SOURCE_PARAMS)) {
      const referrer = document.referrer;
      if (referrer) {
        searchParamsToPass.set(UTM_SOURCE_PARAMS, encodeURIComponent(referrer));
      }
    }

    let urlToRedirect = `${globalThis.window.decoUrl}${currentPath}`;

    const hasSearchParams = searchParamsToPass.size > 0;
    if (hasSearchParams) {
      urlToRedirect += `?${searchParamsToPass.toString()}`;
    }

    globalThis.window.location.href = urlToRedirect;
  }
};

export default function abTestScript(
  _props: null,
  _req: Request,
  ctx: AppContext,
) {
  return new Response(
    `globalThis.window.decoUrl = "${ctx.decoHostToRedirect}";
globalThis.window.trafficToDeco = ${ctx.trafficToDeco};
(${maybeRedirectUser})();`,
    {
      headers: {
        "Cache-Control": "public, max-age=30",
      },
    },
  );
}
