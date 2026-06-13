import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("✅ DB Conectado com sucesso");
  } catch (err) {
    console.error("❌ Erro ao conectar ao DB:");
  }
};

export default prisma;
