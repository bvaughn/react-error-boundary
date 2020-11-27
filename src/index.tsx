import * as React from 'react'

const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))

interface FallbackProps {
  error: Error
  resetErrorBoundary: (...args: Array<unknown>) => void
}

interface ErrorBoundaryPropsWithComponent {
  onResetKeysChange?: (
    prevResetKeys: Array<unknown>,
    resetKeys: Array<unknown>,
  ) => void
  onReset?: (...args: Array<unknown>) => void
  onError?: (error: Error, info: {componentStack: string}) => void
  resetKeys?: Array<unknown>
  FallbackComponent: React.ComponentType<FallbackProps>
}

declare function FallbackRender(
  props: FallbackProps,
): React.ReactElement<
  unknown,
  string | React.FunctionComponent | typeof React.Component
> | null

interface ErrorBoundaryPropsWithRender {
  onResetKeysChange?: (
    prevResetKeys: Array<unknown>,
    resetKeys: Array<unknown>,
  ) => void
  onReset?: (...args: Array<unknown>) => void
  onError?: (error: Error, info: {componentStack: string}) => void
  resetKeys?: Array<unknown>
  fallbackRender: typeof FallbackRender
}

interface ErrorBoundaryPropsWithFallback {
  onResetKeysChange?: (
    prevResetKeys: Array<unknown>,
    resetKeys: Array<unknown>,
  ) => void
  onReset?: (...args: Array<unknown>) => void
  onError?: (error: Error, info: {componentStack: string}) => void
  resetKeys?: Array<unknown>
  fallback: React.ReactElement<
    unknown,
    string | React.FunctionComponent | typeof React.Component
  > | null
}

type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender

type ErrorBoundaryState = {error: Error | null}
const initialState = {error: null}
class ErrorBoundary extends React.Component<
  // TODO: why is there not a PropsWithRefAndChildren? 🤔
  React.PropsWithRef<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  state = initialState
  updatedWithError = false
  resetErrorBoundary = (...args: Array<unknown>) => {
    this.props.onReset?.(...args)
    this.reset()
  }

  reset() {
    this.updatedWithError = false
    this.setState(initialState)
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.props.onError?.(error, info)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const {error} = this.state
    const {resetKeys} = this.props

    // There's an edge case where if the thing that triggered the error
    // happens to *also* be in the resetKeys array, we'd end up resetting
    // the error boundary immediately. This would likely trigger a second
    // error to be thrown.
    // So we make sure that we don't check the resetKeys on the first call
    // of cDU after the error is set

    // TODO: figure out why this is considered an unnecessary condition...
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true
      return
    }

    // TODO: figure out why this is considered an unnecessary condition...
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      this.props.onResetKeysChange?.(
        prevProps.resetKeys as Array<unknown>,
        resetKeys as Array<unknown>,
      )
      this.reset()
    }
  }

  render() {
    const {error} = this.state
    // @ts-expect-error ts(2339) (at least one of these will be defined though, and we check for their existance)
    const {fallbackRender, FallbackComponent, fallback} = this.props

    // TODO: figure out why this is considered an unnecessary condition...
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (error !== null) {
      const props = ({
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      } as unknown) as FallbackProps
      if (React.isValidElement(fallback)) {
        return fallback
      } else if (typeof fallbackRender === 'function') {
        return (fallbackRender as typeof FallbackRender)(props)
      } else if (FallbackComponent) {
        return <FallbackComponent {...props} />
      } else {
        throw new Error(
          'react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop',
        )
      }
    }

    return this.props.children
  }
}

function withErrorBoundary<P>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps,
): React.ComponentType<P> {
  const Wrapped: React.ComponentType<P> = props => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }

  // Format for display in DevTools
  const name = Component.displayName || Component.name || 'Unknown'
  Wrapped.displayName = `withErrorBoundary(${name})`

  return Wrapped
}

function useErrorHandler<P = Error>(
  givenError?: P,
): React.Dispatch<React.SetStateAction<P | null>> {
  const [error, setError] = React.useState<P | null>(null)
  if (givenError) throw givenError
  if (error) throw error
  return setError
}

export {ErrorBoundary, withErrorBoundary, useErrorHandler}
export type {
  FallbackProps,
  ErrorBoundaryPropsWithComponent,
  ErrorBoundaryPropsWithRender,
  ErrorBoundaryPropsWithFallback,
  ErrorBoundaryProps,
}

/*
eslint
  @typescript-eslint/no-throw-literal: "off",
  @typescript-eslint/prefer-nullish-coalescing: "off"
*/
