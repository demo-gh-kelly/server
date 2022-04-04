import "dotenv/config";
import fastify from "fastify";
import cors from "fastify-cors";
import start from "./start";
import fastifyCookie, { FastifyCookieOptions } from "fastify-cookie";
import fastifyJWT, { FastifyJWTOptions } from "fastify-jwt";
import getAccessToken from "./routes/getAccessToken";
import getInstallations from "./routes/getInstallations";
import getUser from "./routes/getUser";

const server = fastify({
  logger: false,
});

server.register(cors, {
  credentials: true,
  origin: ["https://127.0.0.1:9000"],
});

const fastifyCookieOptions: FastifyCookieOptions = {
  secret: process.env.COOKIE_SECRET,
};
server.register(fastifyCookie, fastifyCookieOptions);

const fastifyJWTOptions: FastifyJWTOptions = {
  secret: process.env.JWT_SECRET,
  cookie: {
    cookieName: "access_token",
    signed: false,
  },
};
server.register(fastifyJWT, fastifyJWTOptions);

server.get("/ping", async () => {
  return "pong\n";
});

server.register(getAccessToken);
server.register(getUser);
server.register(getInstallations);

// https://api.github.com/users/${login}/repos

start(server);
