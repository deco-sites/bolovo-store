export interface Props {
  /** @format rich-text */
  content: string;
}

function TextContent({ content }: Props) {
  return (
    <div class="mb-12 lg:mb-20">
      <div
        dangerouslySetInnerHTML={{
          __html: content.replace(/<p>|<\/p>/g, "\n"),
        }}
      />
    </div>
  );
}

export default TextContent;
