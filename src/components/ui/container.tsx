import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div className={`container-px mx-auto w-full max-w-7xl ${className}`} {...props} />
  );
}
