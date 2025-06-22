import {
  createElement,
  forwardRef,
  type RefAttributes,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type ComponentType,
  type ComponentRef,
  type ComponentProps,
} from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { type ErrorBoundaryProps } from "./types";

export function withErrorBoundary<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Type extends ComponentType<any>,
>(
  component: Type,
  errorBoundaryProps: ErrorBoundaryProps
): ForwardRefExoticComponent<
  PropsWithoutRef<ComponentProps<Type>> & RefAttributes<ComponentRef<Type>>
> {
  const Wrapped = forwardRef<ComponentRef<Type>, ComponentProps<Type>>(
    (props, ref) =>
      createElement(
        ErrorBoundary,
        errorBoundaryProps,
        createElement(component, { ...props, ref })
      )
  );

  // Format for display in DevTools
  const name = component.displayName || component.name || "Unknown";
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}
