import { Context } from 'graphql-yoga/dist/types';
import { meProfileReturnType } from '../../types/graph';
import { getUser } from '../../utils';
import { User, Profile, Image, Category } from '../../db/index';

export default {
  Query: {
    meProfile: async (_: any, __: any, context: Context): Promise<meProfileReturnType> => {
      const u = getUser(context);
      const userIdx = u?.user_idx;
      const profile = await Profile.findOne({
        attributes: [
          'profile_idx',
          'user_idx',
          'user_name',
          'user_location',
          'user_education',
          'user_profile_img',
          'user_like_category_idx',
          'user_career',
        ],
        where: {
          user_idx: userIdx,
        },
        include: [
          {
            model: Image,
            required: true,
          },
          {
            model: Category,
            required: true,
          },
          {
            model: User,
            required: true,
          },
        ],
      });
      console.log(profile);

      return {
        status: 200,
        data: profile,
        error: null,
      };
    },
  },
};
