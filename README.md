# FinTrack API

API REST do FinTrack para controle financeiro pessoal, com autenticação via Firebase, persistência em MongoDB e validação de dados no backend.

O backend concentra as regras de criação, listagem, resumo e exclusão de transações, além da inicialização das categorias globais usadas pela interface.

## Funcionalidades

- Autenticação de rotas privadas com Firebase Authentication.
- Integração com MongoDB por meio do Prisma ORM.
- Inicialização automática de categorias globais.
- Criação de receitas e despesas.
- Listagem de transações por usuário autenticado.
- Filtros por mês, ano, categoria e tipo.
- Exclusão de transações.
- Resumo financeiro mensal com saldo, receitas e despesas.
- Histórico mensal para gráficos do dashboard.
- Validação de payloads e query params com Zod.
- CORS configurável por ambiente.
- Logs básicos de erro usando Fastify/Pino.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- MongoDB
- Firebase Admin SDK
- Zod
- Day.js
- Biome

## Rotas Principais

```txt
GET     /api/health
GET     /api/categories
GET     /api/transactions
POST    /api/transactions
DELETE  /api/transactions/:id
GET     /api/transactions/summary
GET     /api/transactions/historical
```

## Variáveis de Ambiente

```txt
PORT
DATABASE_URL
FRONTEND_URL
NODE_ENV
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
```

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
├── .env.example
├── biome.json
├── package.json
└── tsconfig.json
```

## Qualidade Técnica

- TypeScript em modo `strict`.
- Separação entre rotas, controllers, middlewares, schemas e services.
- Respostas públicas de erro sem stack trace.
- Configuração de CORS preparada para diferenciar desenvolvimento e produção.
- `.env` e arquivos sensíveis devem permanecer fora do versionamento.

## Autor

André Vinícius Branches Cunha
