import { FastifyReply, FastifyRequest } from "fastify";

export async function getRepos(request: FastifyRequest, reply: FastifyReply) {
  let err: Error | null;
  let response: any;

  [err, response] = await request.to(
    request.githubAPI.get("/user/repos", {
      headers: {
        Authorization: `token ${request.access_token}`,
      },
    })
  );

  if (err != null) {
    return reply.status(500).send({ msg: "ops" });
  }

  const payload = { repos: response!.data };

  return reply.status(200).send(payload);
}
