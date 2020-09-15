import * as React from 'react'

export interface FallbackProps {
  error?: Error
  resetErrorBoundary: () => void
}

export interface ErrorBoundaryPropsWithComponent {
  onResetKeysChange?: (prevResetKeys: Array<any>, resetKeys: Array<any>) => void
  onReset?: () => void
  onError?: (error: Error, info: { componentStack: string }) => void
  resetKeys?: Array<any>
  FallbackComponent: React.ComponentType<FallbackProps>
}

export interface ErrorBoundaryPropsWithRender {
  onResetKeysChange?: (prevResetKeys: Array<any>, resetKeys: Array<any>) => void
  onReset?: () => void
  onError?: (error: Error, info: { componentStack: string }) => void
  resetKeys?: Array<any>
  fallbackRender: (props: FallbackProps) => React.ReactElement<any, any> | null
}

export interface ErrorBoundaryPropsWithFallback {
  onResetKeysChange?: (prevResetKeys: Array<any>, resetKeys: Array<any>) => void
  onReset?: () => void
  onError?: (error: Error, info: { componentStack: string }) => void
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

export function useErrorHandler<P = Error>(
  error?: P,
): React.Dispatch<React.SetStateAction<P>>
