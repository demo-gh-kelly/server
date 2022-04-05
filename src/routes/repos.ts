import { RouteOptions } from "fastify";
import { getRepos } from "../controllers/repos";
import authMiddleware from "../middlewares/auth";
import registerRoutes from "./_registerRoute";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/repos",
    handler: getRepos,
    preHandler: [authMiddleware],
  },
];

export default registerRoutes(routes);
