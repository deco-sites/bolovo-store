import { invoke } from "$store/runtime.ts";
import { signal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { useCallback } from "preact/compat";

const newFilters = signal<ProductListingPage["filters"] | null>([]);
const loading = signal(false);

const handleOnClickFilter = async (url: string) => {
  // console.log(url);
  try {
    const resp = await invoke.vnda.loaders.productListingPage({
      count: 24,
      pageHref: url,
      filterByTags: true,
      filterOperator: { type_tags: "or" },
      tags: [],
    });
    if (resp) {
      newFilters.value = resp.filters;
    }
  } catch (error) {
    console.log("filtros erro" + error);
  }
};

export const useFilters = () => {
  const getFilters = useCallback((url: string) => {
    loading.value = true;
    handleOnClickFilter(url);
  }, []);

  return { getFilters, newFilters, loading };
};
