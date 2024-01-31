import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Hiper" | "Visa" | "Amex" | "Boleto";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-[15px]">
          {content.title && (
            <h3 class="text-base font-bold lg:mx-0 mx-auto leading-[26px]">
              {content.title}
            </h3>
          )}
          <ul class="flex lg:mx-0 mx-auto items-center gap-1 flex-wrap">
            {content.items.map((item) => {
              return (
                <li
                  class="border rounded-[3px] border-[#121212]"
                  title={item.label}
                >
                  <Icon
                    class="p-1"
                    width={36}
                    height={24}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
