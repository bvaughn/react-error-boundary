import { Component, createRef, type PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { withErrorBoundary } from "./withErrorBoundary";

describe("withErrorBoundary", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  let shouldThrow = true;
  let valueToThrow: unknown;

  beforeEach(() => {
    // @ts-expect-error This is a React internal
    global.IS_REACT_ACT_ENVIRONMENT = true;

    // Don't clutter the console with expected error text
    vi.spyOn(console, "error").mockImplementation(() => {
      // No-op
    });

    container = document.createElement("div");
    root = createRoot(container);
    shouldThrow = false;
    valueToThrow = new Error("💥💥💥");
  });

  function MaybeThrows({ children = "Children" }: PropsWithChildren) {
    if (shouldThrow) {
      throw valueToThrow;
    }
    return children;
  }

  function render() {
    const ErrorBoundary = withErrorBoundary(MaybeThrows, {
      fallback: <div>Error</div>,
    });

    act(() => {
      root.render(<ErrorBoundary />);
    });
  }

  it("should render children within the created HOC", () => {
    render();
    expect(container.textContent).toBe("Children");
  });

  it("should catch errors with the created HOC", () => {
    shouldThrow = true;
    render();
    expect(container.textContent).toBe("Error");
  });

  it("should forward refs", () => {
    type Props = { foo: string };

    class Inner extends Component<Props> {
      test() {
        // No-op
      }
      render() {
        return this.props.foo;
      }
    }

    const Wrapped = withErrorBoundary(Inner, {
      fallback: <div>Error</div>,
    });

    const ref = createRef<Inner>();

    act(() => {
      root.render(<Wrapped foo="abc" ref={ref} />);
    });

    expect(ref.current).not.toBeNull();
    expect(typeof ref.current?.test).toBe("function");
  });
});
