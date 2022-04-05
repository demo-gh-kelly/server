import { FastifyReply, FastifyRequest } from "fastify";
import { UserInstallationsResponseData } from "../schemas/user.installations";

export async function getInstallations(
  request: FastifyRequest,
  reply: FastifyReply
) {
  let err: Error | null;
  let response: any;

  [err, response] = await request.to(
    request.githubAPI.get("/user/installations", {
      headers: {
        Authorization: `token ${request.access_token}`,
      },
    })
  );

  if (err != null) {
    return reply.status(500).send({ err: "Ops" });
  }

  const data: UserInstallationsResponseData = response.data;

  if (data.total_count === 0) {
    return reply.status(404).send({ err: "Empty" });
  }

  // const promises = data.installations.map((installation) => {
  //   return request.githubAPI.get(
  //     `/user/installations/${installation.id}/repositories`,
  //     {
  //       headers: {
  //         Authorization: `token ${request.access_token}`,
  //       },
  //     }
  //   );
  // });

  // const results = await Promise.allSettled(promises);

  const payload = {
    total_count: data.total_count,
    installations: data.installations,
    // repositories_accessible_to_user_access_token: results.map(
    //   (repo) => repo.value.data
    // ),
  };

  return reply.status(200).send(payload);
}
