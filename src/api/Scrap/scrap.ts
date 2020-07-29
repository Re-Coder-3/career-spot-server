import { Scrap } from "../../db/index";

export default {
  Query: {
    findScrap: async (_: any, args: any) => {
      const { id } = args;
      try {
        const result = await Scrap.findAndCountAll({});
        return result.rows;
      } catch {
        return false;
      }
    },
  },
};
