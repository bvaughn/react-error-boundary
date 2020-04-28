import * as React from 'react'

export interface FallbackProps {
  error?: Error
  componentStack?: string
  resetErrorBoundary: () => void
}

export interface ErrorBoundaryPropsWithComponent {
  onError?: (error: Error, componentStack: string) => void
  FallbackComponent: React.ComponentType<FallbackProps>
}

export interface ErrorBoundaryPropsWithRender {
  onError?: (error: Error, componentStack: string) => void
  fallbackRender: (props: FallbackProps) => React.ReactElement<any, any> | null
}

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps
> {}

export function withErrorBoundary<P>(
  ComponentToDecorate: React.ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps,
): React.ComponentType<P>
