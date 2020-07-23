import { user } from "../../db/index";
import { CreateUserMutationArgs, UpdateUserMutationArgs, DeleteUserMutationArgs } from "../../types/graph";

export default {
  Query: {
    findUser: async (_: any, args: any) => {
      const { id } = args;
      try {
        const result = await user.findAndCountAll({});
        return result.rows;
      } catch {
        return false;
      }
    },
  },
  
  Mutation: {
    createUser: async (_:any, args: CreateUserMutationArgs) => {
      let result:any
      try{
        result = await user.create(args);
      }catch(e){
        console.log(e)
        throw e
      }
      console.log(result)
      return args;
    },

    updateUser: async (_:any, args: UpdateUserMutationArgs) => {
      let result:any
      try{
        result = await user.update(args,
          {
            where:{
              user_idx: args.user_idx
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

    deleteUser: async (_:any, args: DeleteUserMutationArgs) => {
      let result:any
      try{
        result = await user.destroy({
          where: {
            user_idx: args.user_idx
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
