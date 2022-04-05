import { FastifyInstance, RouteOptions } from "fastify";
import fp from "fastify-plugin";

export default function registerRoutes(routes: RouteOptions[]) {
  return fp(async function registerOnFastifyInstance(fastify: FastifyInstance) {
    routes.forEach((route) => fastify.route(route));
  });
}
