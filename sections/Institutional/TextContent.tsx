export interface Props {
  /** @format rich-text */
  content: string;
}

function TextContent({ content }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content.replace(/<p>|<\/p>/g, "\n"),
      }}
    />
  );
}

export default TextContent;
