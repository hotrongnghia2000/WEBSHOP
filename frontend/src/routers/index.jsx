import { useRoutes } from "react-router-dom";
import { privateRouter } from "./private";
import { publicRouter } from "./public";

const Routes = () => {
  let routes = [...privateRouter, ...publicRouter];
  return useRoutes(routes);
};

export default Routes;
