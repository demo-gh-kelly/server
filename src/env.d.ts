/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;

    DEMO_KELLY_CLIENT_ID: string;
    DEMO_KELLY_CLIENT_SECRET: string;

    GITHUB_OAUTH_POST: string;
    REDIRECT_URI: string;
  }
}
