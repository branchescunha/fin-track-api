import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import {
  type DeleteTransactionParams,
  type UpdateTransactionBody,
  updateTransactionSchema,
} from "../../schemas/transaction.schema";

export const updateTransaction = async (
  request: FastifyRequest<{ Body: UpdateTransactionBody; Params: DeleteTransactionParams }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;
  const { id } = request.params;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autenticado" });
  }

  const result = updateTransactionSchema.safeParse(request.body);

  if (!result.success) {
    const errorMessage = result.error.errors[0].message || "Dados inválidos";

    return reply.status(400).send({ error: errorMessage });
  }

  try {
    const currentTransaction = await prisma.transaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!currentTransaction) {
      return reply.status(404).send({ error: "Transação não encontrada" });
    }

    const transaction = result.data;
    const nextType = transaction.type ?? currentTransaction.type;
    const nextCategoryId = transaction.categoryId ?? currentTransaction.categoryId;

    if (transaction.type || transaction.categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: nextCategoryId,
          type: nextType,
        },
      });

      if (!category) {
        return reply.status(400).send({ error: "Categoria inválida para o tipo de transação" });
      }
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        ...transaction,
        date: transaction.date ? new Date(transaction.date) : undefined,
      },
      include: {
        category: true,
      },
    });

    reply.send(updatedTransaction);
  } catch (err) {
    request.log.error({ err }, "Erro ao atualizar transação");
    reply.status(500).send({ error: "Erro interno do servidor" });
  }
};
