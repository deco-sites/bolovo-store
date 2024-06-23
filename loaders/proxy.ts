import { Route } from "apps/website/flags/audience.ts";
import { AppContext } from "$store/apps/site.ts";

const PAGE_PATHS = ["/m/*", "/p/*", "/v/*"];

const ASSETS_PATHS = [
  "/commom/*",
  "/javascripts",
  "/javascripts/*",
  "/stylesheets",
  "/stylesheets/*",
  "/images",
  "/images/*",
];

export interface Props {
  /** @description ex: /p/fale-conosco */
  pagesToProxy?: string[];
}

/**
 * @title BLV - Proxy Routes
 */
function loader(
  { pagesToProxy = [] }: Props,
  _req: Request,
  ctx: AppContext,
): Route[] {
  const url = new URL(
    ctx.publicUrl?.startsWith("http")
      ? ctx.publicUrl
      : `https://${ctx.publicUrl}`,
  );

  const paths = [...pagesToProxy, ...ASSETS_PATHS, ...PAGE_PATHS].map(
    (pathTemplate) => ({
      pathTemplate,
      handler: {
        value: {
          __resolveType: "website/handlers/proxy.ts",
          url: url.origin,
          host: url.hostname,
        },
      },
    }),
  );

  return [...paths];
}

export default loader;
