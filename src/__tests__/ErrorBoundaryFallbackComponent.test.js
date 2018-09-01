import React from 'react';
import {shallow} from 'enzyme';

import ErrorBoundaryFallbackComponent from '../ErrorBoundaryFallbackComponent';

describe('ErrorBoundaryFallbackComponent', () => {
  let mockError;

  beforeAll(() => {
    mockError = new Error(
      'You cast an unforgivable curse! You’ve earned a one-way ticket to Azkaban.',
    );
  });

  it('Passes a snapshot test', () => {
    const wrapper = shallow(
      <ErrorBoundaryFallbackComponent error={mockError} componentStack="" />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
