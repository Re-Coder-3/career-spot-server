import dotenv from "dotenv";
dotenv.config();
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./db";

const schema1: any = schema;
console.log(schema1)
const server = new GraphQLServer({
  schema: schema1,
});

server.express.use(logger("dev"));

server.start({ port: 5000 }, () => console.log("✅ Server ON"));
