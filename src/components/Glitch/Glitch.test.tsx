import 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Glitch from './Glitch';

describe('<Glitch />', () =>
{
  test('it should mount', () =>
  {
    render(
      <Glitch>Glitch</Glitch>
    );

    const glitch = screen.getByTestId('Glitch');

    expect(glitch).toBeInTheDocument();
  });
});