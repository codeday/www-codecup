/**
 * @fileoverview NextJS app
 */

//Imports
import '@/styles.css';
import Footer from '@/components/Footer/Footer';
import Head from 'next/head';
import Header from '@/components/Header/Header';
import Particles, {ISourceOptions} from 'react-tsparticles';
import {ApolloProvider} from '@apollo/client';
import {AppProps} from 'next/app';
import {ChakraProvider, extendTheme, Flex, useToken} from '@chakra-ui/react';
import {FC} from 'react';
import {SessionProvider} from 'next-auth/react';
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

const App: FC<AppProps> = (props: AppProps) =>
{
  //ParticlesJS config
  const particles: ISourceOptions = {
    background: {
      color: useToken('colors', 'gray.900')
    },
    backgroundMode: {
      enable: true,
      zIndex: -100
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#009f00"
      },
      links: {
        color: "#009f00",
        enable: true,
        triangles: {
          enable: true,
          frequency: 0.3,
          opacity: 0.02,
          color: "#00ff00"
        }
      },
      move: {
        enable: true,
        speed: 0.2
      },
      twinkle: {
        lines: {
          enable: true,
          color: "#9999ff",
          frequency: 0.005,
          opacity: 0.25,
        },
        particles: {
          enable: true,
          color: "#ffffff",
          frequency: 0.01,
          opacity: 1
        }
      }
    }
  };

  return (
    <SessionProvider>
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

            <Particles options={particles} style={{
              height: '100%',
              left: 0,
              position: 'fixed',
              top: 0,
              width: '100%'
            }} />

            <Footer />
          </Flex>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
};

//Export
export default App;