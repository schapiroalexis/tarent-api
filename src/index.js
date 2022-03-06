const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { app } = require("./app");

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT || 3000;

const graphQLServer = new ApolloServer({ resolvers, typeDefs });
graphQLServer.listen({ PORT }, () =>
  console.log(`Server runs at: http://localhost:${PORT}`)
);

// const server = app.listen(PORT, () =>
//   console.log(
//     `🚀 Server ready at: http://localhost:${PORT}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
//   )
// );
