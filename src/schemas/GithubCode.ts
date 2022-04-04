import { Static, Type } from "@sinclair/typebox";

const GithubCode = Type.Object({
  code: Type.String(),
});

// https://www.fastify.io/docs/latest/Reference/TypeScript/#typebox
export type GithubCodeType = Static<typeof GithubCode>;
