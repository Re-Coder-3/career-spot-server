export const typeDefs = ["type Query {\n  findCategory: returnCategoryType!\n  getHeartUser: getHeartUserReturnType!\n  getHeartPost: getHeartPostReturnType!\n  findPost(args: args!): returnType!\n  meProfile: meProfileReturnType!\n  findReview(args: args!): String!\n  findScrap: [Scrap]!\n  findScrapForUser: PostreturnType!\n  findAllUser: UserReturnType!\n  checkUser: String\n}\n\ntype Mutation {\n  createCategory(category_idx: Int!, category_name: String!): Category!\n  deleteCategory(category_idx: Int!): Category!\n  updateCategory(category_idx: Int!, category_name: String!): Category!\n  toggleHeart(target_user_idx: Int, target_post_idx: Int): toggleHeartReturnType!\n  singleUpload(file: Upload!): String!\n  createPost(image: image!, post: post!, hashtag: hashtag): Post!\n  deletePost(post_idx: Int!): Int!\n  createPost1(image_url: [String], post_title: String!, post_content: String!, post_location: String, hashtag_name: String): createPostReturnType!\n  writeReview(review: review!): writeReviewReturnType!\n  createScrap(scrap: scrap!): Scrap!\n  kakaoAuth(code: String!): String!\n  createUser(user_email: String!, user_password: String!): createUserReturnType!\n  updateUserProfile(user_name: String!, user_location: String, user_like_category: String, user_profile_img: String, user_birthday: String, user_career: String, user_education: String, user_career_img: [String]): updateUserProfileReturnType!\n  loginUser(user_email: String!, user_password: String!): loginUserReturnType!\n  sendNewPassword(user_email: String!): sendNewPasswordReturnType!\n  deleteUser(user_idx: Int!): User!\n}\n\ntype returnCategoryType {\n  count: Int!\n  rows: [Category!]!\n}\n\ntype Category {\n  category_idx: Int!\n  category_name: String!\n  image: [Image]!\n}\n\ntype Heart {\n  heart_idx: Int!\n  target_user_idx: Int\n  target_post_idx: Int\n  user: User\n}\n\ntype getHeartUserReturnType {\n  status: Int!\n  data: [Heart]\n  error: String\n}\n\ntype getHeartPostReturnType {\n  status: Int!\n  data: [Post]\n  error: String\n}\n\ntype toggleHeartReturnType {\n  status: Int!\n  data: Boolean\n  error: String\n}\n\nscalar Upload\n\ntype createPostReturnType {\n  status: Int!\n  error: String\n}\n\ntype Post {\n  post_idx: Int\n  category_idx: Int!\n  user_idx: Int!\n  image_idx: Int!\n  post_title: String!\n  post_content: String!\n  post_location: String!\n  category: Category!\n  user: User!\n  image: Image!\n  hashtag: Hashtag!\n  createdAt: Date!\n  updatedAt: Date!\n}\n\nscalar Date\n\ninput image {\n  image_url: String\n}\n\ninput post {\n  category_idx: Int!\n  user_idx: Int!\n  image_idx: Int!\n  post_title: String!\n  post_content: String!\n  post_location: String!\n}\n\ninput hashtag {\n  hashtag_name: String\n}\n\ntype returnType {\n  count: Int!\n  rows: [Post!]!\n}\n\ntype Image {\n  image_idx: Int!\n  image_url: String!\n}\n\ntype Hashtag {\n  hashtag_idx: Int!\n  hashtag_name: String!\n}\n\ninput args {\n  offset: Int!\n  limit: Int!\n  filter: filter\n}\n\ninput filter {\n  logic: String!\n  filters: [filters!]!\n}\n\ninput filters {\n  field: String!\n  operator: String!\n  value: String!\n}\n\ntype meProfileReturnType {\n  status: Int!\n  data: Profile\n  error: String\n}\n\ntype Profile {\n  profile_idx: Int\n  user_idx: Int\n  user_name: String\n  user_location: String\n  user_education: String\n  user_profile_img: Int\n  user_like_category_idx: Int\n  user_career: String\n  category: Category\n  user: User\n  image: Image\n}\n\ntype Review {\n  review_idx: Int!\n  user_idx: Int!\n  target_user_idx: Int!\n  review_content: String!\n  review_stars: Int!\n  target_user: User\n}\n\ntype returnReview {\n  count: Int!\n  rows: [Review!]!\n}\n\ntype findReviewReturnType {\n  status: Int!\n  data: [returnReview!]\n  error: String\n}\n\ninput review {\n  user_idx: Int\n  target_user_idx: Int!\n  review_content: String!\n  review_stars: Int!\n}\n\ntype writeReviewReturnType {\n  status: Int!\n  error: String\n}\n\ntype Scrap {\n  scrap_idx: Int!\n  user_idx: Int!\n  post_idx: Int!\n  post: Post!\n  user: User!\n}\n\ninput scrap {\n  user_idx: Int!\n  post_idx: Int!\n}\n\ntype PostreturnType {\n  count: Int!\n  rows: [Scrap!]!\n}\n\ntype sendNewPasswordReturnType {\n  status: Int!\n  data: Boolean\n  error: String\n}\n\ntype User {\n  user_idx: Int!\n  user_email: String!\n  user_password: String!\n  user_profile: Profile\n}\n\ntype UserReturnType {\n  count: Int!\n  rows: [User!]!\n}\n\ntype loginUserReturnType {\n  status: Int!\n  data: String\n  error: String\n}\n\ntype createUserReturnType {\n  status: Int!\n  error: String\n}\n\ntype updateUserProfileReturnType {\n  status: Int!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  findCategory: returnCategoryType;
  getHeartUser: getHeartUserReturnType;
  getHeartPost: getHeartPostReturnType;
  findPost: returnType;
  meProfile: meProfileReturnType;
  findReview: string;
  findScrap: Array<Scrap>;
  findScrapForUser: PostreturnType;
  findAllUser: UserReturnType;
  checkUser: string | null;
}

