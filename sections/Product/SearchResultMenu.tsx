export { default, loader } from "../../components/search/SearchResultMenu.tsx";

export function LoadingFallback() {
  return (
    <div class="flex mb-5 flex-col lg:flex-row justify-between lg:w-full flex-wrap py-10 px-4 gap-6">
      <div class="flex items-center gap-4 lg:mx-auto lg:translate-x-28">
        <div class="skeleton w-36 h-5" />
        <div class="skeleton w-20 h-5 rounded-full" />
      </div>

      <div class="flex items-center gap-8 justify-end">
        <div class="skeleton w-20 h-5" />
        <div class="skeleton w-20 h-5" />
      </div>
    </div>
  );
}
