import { Section } from "deco/blocks/section.ts";

interface Props {
  children: Section;
}

function Container({ children }: Props) {
  return (
    <div class="w-full">
      <children.Component {...children.props} />
    </div>
  );
}

export default Container;
