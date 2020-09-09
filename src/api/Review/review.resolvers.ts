import { args, review } from '../../types/graph';
import { Context } from 'graphql-yoga/dist/types';
import { getUser, changeWhere } from '../../utils';
import { Review, User, Profile } from '../../db';

export default {
  Query: {
    findReview: async (_: any, args: { args: args }, context: Context) => {
      const args_ = args.args;
      try {
        const u = getUser(context);
        const user_idx = u?.user_idx!;
        const result = await Review.findAll({
          // where: changeWhere(args_.filter),
          attributes: ['review_idx', 'review_stars', 'review_content', 'user_idx', 'target_user_idx'],
          offset: args_.offset,
          limit: args_.limit,
          include: [
            {
              model: User,
              required: true,
              as: 'target_user',
              attributes: ['user_idx', 'user_email'],
              include: [
                {
                  model: Profile,
                  required: true,
                  attributes: ['user_name']
                }
              ]
            }
          ]
        });
        console.log(JSON.stringify(result))
        // return {
        //   status: 200,
        //   data: result,
        //   error: null,
        // };

        return "test"
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    writeReview: async (_: any, args: { review: review }, context: Context) => {
      const user = getUser(context);
      const userId = user?.user_idx!;
      const review = args.review

      if(!userId){
        throw "없는 사용자"
      }

      try {

        // * post create
        await Review.create({
          review_idx: '',
          user_idx: userId,
          target_user_idx: review.target_user_idx,
          review_stars: review.review_stars,
          review_content: review.review_content
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
  },
};
