import to from "await-to-js";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

interface AccessTokenJWT {
  access_token: string;
  expires_in: number;
  iat: number;
}

export default async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
  next: HookHandlerDoneFunction
) {
  let err: Error | null;
  let verifyPayloadType: AccessTokenJWT | undefined;

  [err, verifyPayloadType] = await to<AccessTokenJWT>(request.jwtVerify());
  if (err != null) {
    return reply.status(401).send({ err: "Not Authenticated" });
  }

  if (verifyPayloadType) {
    request.access_token = verifyPayloadType.access_token;
    next();
    return;
  }

  return reply.status(500).send({ err: "Internal Server Error" });
}
