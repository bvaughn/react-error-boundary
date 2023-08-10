import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

type UseErrorBoundaryState<Error> =
  | { error: Error; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<Error> = {
  resetBoundary: () => void;
  showBoundary: (error: Error) => void;
};

export function useErrorBoundary<Error = any>(): UseErrorBoundaryApi<Error> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const [state, setState] = useState<UseErrorBoundaryState<Error>>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        context?.resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: Error) =>
        setState({
          error,
          hasError: true,
        }),
    }),
    [context?.resetErrorBoundary]
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
