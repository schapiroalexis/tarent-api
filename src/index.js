const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { seedDB } = require("./seedDB.js");
const { app } = require("./routes");

const port = process.env.PORT || 3000;

const seed = process.env.SEED || false;

const graphQLServer = new ApolloServer({ resolvers, typeDefs });
graphQLServer.listen({ port }, async () => {
  console.log(`Server runs at: http://localhost:${port}`);
  if (seed == "TRUE") {
    console.log("SEEDING DB");
    seedDB();
    process.env.SEED = false;
  }
});

// const server = app.listen(port, () =>
//   console.log(
//     `🚀 Server ready at: http://localhost:${port}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
//   )
// );
