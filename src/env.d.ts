/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;

    GITHUB_APP_CLIENT_ID: string;
    GITHUB_APP_CLIENT_SECRET: string;
    GITHUB_OAUTH_SWAP_CODE_FOR_ACCESS_TOKEN: string;

    COOKIE_SECRET: string;
    JWT_SECRET: string;
  }
}
