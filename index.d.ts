import React from 'react';

export interface FallbackProps {
  error?: Error;
  componentStack?: string;
}

export interface ErrorBoundaryProps {
  onError?: (error: Error, componentStack: string) => void;
  FallbackComponent?: React.ComponentType<FallbackProps>;
}

export function withErrorBoundary<P>(
  CustomFallbackComponent?: React.ComponentType<FallbackProps>,
  onErrorHandler?: (error: Error, componentStack: string) => void,
): (BaseComponent: React.ComponentType<P>) => React.ComponentType<P>;

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps>{}
