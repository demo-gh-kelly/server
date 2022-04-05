import { FastifyInstance, FastifyRequest } from "fastify";
import awaitToJs from "await-to-js";
import fp from "fastify-plugin";

async function awaitToJsDecorator(fastify: FastifyInstance) {
  fastify.decorate("await-to-js", null);
  fastify.addHook("onRequest", async (request: FastifyRequest) => {
    request.to = awaitToJs;
  });
}

export const awaitToJsPlugin = fp(awaitToJsDecorator);
