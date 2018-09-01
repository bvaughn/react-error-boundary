import {mount} from 'enzyme';
import React from 'react';

import ErrorBoundary, {withErrorBoundary} from '../ErrorBoundary';
import ErrorBoundaryFallbackComponent from '../ErrorBoundaryFallbackComponent';

describe('ErrorBoundary', () => {
  let consoleErrorSpy;
  let mockError;

  let Spell;
  let Wand;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {
      // React error boundaries print the error to `console.error` stream even when it’s caught by our
      // `ErrorBoundary` component. We suppress `console.error` to keep our test console output clean.
      // @see #11098 Allow suppressing error boundary logs from intentionally thrown/caught errors
      // https://github.com/facebook/react/issues/11098
    });

    mockError = new Error(
      'You cast an unforgivable curse! You’ve earned a one-way ticket to Azkaban.',
    );
    Spell = ({incantation}) => {
      switch (incantation) {
        case 'Avada Kedavra':
        case 'Crucio':
        case 'Imperio':
          throw mockError;

        default:
          return <p>{`You cast the ${incantation} spell!`}</p>;
      }
    };

    Wand = ({name, incantation}) => (
      <div>
        <p>{`Casting spell with the ${name} wand`}</p>
        <Spell incantation={incantation} />
      </div>
    );
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('Renders the child component if there is no error', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Wand name="Harry’s" incantation="Expelliarmus" />
      </ErrorBoundary>,
    );

    const WandWithErrorBoundary = withErrorBoundary(Wand);
    const wrapperWithErrorBoundary = mount(
      <WandWithErrorBoundary name="Harry’s" incantation="Expelliarmus" />,
    );

    expect(wrapper.state().error).toBe(null);
    expect(wrapper.state().info).toBe(null);
    expect(
      wrapper.containsMatchingElement(<ErrorBoundaryFallbackComponent />),
    ).toBe(false);
    expect(
      wrapper.contains(<Wand name="Harry’s" incantation="Expelliarmus" />),
    ).toBe(true);

    // Note: We use `….instance().state …` instead of `….state() …` here because…
    // > ReactWrapper::state() can only be called on the root
    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.error,
    ).toBe(null);
    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.info,
    ).toBe(null);
    expect(
      wrapperWithErrorBoundary.containsMatchingElement(
        <ErrorBoundaryFallbackComponent />,
      ),
    ).toBe(false);
    expect(
      wrapperWithErrorBoundary.contains(
        <Wand name="Harry’s" incantation="Expelliarmus" />,
      ),
    ).toBe(true);
  });

  it('Sets its state to an error state and renders the default fallback component', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <Wand name="Voldemort’s" incantation="Avada Kedavra" />
      </ErrorBoundary>,
    );

    const WandWithErrorBoundary = withErrorBoundary(Wand);
    const wrapperWithErrorBoundary = mount(
      <WandWithErrorBoundary name="Voldemort’s" incantation="Avada Kedavra" />,
    );

    expect(wrapper.state().error).toEqual(expect.objectContaining(mockError));
    expect(wrapper.state().info).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );
    expect(
      wrapper.containsMatchingElement(<ErrorBoundaryFallbackComponent />),
    ).toBe(true);

    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.error,
    ).toEqual(expect.objectContaining(mockError));
    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.info,
    ).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );
    expect(
      wrapperWithErrorBoundary.containsMatchingElement(
        <ErrorBoundaryFallbackComponent />,
      ),
    ).toBe(true);
  });

  it('Sets its state to an error state and renders a custom fallback component', () => {
    const MockFallbackComponent = ({error, componentStack}) => (
      <div>
        <p>
          <strong>Wand unable to perform magic!</strong>
          Please contact Ollivanders in Diagon Alley for repairs.
        </p>
        <p>
          <strong>Error:</strong> {error.toString()}
        </p>
        <p>
          <strong>Stacktrace:</strong>
          <pre>{componentStack}</pre>
        </p>
      </div>
    );

    const wrapper = mount(
      <ErrorBoundary FallbackComponent={MockFallbackComponent}>
        <Wand name="Voldemort’s" incantation="Crucio" />
      </ErrorBoundary>,
    );

    const WandWithErrorBoundary = withErrorBoundary(
      Wand,
      MockFallbackComponent,
    );
    const wrapperWithErrorBoundary = mount(
      <WandWithErrorBoundary name="Voldemort’s" incantation="Crucio" />,
    );

    expect(wrapper.state().error).toEqual(expect.objectContaining(mockError));
    expect(wrapper.state().info).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );
    expect(
      wrapper.containsMatchingElement(<ErrorBoundaryFallbackComponent />),
    ).toBe(false);
    expect(
      wrapper.containsMatchingElement(
        <MockFallbackComponent
          error={mockError} /* componentStack="ignored" */
        />,
      ),
    ).toBe(true);

    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.error,
    ).toEqual(expect.objectContaining(mockError));
    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.info,
    ).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );
    expect(
      wrapperWithErrorBoundary.containsMatchingElement(
        <ErrorBoundaryFallbackComponent />,
      ),
    ).toBe(false);
    expect(
      wrapperWithErrorBoundary.containsMatchingElement(
        <MockFallbackComponent
          error={mockError} /* componentStack="ignored" */
        />,
      ),
    ).toBe(true);
  });

  it('Sets its state to an error state and invokes the onError callback prop', () => {
    const mockOnError = jest.fn().mockImplementation((
      error, // eslint-disable-line no-unused-vars
      info, // eslint-disable-line no-unused-vars
    ) => {});

    const mockOnErrorWithErrorBoundary = jest.fn().mockImplementation((
      error, // eslint-disable-line no-unused-vars
      info, // eslint-disable-line no-unused-vars
    ) => {});

    const wrapper = mount(
      <ErrorBoundary onError={mockOnError}>
        <Wand name="Voldemort’s" incantation="Imperio" />
      </ErrorBoundary>,
    );
    const WandWithErrorBoundary = withErrorBoundary(
      Wand,
      ErrorBoundaryFallbackComponent,
      mockOnErrorWithErrorBoundary,
    );
    const wrapperWithErrorBoundary = mount(
      <WandWithErrorBoundary name="Voldemort’s" incantation="Imperio" />,
    );

    expect(wrapper.state().error).toEqual(expect.objectContaining(mockError));
    expect(wrapper.state().info).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );
    expect(mockOnError).toHaveBeenCalledWith(mockError, expect.any(String));
    expect(
      wrapper.containsMatchingElement(
        <ErrorBoundaryFallbackComponent
          error={mockError} /* componentStack="ignored" */
        />,
      ),
    ).toBe(true);

    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.error,
    ).toEqual(expect.objectContaining(mockError));
    expect(
      wrapperWithErrorBoundary.find(ErrorBoundary).instance().state.info,
    ).toEqual(
      expect.objectContaining({
        componentStack: expect.any(String),
      }),
    );
    expect(mockOnErrorWithErrorBoundary).toHaveBeenCalledWith(
      mockError,
      expect.any(String),
    );
    expect(
      wrapperWithErrorBoundary.containsMatchingElement(
        <ErrorBoundaryFallbackComponent
          error={mockError} /* componentStack="ignored" */
        />,
      ),
    ).toBe(true);
  });
});
