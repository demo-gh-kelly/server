import { RouteOptions } from "fastify";
import { getUser } from "../controllers/user";
import authMiddleware from "../middlewares/auth";
import registerRoutes from "./_registerRoute";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/user",
    handler: getUser,
    preHandler: [authMiddleware],
  },
];

export default registerRoutes(routes);
