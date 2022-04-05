import { AxiosInstance } from "axios";
import fastify from "fastify";

interface To {
  (promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]>;
}

declare module "fastify" {
  export interface FastifyRequest {
    access_token: string | undefined;
    githubAPI: AxiosInstance;
    to: To;
  }
}
