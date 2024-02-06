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
      <div class="flex flex-col lg:flex-row px-4 lg:container justify-between mt-[15px]">
        <AsideMenu sectionMenu={asideMenu.sectionMenu} desktopButtonAlign={asideMenu.desktopButtonAlign} />
        <article class="lg:pl-[30px] w-full">
          <h3 class="hidden uppercase text-secondary text-2xl font-bold leading-[36.4px] mb-5 border-b border-neutral-100 pb-[10px] lg:block">
            {title}
          </h3>
          <TextContent content={textContent}/>
        </article>
      </div>
    </>
  );
}

export default InstitutionalPage;
