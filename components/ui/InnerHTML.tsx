export interface Props {
  /**  @format rich-text */
  html: string;
}

export default function InnerHTML(props: Props) {
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />;
}
