import { FastifyInstance } from "fastify";

export default async function start(server: FastifyInstance, port?: number) {
  try {
    if (!port) port = Number(process.env.PORT) || 8080;
    const address = await server.listen(port);
    console.info(`Server listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
