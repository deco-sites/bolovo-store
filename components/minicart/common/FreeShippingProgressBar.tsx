import { formatPrice } from "$store/sdk/format.ts";
import type { HTMLWidget } from "apps/admin/widgets.ts";
import InnerHTML from  "$store/components/ui/InnerHTML.tsx"

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
  freeShippingText?: HTMLWidget;
  freeShippingValueColor?: string
}

function FreeShippingProgressBar({ target, total, currency, locale, freeShippingText, freeShippingValueColor}: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);
  const valueFreeShipping = formatPrice(remaining, currency, locale);
  
  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-2 text-primary">
        {remaining > 0
          ? (
            <div class="w-full text-center py-8">
             <div class="text-[#121212] font-semibold text-sm flex flex-row items-center w-full justify-center">
              <span class="mt-[6px]">
                <InnerHTML html={freeShippingText?.replace("$valor",`<span style=color:${freeShippingValueColor}>${valueFreeShipping}</span>`)} />
              </span>
              <img
                src="/image/Dog.gif"
                alt="Dog"
                width="46"
                height="46"
                class="ml-1"
              />
             </div>
               <progress
               class="progress progress-[#121212] w-full"
               value={percent}
               max={100}
             />
            </div>
          )
          : <div />}
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
