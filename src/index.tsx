import './index.css';
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import App from './App';
import ReactDOM from 'react-dom';

//Chakra theme
const font = 'Source Code Pro';
const theme = extendTheme({
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
