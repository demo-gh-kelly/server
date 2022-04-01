"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const start_1 = __importDefault(require("./start"));
const axios_1 = __importDefault(require("axios"));
const server = (0, fastify_1.default)({
// logger: pino({ level: "info" }),
});
server.register(fastify_cors_1.default);
const port = Number(process.env.PORT) || 8080;
server.get("/ping", () => __awaiter(void 0, void 0, void 0, function* () {
    return "pong\n";
}));
// https://www.fastify.io/docs/latest/Reference/TypeScript/#typebox
server.post("/github", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = request.body;
    const url = new URL(process.env.GITHUB_OAUTH_POST);
    url.searchParams.set("client_id", process.env.DEMO_KELLY_CLIENT_ID);
    url.searchParams.set("client_secret", process.env.DEMO_KELLY_CLIENT_SECRET);
    url.searchParams.set("code", code);
    try {
        const response = yield (0, axios_1.default)({
            method: "post",
            url: url.toString(),
            headers: {
                accept: "application/json",
            },
        });
        if (response.status === 200) {
            const { access_token: accessToken, token_type: tokenType } = response.data;
            console.log(`token ${accessToken}`);
            try {
                const res2 = yield (0, axios_1.default)({
                    method: "get",
                    url: "https://api.github.com/user",
                    headers: {
                        Authorization: `token ${accessToken}`,
                    },
                });
                console.log(res2);
                reply.status(200).send(res2.data);
            }
            catch (err2) {
                console.error(err2);
                reply.status(500).send({});
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}));
(0, start_1.default)(server, port);
