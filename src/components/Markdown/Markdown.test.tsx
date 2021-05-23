import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Markdown from './Markdown';

describe('<Markdown />', () => {
  test('it should mount', () => {
    render(<Markdown />);
    
    const markdown = screen.getByTestId('Markdown');

    expect(markdown).toBeInTheDocument();
  });
});