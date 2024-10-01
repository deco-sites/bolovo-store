import { type Section } from "deco/mod.ts";
interface Props {
  children: Section;
}
function Gallery({ children: { Component, props } }: Props) {
  return (
    <>
      <Component {...props} />
    </>
  );
}
export default Gallery;
