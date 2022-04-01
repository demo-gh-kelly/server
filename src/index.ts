import "dotenv/config";
import fastify, { FastifyBodyParser } from "fastify";
import pino from "pino";
import cors from "fastify-cors";
import start from "./start";
import { GithubCodeType } from "./schemas/GithubCode";
import axios, { AxiosResponse } from "axios";
import to from "await-to-js";

const server = fastify({
  // logger: pino({ level: "info" }),
});
server.register(cors);
const port = Number(process.env.PORT) || 8080;

server.get("/ping", async () => {
  return "pong\n";
});

interface SwapCodeForAccessToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
}

// https://www.fastify.io/docs/latest/Reference/TypeScript/#typebox
server.post<{ Body: GithubCodeType }>("/github", async (request, reply) => {
  const { code } = request.body;

  const url = new URL(process.env.GITHUB_OAUTH_SWAP_CODE_FOR_ACCESS_TOKEN);
  url.searchParams.set("client_id", process.env.GITHUB_APP_CLIENT_ID);
  url.searchParams.set("client_secret", process.env.GITHUB_APP_CLIENT_SECRET);
  url.searchParams.set("code", code);

  let err: Error | null;
  let response: AxiosResponse<any> | undefined;

  [err, response] = await to<AxiosResponse<SwapCodeForAccessToken>>(
    axios({
      method: "post",
      url: url.toString(),
      headers: {
        accept: "application/json",
      },
    })
  );

  if (err) {
    return reply.status(500).send({ isError: true, err });
  }

  const { access_token } = response!.data;

  [err, response] = await to(
    axios({
      method: "get",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `token ${access_token}`,
      },
    })
  );

  if (err) {
    return reply.status(500).send({ isError: true, err });
  }

  return reply.status(200).send(response!.data);
});

start(server, port);
