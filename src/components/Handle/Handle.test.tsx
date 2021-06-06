import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Handle from './Handle';

describe('<Handle />', () => {
  test('it should mount', () => {
    render(<Handle />);
    
    const handle = screen.getByTestId('Handle');

    expect(handle).toBeInTheDocument();
  });
});