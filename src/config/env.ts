import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const parseFrontendOrigins = (frontendUrl?: string): string[] =>
  frontendUrl
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const isValidHttpUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const envSchema = z
  .object({
    PORT: z.string().default("3001").transform(Number),
    DATABASE_URL: z.string().min(5, "DATABASE_URL é obrigatório"),
    FRONTEND_URL: z.string().optional(),
    NODE_ENV: z.enum(["dev", "test", "prod", "production"], {
      message: "O NODE ENV deve ser 'dev', 'test', 'prod' ou 'production'",
    }),

    // FIREBASE
    FIREBASE_PROJECT_ID: z.string().optional(),
    FIREBASE_PRIVATE_KEY: z.string().optional(),
    FIREBASE_CLIENT_EMAIL: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const frontendOrigins = parseFrontendOrigins(data.FRONTEND_URL);

    if ((data.NODE_ENV === "prod" || data.NODE_ENV === "production") && frontendOrigins.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["FRONTEND_URL"],
        message: "FRONTEND_URL é obrigatório em produção",
      });
    }

    for (const origin of frontendOrigins) {
      if (!isValidHttpUrl(origin)) {
        ctx.addIssue({
          code: "custom",
          path: ["FRONTEND_URL"],
          message: "FRONTEND_URL deve conter URLs http ou https válidas, separadas por vírgula",
        });
      }
    }
  });

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Variáveis de ambiente inválida:");
  console.error(_env.error.issues.map((issue) => issue.message).join("; "));
  process.exit(1);
}

export const env = _env.data;
