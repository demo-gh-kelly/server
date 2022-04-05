import to from "await-to-js";
import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import { axiosApiGithub } from "../helpers";
import authMiddleware from "../middlewares/auth";

export default function getUser(
  fastify: FastifyInstance,
  opts: any,
  done: HookHandlerDoneFunction
) {
  fastify.get(
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
