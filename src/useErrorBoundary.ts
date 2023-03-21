import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

export type UseErrorBoundaryApi<Error> = {
  resetBoundary: () => void;
  showBoundary: (error: Error) => void;
};

export function useErrorBoundary<Error = any>(): UseErrorBoundaryApi<Error> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const [state, setState] = useState<{
    error: Error | null;
    hasError: boolean;
  }>({
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
