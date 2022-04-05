import to from "await-to-js";
import { AxiosResponse } from "axios";
import { FastifyInstance } from "fastify";
import { axiosApiGithub } from "../helpers";
import authMiddleware from "../middlewares/auth";

export default function getUser(server: FastifyInstance, opts: any, done: any) {
  server.get(
    "/user",
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      let err: Error | null;
      let response: any;

      [err, response] = await to(
        axiosApiGithub.get("/user", {
          headers: {
            Authorization: `token ${request.access_token}`,
          },
        })
      );

      const payload = { user: response!.data };

      return reply.status(200).send(payload);
    }
  );
  done();
}
