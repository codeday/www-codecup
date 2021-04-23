import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Challenge from './Challenge';

describe('<Challenge />', () => {
  test('it should mount', () => {
    render(<Challenge />);
    
    const challenge = screen.getByTestId('Challenge');

    expect(challenge).toBeInTheDocument();
  });
});