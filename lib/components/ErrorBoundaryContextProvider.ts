import { createElement, useMemo, type PropsWithChildren } from "react";
import {
  ErrorBoundaryContext,
  type ErrorBoundaryContextType,
} from "../context/ErrorBoundaryContext";

export function ErrorBoundaryContextProvider({
  children,
  didCatch,
  error,
  resetErrorBoundary,
}: PropsWithChildren<ErrorBoundaryContextType>) {
  const value = useMemo(
    () => ({ didCatch, error, resetErrorBoundary }),
    [didCatch, error, resetErrorBoundary],
  );

  return createElement(ErrorBoundaryContext.Provider, { value }, children);
}
