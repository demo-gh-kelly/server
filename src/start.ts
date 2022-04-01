import { FastifyInstance } from "fastify";

export default async function start(server: FastifyInstance, port: number) {
  try {
    const address = await server.listen(port);
    console.info(`Server listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
