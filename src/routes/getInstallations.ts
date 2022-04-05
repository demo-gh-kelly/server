import to from "await-to-js";
import { FastifyInstance, HookHandlerDoneFunction } from "fastify";
import authMiddleware from "../middlewares/auth";

export default function getInstallations(
  server: FastifyInstance,
  opts: any,
  done: HookHandlerDoneFunction
) {
  server.get(
    "/installations",
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      let err: Error | null;
      let response: any;

      [err, response] = await to(
        request.githubAPI.get("/user/installations", {
          headers: {
            Authorization: `token ${request.access_token}`,
          },
        })
      );

      if (err != null) {
        return reply.status(500).send({ err: "Ops" });
      }

      const payload = { user: response!.data };

      return reply.status(200).send(payload);
    }
  );
  done();
}
