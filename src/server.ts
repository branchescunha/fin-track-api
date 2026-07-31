import app from "./app";
import { env } from "./config/env";
import initializeFirebaseAdmin from "./config/firebase";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

const port = env.PORT;
const host = "0.0.0.0";

initializeFirebaseAdmin();

const startServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port, host }).then(() => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
