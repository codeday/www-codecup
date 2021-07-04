/**
 * @fileoverview NextJS app
 */

//Imports
import '@/styles.css';
import Footer from '@/components/Footer/Footer';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import Particles, {IParticlesParams} from 'react-particles-js';
import {ApolloProvider} from '@apollo/client';
import {AppProps} from 'next/app';
import {ChakraProvider, extendTheme, Flex, useToken} from '@chakra-ui/react';
import {FC} from 'react';
import {Provider, SessionProviderOptions} from 'next-auth/client';
import {graphCtfClient} from '@/lib/graphql/apollo';

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

//Session options
const sessionOptions = {
  clientMaxAge: 5 * 60, //5 minutes
  keepAlive: 60 //Minute
} as SessionProviderOptions;

const App: FC<AppProps> = (props: AppProps) =>
{
  //ParticlesJS config
  const particles: IParticlesParams = {
    particles: {
      twinkle: {
        lines: {
          enable: true,
          color: "#9999ff",
          frequency: .005,
          opacity: 0.25,
        },
        particles: {
          enable: true,
          color: "#ffffff",
          frequency: .01,
          opacity: 1
        }
      },
      move: {
        speed: 0.20
      },
      color: {
        value: "#009f00"
      },
      links: {
        color: "#009f00",
        triangles: {
          enable: true,
          frequency: .3,
          opacity: .02,
          color: "#00ff00"
        }
      }
    },
    background: {
      color: useToken('colors', 'gray.900')
    }
  };

  return (
    <Provider options={sessionOptions}>
      <ApolloProvider client={graphCtfClient} >
        <ChakraProvider theme={theme}>
          <Flex align="center" flexDirection="column" height="100%" position="relative">
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />

              < link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;700&display=swap" rel="stylesheet" />

              <title>CodeCup</title>
            </Head >

            <Header />

            <Flex as="main" flex="1">
              <props.Component {...props.pageProps} />
            </Flex>

            <Particles params={particles} style={{
              height: '100%',
              left: 0,
              position: 'fixed',
              top: 0,
              width: '100%',
              zIndex: -4
            }} />
            <Footer />

          </Flex>
        </ChakraProvider>
      </ApolloProvider>
    </Provider>
  );
};

//Export
export default App;