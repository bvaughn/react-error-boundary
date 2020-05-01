import * as React from 'react'

export interface FallbackProps {
  error?: Error
  componentStack?: string
  resetErrorBoundary: () => void
}

export interface ErrorBoundaryPropsWithComponent {
  onReset?: () => void
  onError?: (error: Error, componentStack: string) => void
  resetKeys?: Array<any>
  FallbackComponent: React.ComponentType<FallbackProps>
}

export interface ErrorBoundaryPropsWithRender {
  onReset?: () => void
  onError?: (error: Error, componentStack: string) => void
  resetKeys?: Array<any>
  fallbackRender: (props: FallbackProps) => React.ReactElement<any, any> | null
}

export interface ErrorBoundaryPropsWithFallback {
  onReset?: () => void
  onError?: (error: Error, componentStack: string) => void
  resetKeys?: Array<any>
  fallback: React.ReactElement<any, any> | null
}

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {}

export function withErrorBoundary<P>(
  ComponentToDecorate: React.ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps,
): React.ComponentType<P>