export interface FindPostQueryArgs {
  args: args;
}

export interface FindReviewQueryArgs {
  args: args;
}

export interface returnCategoryType {
  count: number;
  rows: Array<Category>;
}

export interface Category {
  category_idx: number;
  category_name: string;
  image: Array<Image>;
}

export interface Image {
  image_idx: number;
  image_url: string;
}

export interface getHeartUserReturnType {
  status: number;
  data: Array<Heart> | null;
  error: string | null;
}

export interface Heart {
  heart_idx: number;
  target_user_idx: number | null;
  target_post_idx: number | null;
  user: User | null;
}

export interface User {
  user_idx: number;
  user_email: string;
  user_password: string;
  user_profile: Profile | null;
}

export interface Profile {
  profile_idx: number | null;
  user_idx: number | null;
  user_name: string | null;
  user_location: string | null;
  user_education: string | null;
  user_profile_img: number | null;
  user_like_category_idx: number | null;
  user_career: string | null;
  category: Category | null;
  user: User | null;
  image: Image | null;
}

export interface getHeartPostReturnType {
  status: number;
  data: Array<Post> | null;
  error: string | null;
}

export interface Post {
  post_idx: number | null;
  category_idx: number;
  user_idx: number;
  image_idx: number;
  post_title: string;
  post_content: string;
  post_location: string;
  category: Category;
  user: User;
  image: Image;
  hashtag: Hashtag;
  createdAt: Date;
  updatedAt: Date;
}

export interface Hashtag {
  hashtag_idx: number;
  hashtag_name: string;
}

export type Date = any;

export interface args {
  offset: number;
  limit: number;
  filter: filter | null;
}

export interface filter {
  logic: string;
  filters: Array<filters>;
}

export interface filters {
  field: string;
  operator: string;
  value: string;
}

export interface returnType {
  count: number;
  rows: Array<Post>;
}

export interface meProfileReturnType {
  status: number;
  data: Profile | null;
  error: string | null;
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
  toggleHeart: toggleHeartReturnType;
  singleUpload: string;
  createPost: Post;
  deletePost: number;
  createPost1: createPostReturnType;
  writeReview: writeReviewReturnType;
  createScrap: Scrap;
  kakaoAuth: string;
  createUser: createUserReturnType;
  updateUserProfile: updateUserProfileReturnType;
  loginUser: loginUserReturnType;
  sendNewPassword: sendNewPasswordReturnType;
  deleteUser: User;
}

export interface CreateCategoryMutationArgs {
  category_idx: number;
  image_idx: number;
  category_name: string;
}

export interface DeleteCategoryMutationArgs {
  category_idx: number;
}

export interface UpdateCategoryMutationArgs {
  category_idx: number;
  category_name: string;
}

export interface ToggleHeartMutationArgs {
  target_user_idx: number | null;
  target_post_idx: number | null;
}

export interface SingleUploadMutationArgs {
  file: Upload;
}

export interface CreatePostMutationArgs {
  image: image;
  post: post;
  hashtag: hashtag | null;
}

export interface DeletePostMutationArgs {
  post_idx: number;
}

export interface CreatePost1MutationArgs {
  image_url: Array<string> | null;
  post_title: string;
  post_content: string;
  post_location: string | null;
  hashtag_name: string | null;
}

export interface WriteReviewMutationArgs {
  review: review;
}

export interface CreateScrapMutationArgs {
  scrap: scrap;
}

export interface KakaoAuthMutationArgs {
  code: string;
}

export interface CreateUserMutationArgs {
  user_email: string;
  user_password: string;
}

export interface UpdateUserProfileMutationArgs {
  user_name: string;
  user_location: string | null;
  user_like_category: string | null;
  user_profile_img: string | null;
  user_birthday: string | null;
  user_career: string | null;
  user_education: string | null;
  user_career_img: Array<string> | null;
}

export interface LoginUserMutationArgs {
  user_email: string;
  user_password: string;
}

export interface SendNewPasswordMutationArgs {
  user_email: string;
}

export interface DeleteUserMutationArgs {
  user_idx: number;
}

export interface toggleHeartReturnType {
  status: number;
  data: boolean | null;
  error: string | null;
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
  post_location: string;
}

export interface hashtag {
  hashtag_name: string | null;
}

export interface createPostReturnType {
  status: number;
  error: string | null;
}

export interface review {
  user_idx: number | null;
  target_user_idx: number;
  review_content: string;
  review_stars: number;
}

export interface writeReviewReturnType {
  status: number;
  error: string | null;
}

export interface scrap {
  user_idx: number;
  post_idx: number;
}

export interface createUserReturnType {
  status: number;
  error: string | null;
}

export interface updateUserProfileReturnType {
  status: number;
  error: string | null;
}

export interface loginUserReturnType {
  status: number;
  data: string | null;
  error: string | null;
}

export interface sendNewPasswordReturnType {
  status: number;
  data: boolean | null;
  error: string | null;
}

export interface Review {
  review_idx: number;
  user_idx: number;
  target_user_idx: number;
  review_content: string;
  review_stars: number;
  target_user: User | null;
}

export interface returnReview {
  count: number;
  rows: Array<Review>;
}

export interface findReviewReturnType {
  status: number;
  data: Array<returnReview>;
  error: string | null;
}
