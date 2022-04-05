import to from "await-to-js";
import { AxiosResponse } from "axios";
import { FastifyInstance } from "fastify";
import { VerifyPayloadType } from "fastify-jwt";
import { axiosApiGithub } from "../helpers";

interface AccessTokenJWT {
  access_token: string;
  expires_in: number;
  iat: number;
}

export default function getUser(server: FastifyInstance, opts: any, done: any) {
  server.get("/user", async (request, reply) => {
    let err: Error | null;
    let verifyPayloadType: AccessTokenJWT | undefined;
    let response: AxiosResponse<any> | undefined;

    [err, verifyPayloadType] = await to<AccessTokenJWT>(request.jwtVerify());
    if (err) {
      return reply.status(401).send({ err: "Not Authenticated" });
    }

    const { access_token } = verifyPayloadType!;

    [err, response] = await to(
      axiosApiGithub.get("/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    );

    const payload = { user: response!.data };

    return reply.status(200).send(payload);
  });
  done();
}
