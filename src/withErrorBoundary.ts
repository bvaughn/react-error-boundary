import {
  createElement,
  forwardRef,
  RefAttributes,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ComponentType,
  ComponentRef,
  ComponentProps,
} from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorBoundaryProps } from "./types";

export function withErrorBoundary<T extends ComponentType<any>>(
  component: T,
  errorBoundaryProps: ErrorBoundaryProps
): ForwardRefExoticComponent<
  PropsWithoutRef<ComponentProps<T>> & RefAttributes<ComponentRef<T>>
> {
  const Wrapped = forwardRef<ComponentRef<T>, ComponentProps<T>>((props, ref) =>
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
