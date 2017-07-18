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

class ErrorBoundary extends Component {
  props: Props;
  state: State;

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
    this.componentDidError(error, info);
  }

  componentDidError(error: Error, info: ErrorInfo):void {
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

export default ErrorBoundary;