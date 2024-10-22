import type { Manifest as ManifestVNDA } from "apps/vnda/manifest.gen.ts";
import type { Manifest } from "./manifest.gen.ts";
import { proxy } from "@deco/deco/web";
export const invoke = proxy<Manifest & ManifestVNDA>();
