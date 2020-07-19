import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "./api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "./api/**/*.resolvers.*"));

export const mergedTypes = mergeTypes(allTypes);
export const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers,
});

export default schema;
