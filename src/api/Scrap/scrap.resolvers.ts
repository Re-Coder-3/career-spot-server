import { Scrap } from "../../db/index";
import { scrap } from "../../types/graph";

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
  },

  Mutation: {
    createScrap: async (_:any, args: { scrap: scrap }) => {
      let result:any
      let scrap = args.scrap
      try{
        result = await Scrap.create({
          scrap_idx: "",
          post_idx: scrap.post_idx,
          user_idx: scrap.user_idx
        });
      }catch(e){
        console.log(e)
        throw e
      }
      console.log(result)
      return args.scrap;
    },
  }
};
