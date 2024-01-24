import { useSignal } from "@preact/signals";
import type {
  Description,
  SectionDescription,
} from "../../sdk/markdownToObj.ts";
import Icon from "./Icon.tsx";
import RenderMarkdown from "../../islands/RenderMarkdown.tsx";
export interface Props {
  descriptionProps: Description;
  tabIndex?: number;
}

export default function NavigationDescription(
  { descriptionProps, tabIndex }: Props,
) {
  const { description, descriptionTabs } = descriptionProps;
  const itemVisible = useSignal(-1);

  return (
    <div class="w-full flex flex-col mt-6">
      {description && (
        <RenderMarkdown
          description={description.content}
          alignText={"justify"}
        />
      )}
      <ul class="w-full flex flex-row lg:justify-start lg:gap-6 justify-between pb-3 pt-6">
        {descriptionTabs && descriptionTabs.map((tab, index) => (
          <li
            class="text-sm text-center flex flex-col justify-between items-center w-min h-[50px] cursor-pointer"
            onClick={() => (itemVisible.value = index)}
          >
            <span>{tab.title}</span>
            <Icon
              id="ArrowDown"
              size={11}
              class={` ${itemVisible.value == index ? "flex" : "hidden"}`}
            />
          </li>
        ))}
      </ul>
      <ul class="w-full flex flex-row ">
        {descriptionTabs &&
          descriptionTabs.map((description, index) => (
            <li
              class={` ${
                itemVisible.value == index ? "flex" : "hidden"
              } text-xs w-full`}
              style={{ fontSize: "11px" }}
            >
              <RenderMarkdown
                description={description.content}
                type={description.type}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
