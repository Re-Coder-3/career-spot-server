export const typeDefs = ["type Query {\n  findCategory: [Category]!\n  findPost: returnType!\n  findScrap: [Scrap]!\n  findScrapForUser: PostreturnType!\n  findAllUser: UserReturnType!\n  checkUser: String\n}\n\ntype Mutation {\n  createCategory(category_idx: Int!, category_name: String!): Category!\n  deleteCategory(category_idx: Int!): Category!\n  updateCategory(category_idx: Int!, category_name: String!): Category!\n  createPost(image: image!, post: post!): Post!\n  createScrap(scrap: scrap!): Scrap!\n  kakaoAuth(code: String!): String!\n  createUser(user_name: String!, user_email: String!, user_password: String!): String!\n  loginUser(user_email: String!, user_password: String!): String!\n  deleteUser(user_idx: Int!): User!\n  updateUser(image_url: String): String!\n}\n\ntype Category {\n  category_idx: Int!\n  category_name: String!\n}\n\ntype Post {\n  post_idx: Int\n  category_idx: Int!\n  user_idx: Int!\n  image_idx: Int!\n  post_title: String!\n  post_content: String!\n  category: Category!\n  user: User!\n  image: Image!\n}\n\ninput image {\n  image_url: String\n}\n\ninput post {\n  category_idx: Int!\n  user_idx: Int!\n  image_idx: Int!\n  post_title: String!\n  post_content: String!\n}\n\ntype returnType {\n  count: Int!\n  rows: [Post!]!\n}\n\ntype Image {\n  image_idx: Int!\n  image_url: String!\n}\n\ntype Scrap {\n  scrap_idx: Int!\n  user_idx: Int!\n  post_idx: Int!\n  post: Post!\n  user: User!\n}\n\ninput scrap {\n  user_idx: Int!\n  post_idx: Int!\n}\n\ntype PostreturnType {\n  count: Int!\n  rows: [Scrap!]!\n}\n\ntype UserReturnType {\n  count: Int!\n  rows: [User!]!\n}\n\ntype User {\n  user_idx: Int!\n  user_name: String!\n  user_email: String!\n  user_password: String!\n}\n"];
/* tslint:disable */

export interface Query {
  findCategory: Array<Category>;
  findPost: returnType;
  findScrap: Array<Scrap>;
  findScrapForUser: PostreturnType;
  findAllUser: UserReturnType;
  checkUser: string | null;
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

export interface Scrap {
  scrap_idx: number;
  user_idx: number;
  post_idx: number;
  post: Post;
  user: User;
}

export interface PostreturnType {
  count: number;
  rows: Array<Scrap>;
}

export interface UserReturnType {
  count: number;
  rows: Array<User>;
}

export interface Mutation {
  createCategory: Category;
  deleteCategory: Category;
  updateCategory: Category;
  createPost: Post;
  createScrap: Scrap;
  kakaoAuth: string;
  createUser: string;
  loginUser: string;
  deleteUser: User;
  updateUser: string;
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

export interface CreateScrapMutationArgs {
  scrap: scrap;
}

export interface KakaoAuthMutationArgs {
  code: string;
}

export interface CreateUserMutationArgs {
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface LoginUserMutationArgs {
  user_email: string;
  user_password: string;
}

export interface DeleteUserMutationArgs {
  user_idx: number;
}

export interface UpdateUserMutationArgs {
  image_url: string | null;
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

export interface scrap {
  user_idx: number;
  post_idx: number;
}
