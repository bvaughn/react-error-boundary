import {
  Component,
  createRef,
  forwardRef,
  useImperativeHandle,
  type PropsWithChildren,
  type Ref,
} from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { withErrorBoundary } from "./withErrorBoundary";
import { assert } from "./assert";

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

    class TestClassComponent extends Component<Props> {
      getFoo() {
        return this.props.foo;
      }
      render() {
        return null;
      }
    }

    const Wrapped = withErrorBoundary(TestClassComponent, {
      fallback: <div>Error</div>,
    });

    const ref = createRef<TestClassComponent>();

    act(() => {
      root.render(<Wrapped foo="abc" ref={ref} />);
    });

    assert(ref.current !== null);
    expect(ref.current.getFoo()).toBe("abc");
  });

  it("should forward refs to a function component that takes a ref prop", () => {
    type Handle = { getFoo: () => string };

    function TestFunctionComponent({
      foo,
      ref,
    }: {
      foo: string;
      ref?: Ref<Handle>;
    }) {
      useImperativeHandle(ref, () => ({
        getFoo: () => foo,
      }));
      return foo;
    }

    const Wrapped = withErrorBoundary(TestFunctionComponent, {
      fallback: <div>Error</div>,
    });

    const ref = createRef<Handle>();

    act(() => {
      root.render(<Wrapped foo="abc" ref={ref} />);
    });

    assert(ref.current !== null);
    expect(ref.current.getFoo()).toBe("abc");
  });

  it("should forward refs to a function using forwardRef", () => {
    type Handle = { getFoo: () => string };

    const TestForwardRefComponent = forwardRef(
      ({ foo }: { foo: string }, ref: Ref<Handle>) => {
        useImperativeHandle(ref, () => ({
          getFoo: () => foo,
        }));
        return null;
      },
    );

    const Wrapped = withErrorBoundary(TestForwardRefComponent, {
      fallback: <div>Error</div>,
    });

    const ref = createRef<Handle>();

    act(() => {
      root.render(<Wrapped foo="abc" ref={ref} />);
    });

    assert(ref.current !== null);
    expect(ref.current.getFoo()).toBe("abc");
  });
});
