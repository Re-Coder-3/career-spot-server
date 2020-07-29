import { Scrap } from "../../db/index";

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
};
