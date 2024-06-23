interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}

function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title && (
              <h1
                class={`uppercase font-semibold leading-8 lg:leading-normal
              ${
                  props.colorReverse
                    ? "text-baserimary-content"
                    : "text-base-content"
                }
              ${
                  props.fontSize === "Normal"
                    ? "text-[0.875rem] lg:text-base"
                    : "lg:text-basel"
                }
            `}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: props.title ?? "" }}
                />
              </h1>
            )}
            {props.description &&
              (
                <h2
                  class={`
                  leading-6 lg:leading-8
                  ${
                    props.colorReverse
                      ? "text-baserimary-content"
                      : "text-neutral"
                  }
                  ${
                    props.fontSize === "Normal"
                      ? "lg:text-basel"
                      : "lg:text-2xl"
                  }
                `}
                >
                  {props.description}
                </h2>
              )}
          </div>
        )
        : null}
    </>
  );
}

export default Header;
