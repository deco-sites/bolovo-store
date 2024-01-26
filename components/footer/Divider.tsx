interface Props{
  class?: string
}

export default function Divider({class: _class = "",}: Props) {
  return ( <div class={`w-full flex border-b ${_class}`}></div>
  );
}
