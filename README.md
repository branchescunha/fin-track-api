# FinTrack API

API REST para gerenciamento financeiro, desenvolvida com Node.js, Fastify, TypeScript, Prisma, MongoDB e autenticação via Firebase.

O projeto foi criado com foco em organização, validação de dados, autenticação de usuários e controle de transações financeiras por período, categoria e tipo.

## Funcionalidades

* Autenticação de rotas com Firebase Authentication
* Integração com MongoDB utilizando Prisma ORM
* Inicialização automática de categorias globais
* Criação de transações financeiras
* Listagem de transações por usuário autenticado
* Filtros por mês, ano, categoria e tipo
* Exclusão de transações
* Resumo financeiro mensal
* Histórico mensal de receitas e despesas
* Validação de dados com Zod
* Organização de rotas, controllers, middlewares, schemas e services
* Padronização de código com Biome

## Tecnologias utilizadas

* Node.js
* TypeScript
* Fastify
* Prisma ORM
* MongoDB
* Firebase Admin SDK
* Zod
* Day.js
* Biome

## Rotas principais

```txt
GET     /api/health
GET     /api/categories
GET     /api/transactions
POST    /api/transactions
DELETE  /api/transactions/:id
GET     /api/transactions/summary
GET     /api/transactions/historical
```

## Estrutura do projeto

```txt
fin-track-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   ├── firebase.ts
│   │   └── prisma.ts
│   ├── controllers/
│   │   ├── transactions/
│   │   │   ├── createTransaction.controller.ts
│   │   │   ├── deleteTransaction.controller.ts
│   │   │   ├── getHistoricalTransactions.controller.ts
│   │   │   ├── getTransactions.controller.ts
│   │   │   └── getTransactionsSummary.controller.ts
│   │   └── category.controller.ts
│   ├── middlewares/
│   │   └── auth.middleware.ts
│   ├── routes/
│   │   ├── category.routes.ts
│   │   ├── index.ts
│   │   └── transaction.routes.ts
│   ├── schemas/
│   │   └── transaction.schema.ts
│   ├── services/
│   │   └── globalCategories.service.ts
│   ├── types/
│   │   ├── category.types.ts
│   │   └── transaction.types.ts
│   ├── app.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── biome.json
├── package.json
└── tsconfig.json
```

## Autor

André Vinícius Branches Cunha
