import {Box, Flex, Link, Stack} from '@chakra-ui/layout';
import {FC} from 'react';
import {useToken} from '@chakra-ui/system';
import Glitch from './components/Glitch/Glitch';
import logo from './logo.svg';
import Particles, {IParticlesParams} from 'react-particles-js';
import styles from './App.module.css';

const App: FC = () =>
{
  //Get certain values from the current Chakra theme
  const [
    background
  ] = useToken("colors", [
    "gray.900"
  ]);

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
      color: background
    }
  };

  return (
    <Flex align="center" flexDirection="column">
      <Flex align="center" as="header" justify="space-between" padding="5" width="100%" wrap="wrap">
        <Stack align="center" direction="row">
          <Box marginRight="20px">
            <img alt="Code Cup Logo" src={logo} width="48" />
          </Box>

          <Glitch className={styles.Title} fontSize="5xl">CodeCup</Glitch>
        </Stack>

        <Box>
          <img alt="Avatar" src="https://avatars.dicebear.com/api/bottts/codeday.svg" width="48" />
        </Box>
      </Flex>

      <Flex as="main">
        <div style={{margin: '0 auto', width: 'fit-content'}}>
          <p>Features:</p>
          <ol style={{textAlign: 'left'}}>
            <li>Variable-based theming</li>
            <li><a href="https://feathericons.com/">Feather Icons</a></li>
            <li>Bare bones (Only 2 extra dependencies)</li>
          </ol>
        </div>
        <div style={{margin: '0 auto', width: 'fit-content'}}>
          <p>Todo:</p>
          <ol style={{textAlign: 'left'}}>
            <li>Add <a href="https://reactrouter.com">React Router</a></li>
            <li>Add pages</li>
            <li>Add <a href="https://www.apollographql.com/docs/react/">Apollo</a></li>
            <li>Add tests</li>
          </ol>
        </div>
      </Flex>

      <Particles className={styles.Particles} params={particles} />

      <Flex as="footer" bottom="0" justify="center" padding="20px" position="absolute" width="100%">
        <p>A project of <Link color="Highlight" href="https://codeday.org">CodeDay</Link>. Licensed under the <Link color="Highlight" href="https://opensource.org/licenses/MIT">MIT Open Source License</Link>.</p>
      </Flex>
    </Flex>
  );
};

export default App;
