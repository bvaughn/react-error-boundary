/** @flow */

import React, {Component} from 'react';
import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent';

import type {ComponentType} from 'react';

type Props = {
  children?: any,
  FallbackComponent: ComponentType<any>,
  onError?: (error: Error, componentStack: string) => void,
};

type ErrorInfo = {
  componentStack: string,
};

type State = {
  error: ?Error,
  info: ?ErrorInfo,
};

class ErrorBoundary extends Component<Props, State> {
  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const {onError} = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : "");
      } catch (ignoredError) {}
    }

    this.setState({error, info});
  }

  render() {
    const {children, FallbackComponent} = this.props;
    const {error, info} = this.state;

    if (error !== null) {
      return (
        <FallbackComponent
          componentStack={info ? info.componentStack : ''}
          error={error}
        />
      );
    }

    return children;
  }
}

export const withErrorBoundary = (
  Component: ComponentType<any>,
  FallbackComponent: ComponentType<any>,
  onError: Function,
): Function => props => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
    <Component {...props} />
  </ErrorBoundary>
);

export default ErrorBoundary;
