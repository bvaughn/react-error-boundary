/** @flow */

import React, { Component } from 'react';
import ErrorBoundaryFallbackComponent from './ErrorBoundaryFallbackComponent';

type Props = {
  children?: any,
  FallbackComponent: any,
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
  props: Props;
  state: State;

  setState: Function

  static defaultProps = {
    FallbackComponent: ErrorBoundaryFallbackComponent,
  };

  constructor(props: Props, context: any) {
    super(props, context);

    this.state = {
      error: null,
      info: null,
    };
  }

  unstable_handleError(error: Error, info: ErrorInfo):void {
    // This method is a fallback for react <= 16.0.0-alpha.13
    this.componentDidCatch(error, info);
  }

  componentDidCatch(error: Error, info: ErrorInfo):void {
    const {onError} = this.props;

    if (typeof onError === 'function') {
      try {
        onError(error, info ? info.componentStack : '');
      } catch (error) {}
    }

    this.setState({error, info});
  }

  render() {
    const {children, FallbackComponent} = this.props;
    const {error, info} = this.state;

    if (error !== null) {
      return (
        <FallbackComponent componentStack={info ? info.componentStack : ''} error={error} />
      );
    }

    return children;
  }
}


export const withErrorBoundary: Function = (
    Component: Class<React.Component<*>>,
    FallbackComponent: Class<React.Component<*>>,
    onError: Function
): Function => props => (
        <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
            <Component {...props} />
        </ErrorBoundary>
    );


export default ErrorBoundary;
