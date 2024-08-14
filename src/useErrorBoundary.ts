import { useContext, useMemo, useState } from "react";
import { assertErrorBoundaryContext } from "./assertErrorBoundaryContext";
import { ErrorBoundaryContext } from "./ErrorBoundaryContext";

type StateError<TError> =
  | (TError & { _suppressLogging: true })
  | (Error & { _suppressLogging: true });

type UseErrorBoundaryState<TError> =
  | { error: StateError<TError>; hasError: true }
  | { error: null; hasError: false };

export type UseErrorBoundaryApi<TError> = {
  resetBoundary: () => void;
  showBoundary: (error: TError) => void;
};

function suppressLoggingForError<TError>(error: TError): StateError<TError> {
  if (error != null) {
    switch (typeof error) {
      case "object": {
        if (Object.isExtensible(error)) {
          (error as StateError<TError>)._suppressLogging = true;
          return error as StateError<TError>;
        } else {
          return Object.assign(Object.create(error as object), {
            _suppressLogging: true as true,
          });
        }
      }
      default: {
        return Object.assign(Error(error as string), {
          _suppressLogging: true as true,
        });
      }
    }
  } else {
    return Object.assign(Error(undefined), {
      _suppressLogging: true as true,
    });
  }
}

export function useErrorBoundary<TError = any>(): UseErrorBoundaryApi<TError> {
  const context = useContext(ErrorBoundaryContext);

  assertErrorBoundaryContext(context);

  const [state, setState] = useState<UseErrorBoundaryState<TError>>({
    error: null,
    hasError: false,
  });

  const memoized = useMemo(
    () => ({
      resetBoundary: () => {
        context.resetErrorBoundary();
        setState({ error: null, hasError: false });
      },
      showBoundary: (error: TError) => {
        setState({
          error: suppressLoggingForError(error),
          hasError: true,
        });
      },
    }),
    [context.resetErrorBoundary]
  );

  if (state.hasError) {
    throw state.error;
  }

  return memoized;
}
