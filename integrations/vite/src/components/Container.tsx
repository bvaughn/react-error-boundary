import { type PropsWithChildren } from "react";

export type ContainerProps = PropsWithChildren<{
  className?: string | undefined;
}>;

export function Container({ children, className }: ContainerProps) {
  return <div className={className}>{children}</div>;
}
