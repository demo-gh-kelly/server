import to from "await-to-js";
import { AxiosResponse } from "axios";
import { FastifyInstance } from "fastify";
import { axiosApiGithub } from "../helpers";

export default function getUser(server: FastifyInstance, opts: any, done: any) {
  server.get("/user", async (request, reply) => {
    let err: Error | null;
    let access_token: any;
    let response: AxiosResponse<any> | undefined;

    [err, access_token] = await to(request.jwtVerify());
    if (err) {
      return reply.status(401).send({ err: "Not Authenticated" });
    }

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
