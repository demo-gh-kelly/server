import { FastifyInstance } from "fastify";

export default function getInstallations(
  server: FastifyInstance,
  opts: any,
  done: any
) {
  server.get("/installations", async (request, reply) => {
    const { access_token } = request.cookies;

    if (!access_token) {
      return reply.status(401).send({ err: "Not Authenticated" });
    }

    return reply.status(200).send({ msg: "Ok" });
  });
  done();
}
