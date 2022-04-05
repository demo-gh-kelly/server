import axios from "axios";
import { FastifyInstance, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

const baseURL = "https://api.github.com";
const accept = "application/vnd.github.v3+json";

async function githubAPIAxios(fastify: FastifyInstance) {
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

export const githubAPIPlugin = fastifyPlugin(githubAPIAxios);
