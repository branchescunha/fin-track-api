import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import Fastify from "fastify";
import { env } from "./config/env";
import routes from "./routes";

const app: FastifyInstance = Fastify({
  logger: { level: env.NODE_ENV === "dev" ? "info" : "error" },
});

const configuredOrigins =
  env.FRONTEND_URL?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const developmentOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

const allowedOrigins = new Set(
  env.NODE_ENV === "prod" ? configuredOrigins : [...developmentOrigins, ...configuredOrigins],
);

app.register(cors, {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origem não permitida pelo CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
});

app.register(routes, { prefix: "/api" });

export default app;
