# FinTrack API

API REST do FinTrack, responsável pela autenticação, persistência e processamento dos dados financeiros usados pela interface web.

O projeto está publicado em produção no Render e integrado ao frontend oficial do FinTrack.

## Produção

- API oficial: https://fin-track-api-60lr.onrender.com
- Frontend oficial: https://fintrackwallet.vercel.app
- Status: publicado em produção

## Funcionalidades

- Autenticação de rotas privadas com Firebase Authentication.
- Persistência de dados no MongoDB Atlas.
- Integração com Prisma ORM.
- Inicialização de categorias globais.
- Criação, edição, listagem e exclusão de transações.
- Resumo financeiro mensal com receitas, despesas e saldo.
- Histórico mensal para gráficos do dashboard.
- Filtros por mês, ano, tipo e categoria.
- Validação de payloads e query params com Zod.
- CORS configurável por ambiente.
- Logs básicos de erro com Fastify/Pino.

## Endpoints Principais

```txt
GET     /api/health
GET     /api/categories
GET     /api/transactions
POST    /api/transactions
GET     /api/transactions/:id
PATCH   /api/transactions/:id
DELETE  /api/transactions/:id
GET     /api/transactions/summary
GET     /api/transactions/historical
```

## Tecnologias

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- MongoDB Atlas
- Firebase Admin SDK
- Zod
- Day.js
- Biome

## Autenticação

A API usa Firebase Authentication para proteger as rotas privadas. As requisições autenticadas devem enviar um token Bearer válido no header `Authorization`.

## Deploy

- Plataforma: Render
- Banco de dados: MongoDB Atlas
- Autenticação: Firebase Authentication
- Frontend integrado: https://fintrackwallet.vercel.app

## Estrutura do Projeto

```txt
fin-track-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   │   └── transactions/
│   ├── middlewares/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   ├── app.ts
│   └── server.ts
├── biome.json
├── .env.example
├── package.json
└── tsconfig.json
```

## Qualidade Técnica

- TypeScript em modo `strict`.
- Separação entre rotas, controllers, middlewares, schemas e services.
- Respostas públicas de erro sem exposição de stack trace.
- Configuração de produção preparada para Render.
- Bind do servidor em `0.0.0.0` para ambientes de deploy.
- `.env` e arquivos sensíveis mantidos fora do versionamento.

## Autor

André Vinícius Branches Cunha
