import {
  createElement,
  forwardRef,
  type ComponentProps,
  type ComponentRef,
  type ComponentType,
} from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import type { ErrorBoundaryProps } from "../types";

export function withErrorBoundary<
  // ComponentProps and ComponentRef are themselves constrained by
  // JSXElementConstructor<any>, so the parameter they read has to be too.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Type extends ComponentType<any>,
>(Component: Type, errorBoundaryProps: ErrorBoundaryProps) {
  type Props = ComponentProps<Type>;

  const Wrapped = forwardRef<ComponentRef<Type>, Props>((props, ref) =>
    createElement(
      ErrorBoundary,
      errorBoundaryProps,
      createElement(Component, { ...props, ref } as Props),
    ),
  );

  // Format for display in DevTools
  const name = Component.displayName || Component.name || "Unknown";
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}
