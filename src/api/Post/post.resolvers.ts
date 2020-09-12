import { Post, Image, Category, User, Hashtag, Profile } from '../../db/index';
import { image, post, hashtag, args, CreatePost1MutationArgs } from '../../types/graph';
import { changeWhere, getUser } from '../../utils';
import { Context } from 'graphql-yoga/dist/types';
import { profile } from 'console';
export default {
  Query: {
    /**
     * 모든 게시물 불러오기 (카테고리별 불러오기, 해시태그별 불러오기, )
     */
    findPost: async (_: any, args: { args: args }) => {
      const args_ = args.args;
      console.log(args);
      try {
        const result = await Post.findAndCountAll({
          // where: changeWhere(args_.filter),
          attributes: [
            'post_idx',
            'category_idx',
            'user_idx',
            'image_idx',
            'post_title',
            'post_content',
            'post_location',
            'createdAt',
            'updatedAt',
          ],
          include: [
            {
              model: Category,
              required: true,
              attributes: ['category_name'],
            },
            {
              model: User,
              required: true,
            },
          ],
          offset: args_.offset,
          limit: args_.limit,
        });

        return result;
      } catch(err) {
        console.log("왜안되는지이유나들어보자 ")
        console.log(err)
        return false;
      }
    },
  },
  Mutation: {
    createPost1: async (_: any, args: CreatePost1MutationArgs, context: Context) => {
      const user = getUser(context);
      const userId = user?.user_idx!;

      try {
        const { image_url, post_title, post_content, post_location, hashtag_name } = args;
        // * image create
        const image_result = await Image.create({
          image_idx: '',
          image_url,
        });
        const image_idx = Number(image_result.image_idx);

        // * hashtag create
        const hashtag_result = await Hashtag.create({
          hashtag_idx: '',
          hashtag_name: hashtag_name ?? '상관없음',
        });
        const hashtag_idx = Number(hashtag_result.hashtag_idx);

        // * post create
        await Post.create({
          post_idx: '',
          hashtag_idx,
          image_idx,
          user_idx: userId,
          post_content,
          post_location: post_location ?? '장소무관',
          post_title,
          category_idx: 1,
        });

        return {
          status: 200,
          error: null,
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          error: 'serverError',
        };
      }
    },
    /**
     * 글 작성하기
     */
    createPost: async (_: any, args: { image: image; post: post; hashtag: hashtag }) => {
      const post: any = args.post;
      const image: any = args.image;
      const hashtag: any = args.hashtag;

      try {
        const image_result = await Image.create({
          image_idx: '',
          image_url: image.image_url,
        });

        const image_idx = Number(image_result.image_idx); // 생성된 이미지 idx

        const hashtag_result = await Hashtag.create({
          hashtag_idx: '',
          hashtag_name: hashtag.hashtag_name,
        });

        const hashtag_idx = Number(hashtag_result.hashtag_idx); // 생성된 해시태그 idx

        await Post.create({
          post_idx: '',
          category_idx: post.category_idx,
          user_idx: post.user_idx,
          image_idx: image_idx,
          hashtag_idx: hashtag_idx,
          post_title: post.post_title,
          post_content: post.post_content,
          post_location: post.post_location,
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
      return args.post;
    },

    deletePost: async (_: any, args: { post_idx: number }) => {
      // review 가 있는 post는 삭제를 못해야하나????????
      // 뭐지????
      // 어떻게 해야하지?????? 고민 좀 해보자...

      try {
        Post.destroy({
          where: {
            post_idx: args.post_idx,
          },
        });

        return args.post_idx;
      } catch (err) {}
    },
  },
};
