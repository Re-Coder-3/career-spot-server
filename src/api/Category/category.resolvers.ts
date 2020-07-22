import { category } from "../../db/index";
import { CreateCategoryMutationArgs, UpdateCategoryMutationArgs, DeleteCategoryMutationArgs } from "../../types/graph";

export default {
  Query: {
    findCategory: async (_: any, args: any) => {
      const { id } = args;
      try {
        const result = await category.findAndCountAll({});
        return result.rows;
      } catch {
        return false;
      }
    },
  },
  
  Mutation: {
    createCategory: async (_:any, args: CreateCategoryMutationArgs) => {
      let result:any
      try{
        result = await category.create(args);
      }catch(e){
        console.log(e)
        throw e
      }
      console.log(result)
      return args;
    },

    updateCategory: async (_:any, args: UpdateCategoryMutationArgs) => {
      let result:any
      try{
        result = await category.update(args,
          {
            where:{
              category_idx: args.category_idx
            }
          }
        );
      }catch(e){
        console.log(e)
        throw e
      }
      console.log(result)
      return args;
    },

    deleteCategory: async (_:any, args: DeleteCategoryMutationArgs) => {
      let result:any
      try{
        result = await category.destroy({
          where: {
            category_idx: args.category_idx
          }
        });
      }catch(e){
        console.log(e)
        throw e
      }
      console.log(result)
      return args;
    }

  }
};
