import "dotenv/config";
import createFastifyInstance from "fastify";
import cors from "fastify-cors";
import fastifyCookie, { FastifyCookieOptions } from "fastify-cookie";
import fastifyJWT, { FastifyJWTOptions } from "fastify-jwt";
import getAccessToken from "./routes/getAccessToken";
import start from "./start";
import { githubAPIPlugin } from "./plugins/githubAPI";
import { userRoutes, reposRoutes, installationsRoutes } from "./routes";

const fastify = createFastifyInstance({
  logger: false,
});

fastify.register(cors, {
  credentials: true,
  origin: ["https://dev.localhost.com:9000"],
});

const fastifyCookieOptions: FastifyCookieOptions = {
  secret: process.env.COOKIE_SECRET,
};
fastify.register(fastifyCookie, fastifyCookieOptions);

const fastifyJWTOptions: FastifyJWTOptions = {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: "access_token",
    signed: false,
  },
};
fastify.register(fastifyJWT, fastifyJWTOptions);

fastify.register(githubAPIPlugin);

/**
 * ROUTES
 */
fastify.register(getAccessToken);
fastify.register(userRoutes);
fastify.register(reposRoutes);
fastify.register(installationsRoutes);

start(fastify);
