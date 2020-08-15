
/* tslint:disable */

export interface Query {
  findCategory: Array<Category>;
  getHeartUser: getHeartUserReturnType;
  getHeartPost: getHeartPostReturnType;
  findPost: returnType;
  meProfile: meProfileReturnType;
  findReview: findReviewReturnType;
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

export interface Category {
  category_idx: number;
  category_name: string;
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

export interface Image {
  image_idx: number;
  image_url: string;
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

export interface findReviewReturnType {
  status: number;
  data: Array<returnReview>;
  error: string | null;
}

export interface returnReview {
  count: number;
  rows: Array<Review>;
}

export interface Review {
  review_idx: number;
  user_idx: number;
  target_user_idx: number;
  review_content: string;
  review_stars: number;
  user: User | null;
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
  image_url: string | null;
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
