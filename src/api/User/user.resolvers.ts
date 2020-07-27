import * as bcrypt from 'bcryptjs';
import { User } from '../../db/index';
import {
  CreateUserMutationArgs,
  UpdateUserMutationArgs,
  DeleteUserMutationArgs,
} from '../../types/graph';

export default {
  Query: {
    findAllUser: async () => {
      try {
        const result = await User.findAndCountAll({});
        return result;
      } catch {
        return false;
      }
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserMutationArgs) => {
      try {
        const { user_name, user_email, user_password } = args;
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const nameCheck = await User.findOne({
          where: {
            user_name,
          },
        });
        const emailCheck = await User.findOne({
          where: {
            user_email,
          },
        });
        if (nameCheck) {
          return 'nameDuplicated';
        }
        if (emailCheck) {
          return 'emailDuplicated';
        }
        await User.create({
          user_idx: '',
          user_name,
          user_email,
          user_password: hashedPassword,
        });
        return 'Success';
      } catch (e) {
        console.log(e);
        return 'Fail';
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
