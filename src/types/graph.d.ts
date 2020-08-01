
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
  hashtag: Hashtag;
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

export interface Hashtag {
  hashtag_idx: number;
  hashtag_name: string;
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
  singleUpload: boolean;
  createPost: Post;
  createScrap: Scrap;
  kakaoAuth: string;
  createUser: createUserReturnType;
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

export interface SingleUploadMutationArgs {
  file: Upload;
}

export interface CreatePostMutationArgs {
  image: image;
  post: post;
  hashtag: hashtag | null;
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

export type Upload = any;

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

export interface hashtag {
  hashtag_name: string | null;
}

export interface scrap {
  user_idx: number;
  post_idx: number;
}

export interface createUserReturnType {
  status: number;
  error: string | null;
}
