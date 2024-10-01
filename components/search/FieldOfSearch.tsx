import { useId } from "$store/sdk/useId.ts";
import { useSignal } from "@preact/signals";
import { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";

interface Props {
  onClose?: () => void;
  open?: boolean;
  class?: string;
  style?: string;
  children?: ComponentChildren;
  loading?: "eager" | "lazy";
}

export default function FieldOfSearch(props: Props) {
  const {
    children,
    open,
    onClose,
    loading = "lazy",
  } = props;
  const lazy = useSignal(loading === "lazy" && !open);
  const id = useId();

  useEffect(() => {
    const handler = (e: KeyboardEvent) =>
      (e.key === "Escape" || e.keyCode === 27) && open && onClose?.();

    addEventListener("keydown", handler);

    return () => {
      removeEventListener("keydown", handler);
    };
  }, [open]);

  useEffect(() => {
    lazy.value = false;
  }, []);

  return (
    <div class={"group order-[-1]"}>
      <input
        id={id}
        checked={open}
        type="checkbox"
        class="hidden"
        onChange={(e) => e.currentTarget.checked === false && onClose?.()}
      />
      <div
        class=" ease-in-out duration-300 relative overflow-hidden "
        style={{
          opacity: open ? "1" : "0",
          zIndex: open ? 1 : -2,
          width: open ? "250px" : "32px",
        }}
      >
        {!lazy.value && children}
        <label class="hidden group-checked:flex" for={id}>Close</label>
      </div>
    </div>
  );
}
