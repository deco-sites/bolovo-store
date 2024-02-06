import type { Props as AsideProps} from  "$store/components/ui/AsideMenu.tsx"
import AsideMenu from "$store/components/ui/AsideMenu.tsx"
import TextContent from "deco-sites/bolovo-store/sections/Institutional/TextContent.tsx";
import type {Props as TextContentProps } from "deco-sites/bolovo-store/sections/Institutional/TextContent.tsx";


export interface Props {
  title: string;
  asideMenu: Section;
  content: Section;
}

function InstitutionalPage({
  asideMenu,
  title,
  textContent
}: Props) {
  return (
    <>
      <div class="flex flex-col lg:flex-row px-4 w-full mt-[15px]">
        <div class="lg:max-w-[20%] w-full">
          <AsideComponent {...asideProps} />
        </div>
        <article class="lg:pl-[30px] lg:max-w-[80%] w-full">
          <h3 class="hidden uppercase text-primary text-2xl font-medium leading-[36px] mb-5 border-b border-neutral-100 pb-[10px] lg:block">
            {title}
          </h3>
          {/* @ts-ignore opting for a ignore here so we can use a union type for the content section prop, and display it nicely in the admin panel */}
          <ContentComponent {...contentProps} />
        </article>
      </div>
    </>
  );
}

export default InstitutionalPage;
