import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema";
import type { TransactionFilter } from "../../types/transaction.types";

dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = request.userId;

  if (!userId) {
    return reply.status(401).send({ error: "Usuário não autenticado" });
  }

  const { month, year, type, categoryId } = request.query;

  const filters: TransactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
    });

    const categoryIds = Array.from(new Set(transactions.map((transaction) => transaction.categoryId)));
    const categories = await prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
        color: true,
        name: true,
        type: true,
      },
    });
    const categoriesById = new Map(categories.map((category) => [category.id, category]));

    reply.send(
      transactions.map((transaction) => ({
        ...transaction,
        category: categoriesById.get(transaction.categoryId) ?? {
          id: transaction.categoryId,
          color: "#8884d8",
          name: "Sem categoria",
          type: transaction.type,
        },
      })),
    );
  } catch (err) {
    request.log.error({ err }, "Erro ao buscar transações");
    reply.status(500).send({ error: "Erro do servidor" });
  }
};
