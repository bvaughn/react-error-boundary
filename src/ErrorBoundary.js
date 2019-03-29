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
        /* istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment. */
        onError.call(this, error, info ? info.componentStack : '');
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
          componentStack={
            // istanbul ignore next: Ignoring ternary; can’t reproduce missing info in test environment.
            info ? info.componentStack : ''
          }
          error={error}
        />
      );
    }

    return children || null;
  }
}

export const withErrorBoundary = (
  Component: ComponentType<any>,
  FallbackComponent: ComponentType<any>,
  onError: Function,
): Function => {
  const Wrapped = props => (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );
  Wrapped.displayName = `WithErrorBoundary(${getDisplayName(Component)})`;
  return Wrapped;
};

export default ErrorBoundary;
