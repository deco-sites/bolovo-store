import { forwardRef } from "preact/compat";
import type { ComponentType, JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "as" | "size" | "loading">
  & {
    as?: keyof JSX.IntrinsicElements | ComponentType;
    variant?: keyof typeof variants;
    loading?: boolean;
  };

const variants = {
  primary:
    "h-[30px] bg-[#121212] rounded-[15px] h-[30px] text-white font-normal text-[15px] leading-5 w-full",
  secundary:
    "h-[30px] bg-white rounded-[15px] h-[30px] border border-[#121212] text-[#121212] font-normal text-[15px] leading-5 w-full",
  ghost: 
     "h-[30px] w-full px-3",
  icon:
    "items-center border-none w-[17px] h-5"
};

const Button = forwardRef<HTMLButtonElement, Props>(({
  variant = "",
  as = "button",
  type = "button",
  class: _class = "",
  children,
  loading,
  disabled,
  ...props
}, ref) => {
  const Component = as as ComponentType<
    {
      disabled?: boolean | JSX.SignalLike<boolean | undefined>;
      className: string;
      type: string | JSX.SignalLike<string | undefined>;
    }
  >;
  const styles = variants[variant];

  return (
    <Component
      {...props}
      className={variant != "" ? `inline-flex items-center justify-center gap-2 cursor-pointer disabled:cursor-default transition-colors duration-150 ease-in ${styles} ${_class}` : `btn no-animation ${_class}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
    >
      {children}
    </Component>
  );
});

export default Button;