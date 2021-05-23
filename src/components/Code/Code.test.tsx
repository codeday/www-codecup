import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Code from './Code';

describe('<Code />', () => {
  test('it should mount', () => {
    render(<Code />);
    
    const code = screen.getByTestId('Code');

    expect(code).toBeInTheDocument();
  });
});