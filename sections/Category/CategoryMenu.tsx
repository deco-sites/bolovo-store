export { default, loader } from "../../components/search/CategoryMenu.tsx";

export function LoadingFallback() {
  return (
    <div class="flex mb-5 flex-col lg:flex-row justify-between lg:w-full flex-wrap pt-6 px-4 gap-6">
      <div class="flex items-center gap-4">
        <div class="skeleton h-6 w-[150px]" />
        <div class="text-black">&gt;</div>
        <div class="skeleton h-6 w-[120px] rounded-full" />
      </div>

      <div class="flex items-center gap-8 justify-end">
        <div class="skeleton w-20 h-5" />
        <div class="skeleton w-20 h-5" />
      </div>
    </div>
  );
}
