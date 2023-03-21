/**
 * @jest-environment jsdom
 */

import { PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { withErrorBoundary } from "./withErrorBoundary";

describe("withErrorBoundary", () => {
  let container: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  let shouldThrow = true;
  let valueToThrow: any;

  beforeEach(() => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;

    // Don't clutter the console with expected error text
    jest.spyOn(console, "error").mockImplementation(() => {});

    container = document.createElement("div");
    root = createRoot(container);
    shouldThrow = false;
    valueToThrow = new Error("💥💥💥");
  });

  function MaybeThrows({ children = "Children" }: PropsWithChildren) {
    if (shouldThrow) {
      throw valueToThrow;
    }
    return children as any;
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
});
