import './index.css';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import App from './App';
import ReactDOM from 'react-dom';

//Chakra theme
const font = 'Source Code Pro';
const theme = extendTheme({
  colors: {
    primary: {
      100: '#e0f4fc',
      200: '#a8e1f5',
      300: '#70cdef',
      400: '#38bae8',
      500: '#00a6e2',
      600: '#0081b0',
      700: '#005d7f',
      800: '#00384d',
      900: '#00141b'
    },
    secondary: {
      100: '#e0ffe0',
      200: '#a8ffa8',
      300: '#70ff70',
      400: '#38ff38',
      500: '#00ff00',
      600: '#00c700',
      700: '#008f00',
      800: '#005700',
      900: '#001f00'
    }
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  fonts: {
    body: font,
    heading: font,
    mono: font
  }
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);
