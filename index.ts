import { GraphQLServer } from 'graphql-yoga'
import { typeDef as typeDefs } from './graphql/category/category.graphql'
import { resolver as resolvers } from './graphql/category/category.resolver'

console.log(resolvers)

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))


