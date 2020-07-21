export const typeDefs = ["type Query {\n  select_category: [Category]!\n}\n\ntype Category {\n  category_idx: Int!\n  category_name: String!\n}\n\ntype Catrgory {\n  id: ID!\n  name: String!\n}\n\ntype Mutation {\n  createUser(email: String!, username: String!, password: String!): String!\n}\n"];
/* tslint:disable */

export interface Query {
  select_category: Array<Category>;
}

export interface Category {
  category_idx: number;
  category_name: string;
}

export interface Mutation {
  createUser: string;
}

export interface CreateUserMutationArgs {
  email: string;
  username: string;
  password: string;
}

export interface Catrgory {
  id: string;
  name: string;
}
