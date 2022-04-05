import { FastifyReply, FastifyRequest } from "fastify";

export async function getRepos(request: FastifyRequest, reply: FastifyReply) {
  return [{ test: true }];
}
