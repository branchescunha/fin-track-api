import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { DeleteTransactionParams } from "../../schemas/transaction.schema";

export const getTransactionById = async (
  request: FastifyRequest<{ Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  const { id } = request.params;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autenticado" });
  }

  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      return reply.status(404).send({ error: "Transação não encontrada" });
    }

    reply.send(transaction);
  } catch (err) {
    request.log.error({ err }, "Erro ao buscar transação");
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
};
