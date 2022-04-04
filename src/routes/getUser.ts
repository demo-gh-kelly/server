import to from "await-to-js";
import { AxiosResponse } from "axios";
import { FastifyInstance } from "fastify";
import { axiosApiGithub } from "../helpers";

export default function getUser(server: FastifyInstance, opts: any, done: any) {
  server.get("/user", async (request, reply) => {
    const { access_token } = request.cookies;

    if (!access_token) {
      return reply.status(401).send({ err: "Not Authenticated" });
    }

    let err: Error | null;
    let response: AxiosResponse<any> | undefined;

    [err, response] = await to(
      axiosApiGithub.get("/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    );

    const payload = { user: response!.data };

    return reply.status(200).send(payload);
  });
  done();
}
