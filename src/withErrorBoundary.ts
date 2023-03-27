import {
  createElement,
  forwardRef,
  ForwardedRef,
  RefAttributes,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ComponentType,
} from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorBoundaryProps } from "./types";

export function withErrorBoundary<Props extends Object>(
  component: ComponentType<Props>,
  errorBoundaryProps: ErrorBoundaryProps
): ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<any>> {
  const Wrapped = forwardRef<ComponentType<Props>, Props>(
    (props: Props, ref: ForwardedRef<ComponentType<Props>>) =>
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
