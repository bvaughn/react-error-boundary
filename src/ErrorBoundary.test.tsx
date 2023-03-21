/**
 * @jest-environment jsdom
 */

import { createRef, PropsWithChildren, ReactElement, RefObject } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { ErrorBoundary } from "./ErrorBoundary";
import {
  ErrorBoundaryPropsWithComponent,
  ErrorBoundaryPropsWithFallback,
  ErrorBoundaryPropsWithRender,
  FallbackProps,
} from "./types";

describe("ErrorBoundary", () => {
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

  function MaybeThrows({ children }: PropsWithChildren) {
    if (shouldThrow) {
      throw valueToThrow;
    }
    return children as any;
  }

  it("should render children", () => {
    const container = document.createElement("div");
    const root = createRoot(container);
    act(() => {
      root.render(
        <ErrorBoundary fallback={<div>Error</div>}>
          <MaybeThrows>Content</MaybeThrows>
        </ErrorBoundary>
      );
    });

    expect(container.textContent).toBe("Content");
  });

  describe("callback props", () => {
    let errorBoundaryRef: RefObject<ErrorBoundary>;

    beforeEach(() => {
      errorBoundaryRef = createRef<ErrorBoundary>();
    });

    function render(props: Omit<ErrorBoundaryPropsWithFallback, "fallback">) {
      act(() => {
        root.render(
          <ErrorBoundary
            {...props}
            fallback={<div>Error</div>}
            ref={errorBoundaryRef}
          >
            <MaybeThrows>Content</MaybeThrows>
          </ErrorBoundary>
        );
      });
    }

    it('should call "onError" prop if one is provided', () => {
      shouldThrow = true;

      const onError: jest.Mock<any, any> = jest.fn();

      render({ onError });

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0].message).toEqual("💥💥💥");
    });

    it('should call "onReset" when boundary reset via imperative API', () => {
      shouldThrow = true;

      const onReset: jest.Mock<any, any> = jest.fn();

      render({ onReset });
      expect(onReset).not.toHaveBeenCalled();

      act(() => errorBoundaryRef.current?.resetErrorBoundary("abc", 123));

      expect(onReset).toHaveBeenCalledTimes(1);
    });

    it('should call "onReset" when boundary reset via "resetKeys"', () => {
      shouldThrow = false;

      const onReset: jest.Mock<any, any> = jest.fn();

      render({ onReset, resetKeys: [1] });
      expect(onReset).not.toHaveBeenCalled();

      // It should not be called if the keys change without an error
      render({ onReset, resetKeys: [2] });
      expect(onReset).not.toHaveBeenCalled();

      shouldThrow = true;

      render({ onReset, resetKeys: [2] });
      expect(onReset).not.toHaveBeenCalled();

      shouldThrow = false;

      render({ onReset, resetKeys: [3] });
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });

  describe('"fallback" element', () => {
    function render(
      props: Omit<ErrorBoundaryPropsWithFallback, "fallback"> = {}
    ) {
      act(() => {
        root.render(
          <ErrorBoundary {...props} fallback={<div>Error</div>}>
            <MaybeThrows>Content</MaybeThrows>
          </ErrorBoundary>
        );
      });
    }

    it("should render fallback in the event of an error", () => {
      shouldThrow = true;
      render();
      expect(container.textContent).toBe("Error");
    });

    it("should re-render children if boundary is reset reset keys", () => {
      shouldThrow = true;
      render({ resetKeys: [1] });

      shouldThrow = false;
      expect(container.textContent).toBe("Error");

      render({ resetKeys: [2] });
      expect(container.textContent).toBe("Content");
    });
  });

  describe('"FallbackComponent"', () => {
    let fallbackComponent: jest.Mock<ReactElement, [FallbackProps]>;
    let lastRenderedError: any = null;
    let lastRenderedResetErrorBoundary: Function | null = null;

    function render(
      props: Omit<ErrorBoundaryPropsWithComponent, "FallbackComponent"> = {}
    ) {
      act(() => {
        root.render(
          <ErrorBoundary {...props} FallbackComponent={fallbackComponent}>
            <MaybeThrows>Content</MaybeThrows>
          </ErrorBoundary>
        );
      });
    }

    beforeEach(() => {
      lastRenderedError = null;
      lastRenderedResetErrorBoundary = null;

      fallbackComponent = jest.fn();
      fallbackComponent.mockImplementation(
        ({ error, resetErrorBoundary }: FallbackProps) => {
          lastRenderedError = error;
          lastRenderedResetErrorBoundary = resetErrorBoundary;

          return <div>FallbackComponent</div>;
        }
      );
    });

    it("should render fallback in the event of an error", () => {
      shouldThrow = true;
      render();
      expect(lastRenderedError.message).toBe("💥💥💥");
      expect(container.textContent).toBe("FallbackComponent");
    });

    it("should re-render children if boundary is reset via prop", () => {
      shouldThrow = true;
      render();
      expect(container.textContent).toBe("FallbackComponent");

      expect(lastRenderedResetErrorBoundary).not.toBeNull();
      act(() => {
        shouldThrow = false;
        lastRenderedResetErrorBoundary!();
      });

      expect(container.textContent).toBe("Content");
    });

    it("should re-render children if boundary is reset reset keys", () => {
      shouldThrow = true;
      render({ resetKeys: [1] });
      expect(container.textContent).toBe("FallbackComponent");

      shouldThrow = false;
      render({ resetKeys: [2] });
      expect(container.textContent).toBe("Content");
    });
  });

  describe('"fallbackRender" render prop', () => {
    let lastRenderedError: any = null;
    let lastRenderedResetErrorBoundary: Function | null = null;
    let fallbackRender: jest.Mock<ReactElement, [FallbackProps]>;

    function render(
      props: Omit<ErrorBoundaryPropsWithRender, "fallbackRender"> = {}
    ) {
      act(() => {
        root.render(
          <ErrorBoundary {...props} fallbackRender={fallbackRender}>
            <MaybeThrows>Content</MaybeThrows>
          </ErrorBoundary>
        );
      });
    }

    beforeEach(() => {
      lastRenderedError = null;
      lastRenderedResetErrorBoundary = null;

      fallbackRender = jest.fn();
      fallbackRender.mockImplementation(
        ({ error, resetErrorBoundary }: FallbackProps) => {
          lastRenderedError = error;
          lastRenderedResetErrorBoundary = resetErrorBoundary;

          return <div>fallbackRender</div>;
        }
      );
    });

    it("should render fallback in the event of an error", () => {
      shouldThrow = true;
      render();
      expect(lastRenderedError.message).toBe("💥💥💥");
      expect(fallbackRender).toHaveBeenCalled();
      expect(container.textContent).toBe("fallbackRender");
    });

    it("should re-render children if boundary is reset via prop", () => {
      shouldThrow = true;
      render();
      expect(lastRenderedError.message).toBe("💥💥💥");
      expect(fallbackRender).toHaveBeenCalled();
      expect(container.textContent).toBe("fallbackRender");

      act(() => {
        shouldThrow = false;
        lastRenderedResetErrorBoundary!();
      });

      expect(container.textContent).toBe("Content");
    });

    it("should re-render children if boundary is reset reset keys", () => {
      shouldThrow = true;
      render({ resetKeys: [1] });
      expect(lastRenderedError.message).toBe("💥💥💥");
      expect(fallbackRender).toHaveBeenCalled();
      expect(container.textContent).toBe("fallbackRender");

      shouldThrow = false;
      render({ resetKeys: [2] });
      expect(container.textContent).toBe("Content");
    });
  });

  describe("thrown values", () => {
    let lastRenderedError: any = null;
    let fallbackRender: (props: FallbackProps) => ReactElement;
    let onError: jest.Mock<any, any>;

    beforeEach(() => {
      lastRenderedError = null;

      onError = jest.fn();

      fallbackRender = ({ error }: FallbackProps) => {
        lastRenderedError = error;

        return <div>Error</div>;
      };
    });

    function render() {
      act(() => {
        root.render(
          <ErrorBoundary fallbackRender={fallbackRender} onError={onError}>
            <MaybeThrows>Content</MaybeThrows>
          </ErrorBoundary>
        );
      });
    }

    it("should support thrown strings", () => {
      shouldThrow = true;
      valueToThrow = "String error";

      render();

      expect(lastRenderedError).toBe("String error");
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toEqual("String error");
      expect(container.textContent).toBe("Error");
    });

    it("should support thrown null or undefined values", () => {
      shouldThrow = true;
      valueToThrow = null;

      render();

      expect(lastRenderedError).toBe(null);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toEqual(null);
      expect(container.textContent).toBe("Error");
    });
  });

  // TODO Various cases with resetKeys changing (length, order, etc)
  // TODO Errors thrown again after reset are caught
  // TODO Nested error boundaries if a fallback throws
});
