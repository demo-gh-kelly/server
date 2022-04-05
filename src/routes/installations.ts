import { RouteOptions } from "fastify";
import { getInstallations } from "../controllers/installations";
import authMiddleware from "../middlewares/auth";
import registerRoutes from "./_registerRoute";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/installations",
    handler: getInstallations,
    preHandler: [authMiddleware],
  },
];

export default registerRoutes(routes);
