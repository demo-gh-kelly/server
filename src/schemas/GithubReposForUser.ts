import { Static, Type } from "@sinclair/typebox";

const GithubReposForUser = Type.Object({
  login: Type.String(),
});

export type GithubReposForUserType = Static<typeof GithubReposForUser>;
