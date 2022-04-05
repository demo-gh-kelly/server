import { FastifyReply, FastifyRequest } from "fastify";

export async function getInstallations(
  request: FastifyRequest,
  reply: FastifyReply
) {
  let err: Error | null;
  let response: any;

  [err, response] = await request.to(
    request.githubAPI.get("/user/installations", {
      headers: {
        Authorization: `token ${request.access_token}`,
      },
    })
  );

  if (err != null) {
    return reply.status(500).send({ err: "Ops" });
  }

  const payload = { installations: response!.data };

  return reply.status(200).send(payload);
}