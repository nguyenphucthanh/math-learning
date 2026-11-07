import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const variants = {
  primary: "bg-ink text-white hover:bg-ink/90",
  soft: "bg-secondary text-ink hover:bg-secondary/70",
  sun: "bg-sun text-foreground hover:brightness-95",
};

export function ActionButton({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof variants }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-2 text-lg font-bold transition-[transform,background-color] select-none active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5 [&_svg]:shrink-0",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
