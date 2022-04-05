import to from "await-to-js";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  let err: Error | null;
  let response: any;

  [err, response] = await to(
    request.githubAPI.get("/user", {
      headers: {
        Authorization: `token ${request.access_token}`,
      },
    })
  );

  if (err != null) {
    return reply.status(500).send({ msg: "ops" });
  }

  const payload = { user: response!.data };

  return reply.status(200).send(payload);
}
