export { default, loader } from "../../components/product/ProductDetails.tsx";

export function LoadingFallback() {
    return (
        <div class="pt-0 lg:py-11 lg:px-[8%] flex justify-center flex-col lg:flex-row gap-6 md:gap-12 lg:gap-[6%] py-11">
            <div class="w-full lg:w-3/5 h-auto skeleton aspect-square" />
            <div class="w-full lg:w-2/5 lg:max-w-[400px] flex flex-col px-4">
                <div class="skeleton h-5 w-full max-w-[200px] mb-2" />
                <div class="skeleton h-5 w-full max-w-[60px]" />

                <div class="flex items-center gap-6 mt-4 sm:mt-6">
                    <div class="skeleton w-5 h-5" />
                    <div class="skeleton w-5 h-5" />
                    <div class="skeleton w-5 h-5" />
                </div>

                <div class="flex items-center justify-between gap-1 mt-6 lg:mt-11">
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                    <div class="skeleton w-8 h-5 rounded-full" />
                </div>

                <div class="skeleton w-full h-[30px] rounded-full mt-4 sm:mt-10" />

                <div class="w-full flex flex-row lg:justify-start lg:gap-6 justify-between pb-3 pt-6 mt-4 sm:mt-6">
                    <div class="skeleton w-16 h-4 rounded" />
                    <div class="skeleton w-8 h-4 rounded" />
                    <div class="skeleton w-12 h-4 rounded" />
                </div>
            </div>
        </div>
    );
}
