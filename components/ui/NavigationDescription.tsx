import { useSignal } from "@preact/signals";
import type { Description } from "../../sdk/markdownToObj.ts";
import Icon from "./Icon.tsx";
import RenderMarkdown from "./RenderMarkdown.tsx";
export interface Props {
  descriptionProps: Description;
  tabIndex?: number;
}

export default function NavigationDescription(
  { descriptionProps }: Props,
) {
  const { description, descriptionTabs } = descriptionProps;
  const itemVisible = useSignal(-1);
  const toggleDescription = (index: number) => {
    itemVisible.value = itemVisible.value === index ? -1 : index;
  };
  if (descriptionTabs) {
    descriptionTabs.filter((desc) => desc !== undefined);
  }

  descriptionTabs?.map((desc) => {
    const index = desc.content.indexOf("[idioma]");
    if (index !== -1) {
      desc.content = desc.content.substring(0, index).trimEnd();
    }
  });

  return (
    <div class="w-full flex flex-col mt-6">
      {description && (
        <RenderMarkdown
          description={description.content}
          alignText={"justify"}
        />
      )}
      <ul class="w-full flex flex-row lg:justify-start lg:gap-6 justify-between pb-3 pt-6">
        {descriptionTabs?.filter((tab) => tab !== undefined).slice(0, 3).map((
          tab,
          index,
        ) => (
          <li
            class={`text-sm text-center ${
              tab ? "flex" : "hidden"
            } flex-col justify-between items-center w-min h-[50px] cursor-pointer`}
            onClick={() => toggleDescription(index)}
          >
            <span>{tab?.title}</span>
            <Icon
              id="ArrowDown"
              size={11}
              class={` ${itemVisible.value == index ? "flex" : "hidden"}`}
            />
          </li>
        ))}
      </ul>
      <ul class="w-full flex flex-row">
        {descriptionTabs?.filter((tab) => tab !== undefined).slice(0, 3).map((
          description,
          index,
        ) => (
          <li
            class={` ${
              itemVisible.value == index ? "flex" : "hidden"
            } w-full text-sm leading-5`}
            style={{ fontSize: "11px" }}
          >
            <RenderMarkdown
              description={description?.content}
              type={description?.type}
            />
          </li>
        ))}
      </ul>
      {/* Go horse para fazer a classe last existir no elemento usado do Markdown */}
      <div class="last:mt-4 hidden" />
    </div>
  );
}
