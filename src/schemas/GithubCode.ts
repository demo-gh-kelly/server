import { Static, Type } from "@sinclair/typebox";

const GithubCode = Type.Object({
  code: Type.String(),
});

export type GithubCodeType = Static<typeof GithubCode>;
