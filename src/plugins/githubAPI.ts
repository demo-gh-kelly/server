import axios from "axios";
import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

const baseURL = "https://api.github.com";
const accept = "application/vnd.github.v3+json";

async function githubAPIAxiosDecorator(fastify: FastifyInstance) {
  fastify.decorate("githubAPI", null);
  fastify.addHook("onRequest", async (request: FastifyRequest) => {
    request.githubAPI = axios.create({
      baseURL,
      headers: {
        accept,
      },
    });
  });
}

export const githubAPIPlugin = fp(githubAPIAxiosDecorator);
