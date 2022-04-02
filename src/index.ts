import "dotenv/config";
import fastify from "fastify";
import pino from "pino";
import cors from "fastify-cors";
import start from "./start";
import { GithubCodeType } from "./schemas/GithubCode";
import axios, { AxiosResponse } from "axios";
import to from "await-to-js";
import { GithubReposForUserType } from "./schemas/GithubReposForUser";

const server = fastify({
  // logger: pino({ level: "info" }),
});
server.register(cors);
const port = Number(process.env.PORT) || 8080;

const mockDB = new Map();

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
    return reply.status(500).send({ err });
  }

  mockDB.set(response!.data.login, access_token);

  return reply.status(200).send(response!.data);
});

server.post<{ Body: GithubReposForUserType }>(
  "/github/repos",
  async (request, reply) => {
    const { login } = request.body;

    if (!login) {
      return reply.status(400).send({ err: "missing login" });
    }

    const access_token = mockDB.get(login);

    if (!access_token) {
      return reply.status(404).send({ err: "todo" });
    }

    let err: Error | null;
    let response: AxiosResponse<any> | undefined;

    [err, response] = await to(
      axios({
        method: "get",
        url: `https://api.github.com/users/${login}/repos`,
        headers: {
          Authorization: `token ${access_token}`,
          accept: "application/vnd.github.v3+json",
        },
      })
    );

    if (err) {
      return reply.status(500).send({ isError: true, err });
    }

    return reply.status(200).send(response!.data);
  }
);

start(server, port);
