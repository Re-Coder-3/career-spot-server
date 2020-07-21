export const typeDefs = ["type Query {\n  select_category: [Category]!\n}\n\ntype Category {\n  category_idx: Int!\n  category_name: String!\n}\n\ntype Catrgory {\n  id: ID!\n  name: String!\n}\n\ntype User {\n  id: ID!\n  name: String!\n  age: Int!\n  email: String!\n  password: String!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Mutation {\n  createUser(email: String!, username: String!, password: String!, age: Int!): String!\n}\n"];
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
  age: number;
}

export interface Catrgory {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  createdAt: string | null;
  updatedAt: string | null;
}
