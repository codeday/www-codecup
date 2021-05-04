import {RouteProps} from "react-router";
import Challenges from "./pages/Challenges/Challenges";
import NotFound from "./pages/NotFound/NotFound";
import Scoreboard from "./pages/Scoreboard/Scoreboard";

//SPA router routes
const Routes: RouteProps[] = [
  //Challenges page
  {
    path: '/',
    exact: true,
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
