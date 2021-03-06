import { ApolloServer } from 'apollo-server-express'
// import { makeExecutableSchema } from '@graphql-tools/schema'
// import typeDefs from '@server/subgraphs/typeDefs'
// import resolvers from '@server/subgraphs/resolvers'

import { buildContext } from 'graphql-passport'
import UserResolver from '@server/subgraphs/user/user.resolver'

//////
import path from 'path'
import { TypegooseMiddleware } from '@server/serverLib/typegoose-middleware'
import { buildSchema } from 'type-graphql'
//////
import express from 'express'
import schema from "../subgraphs/resolvers/index"

// const { User } = models
// const schema = makeExecutableSchema({ typeDefs, resolvers })

export default async function () {
  // const schema = await buildSchema({
  //   resolvers: [UserResolver], //[__dirname + '../subgraphs/**/*.resolver.ts'],
  //   emitSchemaFile: path.resolve(__dirname + '/../subgraphs', 'schema.gql'),
  //   // use document converting middleware
  //   globalMiddlewares: [TypegooseMiddleware],
  //   // validate: false,
  // })
  const apollo = new ApolloServer( {
    schema,
    context: ({ req, res }) => {
      return buildContext({ req, res, User: {} })
    },
  });


  console.log(apollo.graphqlPath);
  await apollo.start()
  return apollo

}
