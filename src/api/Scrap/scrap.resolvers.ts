import { Scrap, User, Post, Category } from "../../db/index";
import { scrap } from "../../types/graph";
import { Context } from 'graphql-yoga/dist/types';
import { getUser } from "../../utils";

export default {
  Query: {
    findScrap: async (_: any, args: any) => {
      const { id } = args;
      try {
        const result = await Scrap.findAndCountAll({});
        console.log(result)
        return result.rows;
      } catch {
        return false;
      }
    },

    findScrapForUser: async (_: any, args: any, context: Context) => {
      let user_idx = Number(getUser(context)?.user_idx);
      try {
        const result = await Scrap.findAndCountAll(
          {
            include: [
              {   
                model: User,
                required: true,
                attributes: ['user_name', 'user_email']
              },
              {   
                model: Post,
                required: true,
                attributes: ['post_title', 'post_content'],
                include: [
                  {   
                    model: Category,
                    required: true,
                    attributes: ['category_name']
                  },
                ]
              },
            ],
            where: {
              user_idx: user_idx
            }
          }
        );
        return result;
      } catch {
        return false;
      }
    },

  },

  Mutation: {
    createScrap: async (_:any, args: { scrap: scrap }, context: Context) => {
      let user_idx = Number(getUser(context)?.user_idx); // number 타입 아니라고 오류남

      if(!user_idx){
        throw "로그인 정보 없음!"
      }

      let scrap = args.scrap
      try{
        const result = await Scrap.create({
          scrap_idx: "",
          post_idx: scrap.post_idx,
          user_idx: user_idx
        });
      }catch(e){
        throw e
      }
      return args.scrap;
    },
  }
};
