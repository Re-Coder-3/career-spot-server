export const typeDefs = ["type Query {\n  findCategory: [Category]!\n  findPost: returnType!\n  findUser: String\n}\n\ntype Mutation {\n  createCategory(category_idx: Int!, category_name: String!): Category!\n  deleteCategory(category_idx: Int!): Category!\n  updateCategory(category_idx: Int!, category_name: String!): Category!\n  createPost(image: image!, post: post!): Post!\n  createUser(user_name: String!, user_email: String!, user_password: String!): String\n  deleteUser(user_idx: Int!): User!\n  updateUser(user_idx: Int!, user_name: String!, user_email: String!, user_password: String!): User!\n}\n\ntype Category {\n  category_idx: Int!\n  category_name: String!\n  category_idx: Int!\n  category_name: String!\n}\n\ntype Post {\n  post_idx: Int\n  category_idx: Int!\n  user_idx: Int!\n  image_idx: Int!\n  post_title: String!\n  post_content: String!\n  category: Category!\n  user: User!\n  image: Image!\n}\n\ninput image {\n  image_url: String\n}\n\ninput post {\n  category_idx: Int!\n  user_idx: Int!\n  image_idx: Int!\n  post_title: String!\n  post_content: String!\n}\n\ntype returnType {\n  count: Int!\n  rows: [Post!]!\n}\n\ntype User {\n  user_idx: Int!\n  user_name: String!\n  user_email: String!\n  user_idx: Int!\n  user_name: String!\n  user_email: String!\n  user_password: String!\n}\n\ntype Image {\n  image_idx: Int!\n  image_url: String!\n}\n"];
/* tslint:disable */

export interface Query {
  findCategory: Array<Category>;
  findPost: returnType;
  findUser: string | null;
}

export interface Category {
  category_idx: number;
  category_name: string;
}

export interface returnType {
  count: number;
  rows: Array<Post>;
}

export interface Post {
  post_idx: number | null;
  category_idx: number;
  user_idx: number;
  image_idx: number;
  post_title: string;
  post_content: string;
  category: Category;
  user: User;
  image: Image;
}

export interface User {
  user_idx: number;
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface Image {
  image_idx: number;
  image_url: string;
}

export interface Mutation {
  createCategory: Category;
  deleteCategory: Category;
  updateCategory: Category;
  createPost: Post;
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

export interface CreatePostMutationArgs {
  image: image;
  post: post;
}

export interface CreateUserMutationArgs {
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

export interface image {
  image_url: string | null;
}

export interface post {
  category_idx: number;
  user_idx: number;
  image_idx: number;
  post_title: string;
  post_content: string;
}
