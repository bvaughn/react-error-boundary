import React from 'react'

const initialState = {error: null, info: null}
class ErrorBoundary extends React.Component {
  state = initialState
  resetErrorBoundary = () => this.setState(initialState)

  componentDidCatch(error, info) {
    this.props.onError?.(error, info?.componentStack)
    this.setState({error, info})
  }

  render() {
    const {error, info} = this.state
    const {fallbackRender, FallbackComponent, fallback} = this.props

    if (error !== null) {
      const props = {
        componentStack: info?.componentStack,
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      }
      if (fallback) {
        return fallback
      } else if (fallbackRender) {
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

export {ErrorBoundary, withErrorBoundary}
