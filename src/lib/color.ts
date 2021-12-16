/**
 * @fileoverview Color utilities
 */

//Imports
import {useTheme} from '@chakra-ui/react';
import Prando from 'prando';

//List of valid Chakra color hues
const hues = [
  'blue',
  'cyan',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
];

//List of valid Chakra color shades
const shades = [
  200,
  300,
  400,
  500,
  600
];

/**
 * Deterministically hash an input and return a valid color
 * @param input Any input
 * @returns Hex-formatted color (eg: `#abcdef`)
 */
export const hash = (input: string) =>
{
  //Get the theme
  const theme = useTheme();

  //Create the random number generator
  const rng = new Prando(input);

  //Select a color  
  const hue = rng.nextArrayItem(hues);
  const shade = rng.nextArrayItem(shades);
  const color = theme.colors[hue][shade];

  return color;
};