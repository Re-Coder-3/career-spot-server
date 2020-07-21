import { category } from './../../db/index'
// import { ReadUserQueryArgs } from "../../../types/graph";

export const resolver =  {
  Query: {
    select_category: async (_: any, args:any) => {
      const { id } = args;
      try {
        const category_list = await category.findAndCountAll({})
        console.log(category_list.rows)
        return category_list.rows;
      } catch {
        return false;
      }
    },
  },
};
