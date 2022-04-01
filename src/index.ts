import "dotenv/config";
import fastify, { FastifyBodyParser } from "fastify";
import pino from "pino";
import cors from "fastify-cors";
import start from "./start";
import { GithubCodeType } from "./schemas/GithubCode";
import axios from "axios";

const server = fastify({
  // logger: pino({ level: "info" }),
});
server.register(cors);
const port = Number(process.env.PORT) || 8080;

server.get("/ping", async () => {
  return "pong\n";
});

// https://www.fastify.io/docs/latest/Reference/TypeScript/#typebox
server.post<{ Body: GithubCodeType }>("/github", async (request, reply) => {
  const { code } = request.body;

  const url = new URL(process.env.GITHUB_OAUTH_POST);
  url.searchParams.set("client_id", process.env.DEMO_KELLY_CLIENT_ID);
  url.searchParams.set("client_secret", process.env.DEMO_KELLY_CLIENT_SECRET);
  url.searchParams.set("code", code);

  try {
    const response = await axios({
      method: "post",
      url: url.toString(),
      headers: {
        accept: "application/json",
      },
    });

    if (response.status === 200) {
      const { access_token: accessToken, token_type: tokenType } =
        response.data;

      try {
        const res2 = await axios({
          method: "get",
          url: "https://api.github.com/user",
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });

        reply.status(200).send(res2.data);
      } catch (err2) {
        console.error(err2);

        reply.status(500).send({});
      }
    }
  } catch (err) {
    console.error(err);
  }
});

start(server, port);
