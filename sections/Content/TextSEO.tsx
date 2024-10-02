import { type SectionProps } from "@deco/deco";
export interface Text {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @format rich-text */
  text: string;
  content: {
    top: string;
    bottom: string;
  };
}
export interface Props {
  texts: Text[];
}
export default function TextSEO(
  props: SectionProps<ReturnType<typeof loader>>,
) {
  const { text } = props;
  if (!text) {
    return null;
  }
  return (
    <div class="text-center px-[15px] md:px-0 w-full">
      <h1
        style={{
          paddingTop: text.content.top + "px",
          paddingBottom: text.content.bottom + "px",
        }}
        dangerouslySetInnerHTML={{ __html: text.text }}
        class="text-sm leading-[18px] font-normal max-w-[724px] w-full mx-auto"
      />
    </div>
  );
}
export const loader = (props: Props, req: Request) => {
  const { texts } = props;
  const text = texts.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );
  return { text };
};
