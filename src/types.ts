import {
  Component,
  ComponentType,
  ErrorInfo,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";

declare function FallbackRender(props: FallbackProps): ReactNode;

export type FallbackProps = {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
};

type ErrorBoundarySharedProps = PropsWithChildren<{
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: (
    details:
      | { reason: "imperative-api"; args: any[] }
      | { reason: "keys"; prev: any[] | undefined; next: any[] | undefined }
  ) => void;
  resetKeys?: any[];
}>;

export type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent: ComponentType<FallbackProps>;
  fallbackRender?: never;
};

export type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent?: never;
  fallbackRender: typeof FallbackRender;
};

export type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
  fallback: ReactElement<
    unknown,
    string | FunctionComponent | typeof Component
  > | null;
  FallbackComponent?: never;
  fallbackRender?: never;
};

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender;
