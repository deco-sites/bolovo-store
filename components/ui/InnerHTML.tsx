import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  html: HTMLWidget;
}

export default function InnerHTML(props: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.html }} />
  );
}