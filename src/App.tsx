import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {FC} from 'react';
import {Flex, useToken} from '@chakra-ui/react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Particles, {IParticlesParams} from 'react-particles-js';
import Routes from './routes';
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
    <Flex align="center" flexDirection="column" height="100%" position="relative">
      <Router>
        <Header yourName="John Doe" teamName="Polaris" />
        <Flex as="main" flex="1">
          <Switch>
            {Routes.map((props, index) => <Route key={index} {...props} />)}
          </Switch>
        </Flex>
        <Particles className={styles.Particles} params={particles} />
        <Footer />
      </Router>
    </Flex>
  );
};

export default App;
