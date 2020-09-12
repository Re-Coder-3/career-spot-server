import { Category, Image } from "../../db/index";
import {
  CreateCategoryMutationArgs,
  UpdateCategoryMutationArgs,
  DeleteCategoryMutationArgs,
} from "../../types/graph";

export default {
  Query: {
    findCategory: async (_: any, args: any) => {
      const { id } = args;
      try {
        const result = await Category.findAndCountAll({
          attributes: ['category_name'],
          include: [
            {
              model: Image,
              required: true,
              attributes: ['image_url']
            }
          ]
        });
        return result;
      } catch(err) {
        console.log(err)
        return false;
      }
    },
  },

  Mutation: {
    createCategory: async (_:any, args: CreateCategoryMutationArgs) => {
      let result:any
      try{
        result = await Category.create(args);
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
        result = await Category.update(args,
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
        result = await Category.destroy({
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
