import React from 'react'

const changedArray = (a = [], b = []) =>
  a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))

const initialState = {error: null}
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return {error}
  }

  state = initialState
  updatedWithError = false
  resetErrorBoundary = (...args) => {
    this.props.onReset?.(...args)
    this.reset()
  }

  reset() {
    this.updatedWithError = false
    this.setState(initialState)
  }

  componentDidCatch(error, info) {
    this.props.onError?.(error, info)
  }

  componentDidUpdate(prevProps) {
    const {error} = this.state
    const {resetKeys} = this.props

    // There's an edge case where if the thing that triggered the error
    // happens to *also* be in the resetKeys array, we'd end up resetting
    // the error boundary immediately. This would likely trigger a second
    // error to be thrown.
    // So we make sure that we don't check the resetKeys on the first call
    // of cDU after the error is set
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true
      return
    }

    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      this.props.onResetKeysChange?.(prevProps.resetKeys, resetKeys)
      this.reset()
    }
  }

  render() {
    const {error} = this.state
    const {fallbackRender, FallbackComponent, fallback} = this.props

    if (error !== null) {
      const props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }
      if (React.isValidElement(fallback)) {
        return fallback
      } else if (typeof fallbackRender === 'function') {
        return fallbackRender(props)
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

function withErrorBoundary(Component, errorBoundaryProps) {
  function Wrapped(props) {
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

function useErrorHandler(givenError) {
  const [error, setError] = React.useState(null)
  if (givenError) throw givenError
  if (error) throw error
  return setError
}

export {ErrorBoundary, withErrorBoundary, useErrorHandler}
