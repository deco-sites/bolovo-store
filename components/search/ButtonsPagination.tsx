import type { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

export interface ButtonsPaginationProps {
  /**
   * @default "Limitar numeros"
   */
  layoutPagination?: "Limitar numeros" | "Não limitar numeros";
  labelPrevious?: string;
  labelNext?: string;
  labelButtonTop?: string;
}

const DEFAULT_PROPS: ButtonsPaginationProps = {
  layoutPagination: "Não limitar numeros",
  labelPrevious: "Voltar",
  labelNext: "Proximo",
  labelButtonTop: "Voltar ao Topo",
};

function LinkNumberPage(
  { currentPage, number, href = "#" }: {
    currentPage: number;
    number: number;
    href?: string;
  },
) {
  return (
    <a
      href={href + number}
      class={`${
        currentPage === number ? "font-bold" : "font-normal"
      } btn btn-ghost join-item text-[15px] px-1 hover:font-bold hover:bg-transparent ease-in duration-500`}
    >
      {number}
    </a>
  );
}

export default function ButtonsPagination(
  { props, page }: { props?: ButtonsPaginationProps; page: ProductListingPage },
) {
  const { labelNext, layoutPagination, labelPrevious, labelButtonTop } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const { pageInfo } = page;
  const numberMaxPage: number = Math.ceil(
    (pageInfo.records ?? 0) / (pageInfo.recordPerPage ?? 0),
  );
  const arrayNumber: Array<number> = [];

  const hrefNavigation = pageInfo.nextPage?.slice(0, -1) ??
    pageInfo.previousPage?.slice(0, -1);

  for (let i = 1; i <= numberMaxPage; i++) {
    arrayNumber.push(i);
  }

  return (
    <div class="flex justify-center my-4 items-center flex-col gap-2">
      <a
        href={"#"}
        class="uppercase btn btn-ghost font-normal hover:font-bold hover:bg-transparent  ease-in duration-500"
      >
        {labelButtonTop}
      </a>
      <div class="join bg-red w-full justify-between items-center">
        <a
          aria-label="previous page link"
          rel="prev"
          disabled={!pageInfo.previousPage}
          href={pageInfo.previousPage ?? "#"}
          class={`btn btn-ghost join-item uppercase lg:min-w-[140px] pl-0 text-[15px] flex justify-start`}
          style={{ background: "transparent" }}
        >
          <Icon id="ChevronLeft" size={24} strokeWidth={2} />
          <span class={`hidden lg:flex group-disabled:opacity-20`}>
            {labelPrevious}
          </span>
        </a>
        {layoutPagination === "Limitar numeros"
          ? (
            <div class="flex justify-center items-center gap-2">
              {arrayNumber.map((number) => (
                <>
                  {pageInfo.currentPage === number
                    ? (
                      <LinkNumberPage
                        number={number}
                        currentPage={pageInfo.currentPage}
                        href={hrefNavigation}
                      />
                    )
                    : number === 5 && pageInfo.currentPage > 5
                    ? <span>. . .</span>
                    : number > 4 && number < arrayNumber.length - 2
                    ? null
                    : number < arrayNumber.length - 1 && number > 4 &&
                        pageInfo.currentPage < arrayNumber.length - 1
                    ? <span>. . .</span>
                    : (
                      <LinkNumberPage
                        number={number}
                        currentPage={pageInfo.currentPage}
                        href={hrefNavigation}
                      />
                    )}
                </>
              ))}
            </div>
          )
          : (
            <div class="flex justify-center items-center gap-2 flex-wrap">
              {arrayNumber.map((number) => (
                <LinkNumberPage
                  number={number}
                  currentPage={pageInfo.currentPage}
                  href={hrefNavigation}
                />
              ))}
            </div>
          )}
        <a
          aria-label="next page link"
          rel="next"
          disabled={!pageInfo.nextPage}
          href={pageInfo.nextPage ?? "#"}
          class={`btn btn-ghost join-item uppercase lg:min-w-[140px] pr-0 text-[15px] flex justify-end`}
          style={{ background: "transparent" }}
        >
          <span class={`hidden lg:flex`}>
            {labelNext}
          </span>
          <Icon id="ChevronRight" size={27} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
