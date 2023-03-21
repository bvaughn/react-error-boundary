import { ComponentType, createElement } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorBoundaryProps } from "./types";

export function withErrorBoundary<Props extends Object>(
  Component: ComponentType<Props>,
  errorBoundaryProps: ErrorBoundaryProps
): ComponentType<Props> {
  const Wrapped: ComponentType<Props> = (props: Props) => {
    return createElement(
      ErrorBoundary,
      errorBoundaryProps,
      createElement(Component, props)
    );
  };

  // Format for display in DevTools
  const name = Component.displayName || Component.name || "Unknown";
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}
