import { useContext, useMemo, useState } from "react";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";
import { assert } from "./utils";

type UseErrorBoundaryState<TError> =
  | { error: TError; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<TError> = {
  resetBoundary: () => void;
  showBoundary: (error: TError) => void;
};

export function useErrorBoundary<TError = any>(): UseErrorBoundaryApi<TError> {
  const contextValue = useContext(ErrorBoundaryContext);

  const hasErrorBoundaryContext =
    contextValue !== null &&
    typeof contextValue.didCatch === "boolean" &&
    typeof contextValue.resetErrorBoundary === "function";

  assert(
    hasErrorBoundaryContext,
    "useErrorBoundary need ErrorBoundaryContext.Provider or ErrorBoundary in parent"
  );

  const [state, setState] = useState<UseErrorBoundaryState<TError>>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        contextValue.resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: TError) =>
        setState({
          error,
          hasError: true,
        }),
    }),
    [contextValue.resetErrorBoundary]
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
