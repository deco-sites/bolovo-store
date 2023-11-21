import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-2 text-primary">
        {remaining > 0
          ? (
            <div class="w-full text-center py-8">
             <div class="text-[#121212] font-semibold text-sm flex flex-row items-center w-full justify-center">
              <span class="mt-[6px]">Faltam{" "} <span class="text-[#FF0000]">{formatPrice(remaining, currency, locale)}</span>
              {" "} para o frete grátis
              </span>
              {/** TODO: Colocar icon do dog */}
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
