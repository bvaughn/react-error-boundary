import { act, useLayoutEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { assert } from "./assert";
import { ErrorBoundary } from "./ErrorBoundary";
import { useErrorBoundary, type UseErrorBoundaryApi } from "./useErrorBoundary";

describe("useErrorBoundary", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
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
        fallbackRender={({ error }) => <div>Fallback: {error.message}</div>}
      >
        <Child />
      </ErrorBoundary>
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
      </ErrorBoundary>
    );

    expect(container.textContent).toBe("Fallback");
  });
});
