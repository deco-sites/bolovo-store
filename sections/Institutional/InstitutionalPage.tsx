import { Section } from "deco/blocks/section.ts";

export interface Props {
  title: string;
  asideMenu: Section; 
  content: Section;
}

function InstitutionalPage({
  asideMenu: { Component: AsideComponent, props: asideProps },
  content: { Component: ContentComponent, props: contentProps },
  title,
}: Props) {
  return (
    <>
      <div class="flex flex-col lg:flex-row px-4 w-full mt-[15px]">
        <div class="lg:max-w-[20%]">
          <AsideComponent {...asideProps} />
        </div>
        <article class="lg:pl-[30px] lg:max-w-[80%] w-full">
          <h3 class="hidden uppercase text-primary text-2xl font-medium leading-[36px] mb-5 border-b border-neutral-100 pb-[10px] lg:block">
            {title}
          </h3>
          {/* @ts-ignore opting for a ignore here so we can use a union type for the content section prop, and display it nicely in the admin panel */}
          <div class="mt-5 lg:mt-0">
            <ContentComponent {...contentProps} />
          </div>
        </article>
      </div>
    </>
  );
}

export default InstitutionalPage;
