import to from "await-to-js";
import axios, { AxiosResponse } from "axios";
import { FastifyInstance } from "fastify";
import { axiosApiGithub, buildUrl } from "../helpers";
import { GithubCodeType } from "../schemas/GithubCode";

interface Response {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
}

export default function getAccessToken(
  server: FastifyInstance,
  opts: any, // find type
  done: any // find type
) {
  server.post<{ Body: GithubCodeType }>("/github", async (request, reply) => {
    const { code } = request.body;

    if (!code) {
      return reply.status(400).send({ err: "Missing code" });
    }

    const {
      GITHUB_OAUTH_SWAP_CODE_FOR_ACCESS_TOKEN,
      GITHUB_APP_CLIENT_ID: client_id,
      GITHUB_APP_CLIENT_SECRET: client_secret,
    } = process.env;

    const url = buildUrl(GITHUB_OAUTH_SWAP_CODE_FOR_ACCESS_TOKEN, {
      query: {
        client_id,
        client_secret,
        code,
      },
    });

    let err: Error | null;
    let response: AxiosResponse<any> | undefined;

    [err, response] = await to<AxiosResponse<Response>>(
      axios({
        method: "post",
        url: url.toString(),
        headers: {
          accept: "application/json",
        },
      })
    );

    if (err) {
      return reply.status(500).send({ err });
    }

    const { access_token } = response!.data;

    [err, response] = await to(
      axiosApiGithub.get("/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    );

    if (err) {
      return reply.status(500).send({ err });
    }

    const encryptedAccessToken = server.jwt.sign({ access_token });
    const payload = { user: response!.data };

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie#attributes
    return reply
      .status(200)
      .setCookie("access_token", encryptedAccessToken, {
        domain: "*",
        path: "/",
        secure: true,
        httpOnly: true,
      })
      .send(payload);
  });
  done();
}
