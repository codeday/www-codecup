import {RouteProps} from "react-router";
import About from "./pages/About/About";
import Challenges from "./pages/Challenges/Challenges";
import NotFound from "./pages/NotFound/NotFound";
import Scoreboard from "./pages/Scoreboard/Scoreboard";

//SPA router routes
const Routes: RouteProps[] = [
  //About page
  {
    path: '/',
    exact: true,
    component: About
  },

  //Challenges page
  {
    path: '/challenges',
    component: Challenges
  },

  //Scoreboard page
  {
    path: '/scoreboard',
    component: Scoreboard
  },

  //404 page
  {
    path: '*',
    component: NotFound
  }
];

export default Routes;
