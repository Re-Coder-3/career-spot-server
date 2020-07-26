import { Post } from "../../db/index";

export default {
  Query: {
    findPost: async (_: any, args: any) => {
      try {
        const result = await Post.findAndCountAll({});
        return result.rows;
      } catch {
        return false;
      }
    },
  },
  Mutation: {
    createPost: async (_:any, args: any) => {
      console.log(args)
      // try{
      //   result = await Category.create(args);
      // }catch(e){
      //   console.log(e)
      //   throw e
      // }
      return args;
    },
  }
};
