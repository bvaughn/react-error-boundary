import { act, memo, useLayoutEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { assert } from "../utils/assert";
import { getErrorMessage } from "../utils/getErrorMessage";
import { useErrorBoundary, type UseErrorBoundaryApi } from "./useErrorBoundary";

describe("useErrorBoundary", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // @ts-expect-error This is a React internal
    global.IS_REACT_ACT_ENVIRONMENT = true;

    vi.spyOn(console, "error").mockImplementation(() => {
      // Don't clutter the console with expected error text
    });

    container = document.createElement("div");
  });

  function render(content: ReactNode) {
    const root = createRoot(container);
    act(() => {
      root.render(content);
    });
    return root;
  }

  it("should activate and deactivate the nearest error boundary", () => {
    let resetBoundaryFn: UseErrorBoundaryApi["resetBoundary"] | null = null;
    let showBoundaryFn: UseErrorBoundaryApi["showBoundary"] | null = null;

    function Child() {
      const { resetBoundary, showBoundary } = useErrorBoundary();

      useLayoutEffect(() => {
        resetBoundaryFn = resetBoundary;
        showBoundaryFn = showBoundary;
      }, [resetBoundary, showBoundary]);

      return <div>Child</div>;
    }

    render(
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div>Fallback: {getErrorMessage(error)}</div>
        )}
      >
        <Child />
      </ErrorBoundary>,
    );
    expect(container.textContent).toBe("Child");

    act(() => {
      assert(showBoundaryFn != null);
      showBoundaryFn(new Error("Example"));
    });
    expect(container.textContent).toBe("Fallback: Example");

    act(() => {
      assert(resetBoundaryFn != null);
      resetBoundaryFn();
    });
    expect(container.textContent).toBe("Child");
  });

  it("should expose the current error to a fallback component", () => {
    const errorToThrow = new Error("Thrown");

    function Child() {
      const { error } = useErrorBoundary();
      expect(error).toBe(null);

      throw errorToThrow;

      return null;
    }

    function Fallback() {
      const { error } = useErrorBoundary();
      expect(error).toBe(errorToThrow);

      return "Fallback";
    }

    render(
      <ErrorBoundary FallbackComponent={Fallback}>
        <Child />
      </ErrorBoundary>,
    );

    expect(container.textContent).toBe("Fallback");
  });

  it("should not rerender memoized consumers when the boundary context is unchanged", () => {
    const renderConsumer = vi.fn();
    const Child = memo(function Child() {
      const { error } = useErrorBoundary();
      renderConsumer(error);
      return "Child";
    });

    const root = render(
      <ErrorBoundary fallback={null}>
        <Child />
      </ErrorBoundary>,
    );
    expect(renderConsumer).toHaveBeenCalledTimes(1);

    act(() =>
      root.render(
        <ErrorBoundary fallback={null}>
          <Child />
        </ErrorBoundary>,
      ),
    );
    expect(renderConsumer).toHaveBeenCalledTimes(1);
    act(() => root.unmount());
  });

  it("should not rerender memoized fallback consumers when the error is unchanged", () => {
    const error = new Error("Thrown");
    const renderFallback = vi.fn();
    const Fallback = memo(function Fallback() {
      const { error } = useErrorBoundary();
      renderFallback(error);
      return "Fallback";
    });
    function Throws(): never {
      throw error;
    }

    const root = render(
      <ErrorBoundary FallbackComponent={Fallback}>
        <Throws />
      </ErrorBoundary>,
    );
    expect(renderFallback).toHaveBeenLastCalledWith(error);
    const initialRenders = renderFallback.mock.calls.length;

    act(() =>
      root.render(
        <ErrorBoundary FallbackComponent={Fallback}>
          <Throws />
        </ErrorBoundary>,
      ),
    );
    expect(renderFallback).toHaveBeenCalledTimes(initialRenders);
    act(() => root.unmount());
  });
});
