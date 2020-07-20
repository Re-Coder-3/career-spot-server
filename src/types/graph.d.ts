export const typeDefs = ["type User {\n  id: ID!\n  username: String!\n  password: String!\n  email: String!\n}\n\ntype Query {\n  readUser(id: ID!): User!\n}\n"];
/* tslint:disable */

export interface Query {
  readUser: User;
}

export interface ReadUserQueryArgs {
  id: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}
