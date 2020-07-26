import { Post } from "../../db/index";

export default {
  Query: {
    findPost: async (_: any, args: any) => {
      try {
        const result = await Post.findAndCountAll({});
        console.log(result)
        return result.rows;
      } catch {
        return false;
      }
    },
  }
};
