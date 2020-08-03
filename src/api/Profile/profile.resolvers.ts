import { Context } from 'graphql-yoga/dist/types';
import { meProfileReturnType } from '../../types/graph';
import { getUser } from '../../utils';
import { User, Profile, Image, Category } from '../../db/index';

export default {
  Query: {
    meProfile: async (_: any, __: any, context: Context): Promise<meProfileReturnType> => {
      const u = getUser(context);
      const userIdx = u?.user_idx;
      const user = await User.findOne({
        include: [
          {
            model: Profile,
            include: [
              {
                model: Image,
              },
              {
                model: Category,
              },
            ],
          },
        ],
        where: {
          user_idx: userIdx,
        },
        raw: true,
      });
      console.log(user);
      return {
        status: 200,
        data: null,
        error: null,
      };
    },
  },
};
