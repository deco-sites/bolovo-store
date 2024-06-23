export { default, loader } from "$store/components/product/ProductShelf.tsx";
import type { Props } from "$store/components/product/ProductShelf.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export function LoadingFallback({ layout, title }: Props) {
  return (
    <div class="w-full py-8 flex flex-col gap-5 px-[15px] mx-auto lg:gap-6 lg:py-10">
      <Header
        title={title || ""}
        fontSize={layout?.headerfontSize || "Normal"}
        alignment={layout?.headerAlignment || "left"}
      />
      <div class="flex items-center overflow-x-hidden gap-2 lg:gap-4 h-[450px]">
        <div class="skeleton shrink-0 h-full w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4" />
        <div class="skeleton shrink-0 h-full w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4" />
        <div class="skeleton shrink-0 h-full w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4" />
        <div class="skeleton shrink-0 h-full w-[38.605vw] lg:w-[calc((100%-73px)/4)] sm:first:pl-4 sm:last:pr-4" />
      </div>
    </div>
  );
}
