export const typeDefs = ["type Query {\n  findCategory: [Category]!\n  findUser: [User]!\n}\n\ntype Mutation {\n  createCategory(category_idx: Int!, category_name: String!): Category!\n  deleteCategory(category_idx: Int!): Category!\n  updateCategory(category_idx: Int!, category_name: String!): Category!\n  createUser(user_idx: Int!, user_name: String!, user_email: String!, user_password: String!): String\n  deleteUser(user_idx: Int!): User!\n  updateUser(user_idx: Int!, user_name: String!, user_email: String!, user_password: String!): User!\n}\n\ntype Category {\n  category_idx: Int!\n  category_name: String!\n}\n\ntype User {\n  user_idx: Int!\n  user_name: String!\n  user_email: String!\n  user_password: String!\n}\n"];
/* tslint:disable */

export interface Query {
  findCategory: Array<Category>;
  findUser: Array<User>;
}

export interface Category {
  category_idx: number;
  category_name: string;
}

export interface User {
  user_idx: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface Mutation {
  createCategory: Category;
  deleteCategory: Category;
  updateCategory: Category;
  createUser: string | null;
  deleteUser: User;
  updateUser: User;
}

export interface CreateCategoryMutationArgs {
  category_idx: number;
  category_name: string;
}

export interface DeleteCategoryMutationArgs {
  category_idx: number;
}

export interface UpdateCategoryMutationArgs {
  category_idx: number;
  category_name: string;
}

export interface CreateUserMutationArgs {
  user_idx: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface DeleteUserMutationArgs {
  user_idx: number;
}

export interface UpdateUserMutationArgs {
  user_idx: number;
  user_name: string;
  user_email: string;
  user_password: string;
}
