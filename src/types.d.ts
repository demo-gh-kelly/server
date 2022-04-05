import fastify from "fastify";
declare module "fastify" {
  export interface FastifyRequest {
    access_token: string | undefined;
  }
}
