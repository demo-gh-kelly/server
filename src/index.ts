import "dotenv/config";
import fastify from "fastify";
import cors from "fastify-cors";
import start from "./start";
import fastifyCookie, { FastifyCookieOptions } from "fastify-cookie";
import getAccessToken from "./routes/getAccessToken";

const server = fastify({
  logger: false,
});

server.register(cors);

const fastifyCookieOptions: FastifyCookieOptions = {
  secret: process.env.COOKIE_SECRET,
};
server.register(fastifyCookie, fastifyCookieOptions);

server.get("/ping", async () => {
  return "pong\n";
});

server.register(getAccessToken);

// server.post<{ Body: GithubReposForUserType }>(
//   "/github/repos",
//   async (request, reply) => {
//     const { login } = request.body;

//     if (!login) {
//       return reply.status(400).send({ err: "missing login" });
//     }

//     const access_token = mockDB.get(login);

//     if (!access_token) {
//       return reply.status(404).send({ err: "todo" });
//     }

//     let err: Error | null;
//     let response: AxiosResponse<any> | undefined;

//     [err, response] = await to(
//       axios({
//         method: "get",
//         url: `https://api.github.com/users/${login}/repos`,
//         headers: {
//           Authorization: `token ${access_token}`,
//           accept: "application/vnd.github.v3+json",
//         },
//       })
//     );

//     if (err) {
//       return reply.status(500).send({ isError: true, err });
//     }

//     return reply.status(200).send(response!.data);
//   }
// );

start(server);
