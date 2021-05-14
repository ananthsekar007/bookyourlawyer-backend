import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { buildSchema } from "type-graphql";
import { Context } from "./../types/Context";
import { AuthResolver } from "./../src/auth/AuthResolver";

const gqlDepthLimit = 7;
const gqlPath = "/bookyourlawyer";

export async function buildApolloServer(app: express.Application, httpServer) {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
    emitSchemaFile: true,
    validate: false,
  });
  const graphqlServer = new ApolloServer({
    schema,
    validationRules: [depthLimit(gqlDepthLimit)],
    context: ({ req }): Context => {
      return { req };
    },
  });
  graphqlServer.applyMiddleware({ app, path: gqlPath });
  console.log("graphql init done");
}
