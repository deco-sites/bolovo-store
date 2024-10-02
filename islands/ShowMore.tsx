import { PageInfo } from "apps/commerce/types.ts";
import type { ComponentChildren } from "preact";
import { useEffect, useMemo } from "preact/hooks";
import { signal } from "@preact/signals";
import Spinner from "site/components/ui/Spinner.tsx";

const currentPage = signal(1);
const loading = signal(false);

export const useShowMore = () => {
  return {
    currentPage,
    loading,
  };
};

export interface Props {
  children: ComponentChildren;
  pageInfo: PageInfo;
}

export default function ShowMore(
  { children, pageInfo }: Props,
) {
  const { currentPage, loading } = useShowMore();

  const loadedPage = pageInfo.currentPage;
  const isFirstPage = !pageInfo.previousPage;
  const isAtPage = useMemo(() => currentPage.value === loadedPage, [
    currentPage.value,
  ]);

  useEffect(() => {
    if (!isFirstPage) {
      loading.value = false;
    }
    currentPage.value = loadedPage;
  }, []);

  return (
    <div
      class={(isAtPage && pageInfo.nextPage)
        ? "flex justify-center col-span-full mb-6"
        : "hidden"}
    >
      {children}

      {loading.value
        ? (
          <div class="mt-2">
            <Spinner size={24} />
          </div>
        )
        : null}
      <button
        class={`uppercase btn btn-ghost font-normal hover:font-bold hover:bg-transparent ease-in duration-500 mt-4 block m-auto ${
          loading.value ? "hidden" : ""
        }`}
        onClick={() => {
          loading.value = true;
          const element = document.getElementById(
            `show-more-button-${loadedPage}`,
          );
          if (element) {
            element.click();
          }
          if (pageInfo.nextPage) {
            const url = new URL(pageInfo.nextPage, window.location.href);
            url.searchParams.delete("partial");
            window.history.replaceState({}, "", url.toString());
          }
        }}
      >
        Ver Mais
      </button>
    </div>
  );
}
