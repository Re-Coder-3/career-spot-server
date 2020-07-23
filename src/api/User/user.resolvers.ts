import { User } from "../../db/index";
import {
  CreateUserMutationArgs,
  UpdateUserMutationArgs,
  DeleteUserMutationArgs,
} from "../../types/graph";

export default {
  Query: {
    findUser: async (_: any, args: any) => {
      const { id } = args;
      try {
        const result = await User.findAndCountAll({});
        return result.rows;
      } catch {
        return false;
      }
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserMutationArgs) => {
      let result: any;
      console.log(args);
      try {
        result = await User.create({
          id: 1,
          name: args.name,
          email: args.email,
        });
        console.log(result);
        return "true";
      } catch (e) {
        console.log(e);
        return "false";
      }
    },

    // updateUser: async (_: any, args: UpdateUserMutationArgs) => {
    //   let result: any;
    //   try {
    //     result = await User.update(args, {
    //       where: {
    //         user_idx: args.user_idx,
    //       },
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     throw e;
    //   }
    //   console.log(result);
    //   return args;
    // },

    // deleteUser: async (_: any, args: DeleteUserMutationArgs) => {
    //   let result: any;
    //   try {
    //     result = await User.destroy({
    //       where: {
    //         user_idx: args.user_idx,
    //       },
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     throw e;
    //   }
    //   console.log(result);
    //   return args;
    // },
  },
};