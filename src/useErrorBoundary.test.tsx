/**
 * @jest-environment jsdom
 */

import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { ErrorBoundary } from "./ErrorBoundary";
import { UseErrorBoundaryApi, useErrorBoundary } from "./useErrorBoundary";

describe("useErrorBoundary", () => {
  let container: HTMLDivElement;
  let lastRenderedUseErrorBoundaryApi: UseErrorBoundaryApi<Error> | null = null;

  beforeEach(() => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;

    // Don't clutter the console with expected error text
    jest.spyOn(console, "error").mockImplementation(() => {});

    container = document.createElement("div");
    lastRenderedUseErrorBoundaryApi = null;
  });

  function render() {
    function Child() {
      lastRenderedUseErrorBoundaryApi = useErrorBoundary<Error>();

      return <div>Child</div>;
    }

    const root = createRoot(container);
    act(() => {
      root.render(
        <ErrorBoundary fallback={<div>Error</div>}>
          <Child />
        </ErrorBoundary>
      );
    });
  }

  it("should activate an error boundary", () => {
    render();
    expect(container.textContent).toBe("Child");

    act(() => {
      lastRenderedUseErrorBoundaryApi?.showBoundary(new Error("Example"));
    });
    expect(container.textContent).toBe("Error");
  });

  it("should reset an active error boundary", () => {
    render();

    act(() => {
      lastRenderedUseErrorBoundaryApi?.showBoundary(new Error("Example"));
    });
    expect(container.textContent).toBe("Error");

    act(() => {
      lastRenderedUseErrorBoundaryApi?.resetBoundary();
    });
    expect(container.textContent).toBe("Child");
  });

  it("should work within a fallback component", () => {
    let resetBoundary: UseErrorBoundaryApi<Error>["resetBoundary"] | null =
      null;
    let showBoundary: UseErrorBoundaryApi<Error>["showBoundary"] | null = null;

    function FallbackComponent() {
      resetBoundary = useErrorBoundary<Error>().resetBoundary;
      return <div>Error</div>;
    }

    function Child() {
      showBoundary = useErrorBoundary<Error>().showBoundary;
      return <div>Child</div>;
    }

    const root = createRoot(container);
    act(() => {
      root.render(
        <ErrorBoundary FallbackComponent={FallbackComponent}>
          <Child />
        </ErrorBoundary>
      );
    });
    expect(container.textContent).toBe("Child");

    act(() => {
      showBoundary!(new Error("Example"));
    });
    expect(container.textContent).toBe("Error");

    act(() => {
      resetBoundary!();
    });
    expect(container.textContent).toBe("Child");
  });
});
