import "dotenv/config";
import createFastifyInstance from "fastify";
import cors from "fastify-cors";
import fastifyCookie, { FastifyCookieOptions } from "fastify-cookie";
import fastifyJWT, { FastifyJWTOptions } from "fastify-jwt";
import getAccessToken from "./routes/getAccessToken";
import getInstallations from "./routes/getInstallations";
import getUser from "./routes/getUser";
import start from "./start";

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

fastify.register(getAccessToken);
fastify.register(getUser);
fastify.register(getInstallations);

start(fastify);

// https://api.github.com/users/${login}/repos
