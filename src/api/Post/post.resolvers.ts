import { Post, Image, Category, User, Hashtag } from "../../db/index";
import { image, post, hashtag, args } from "../../types/graph";
export default {
  Query: {
    /**
     * 모든 게시물 불러오기 (카테고리별 불러오기, 해시태그별 불러오기, )
     */
    findPost: async (_: any, args: {args: args}) => {
      console.log(args)
      try {
        const result = await Post.findAndCountAll({
          attributes: ['post_idx', 'category_idx', 'user_idx', 'image_idx', 'post_title', 'post_content'],
          include: [
            {   
              model: Category,
              required: true,
              attributes: ['category_name']
            },
            {   
              model: User,
              required: true,
              attributes: ['user_name', 'user_email', 'user_password']
            },
            {   
              model: Image,
              required: true,
              attributes: ['image_url']
            },
            {   
              model: Hashtag,
              required: true,
              attributes: ['hashtag_name']
            }
          ]
        });

        return result;
      } catch {
        return false;
      }
    },
  },
  Mutation: {
    /**
     * 글 작성하기
     */
    createPost: async (_:any, args: {image: image, post: post, hashtag: hashtag}) => {
      const post:any = args.post;
      const image:any = args.image;
      const hashtag:any = args.hashtag;

      try{

        const image_result = await Image.create({
          image_idx: "",
          image_url: image.image_url
        })

        const image_idx = Number(image_result.image_idx); // 생성된 이미지 idx

        const hashtag_result = await Hashtag.create({
          hashtag_idx: "",
          hashtag_name: hashtag.hashtag_name
        })

        const hashtag_idx = Number(hashtag_result.hashtag_idx); // 생성된 해시태그 idx

        await Post.create({
          post_idx: "",
          category_idx: post.category_idx,
          user_idx: post.user_idx,
          image_idx: image_idx,
          post_title: post.post_title,
          post_content: post.post_content,
          hashtag_idx: hashtag_idx
        });

      }catch(e){
        console.log(e)
        throw e
      }
      return args.post;
    },
  }
};
