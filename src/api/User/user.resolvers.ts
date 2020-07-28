import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../db/index';
import {
  CreateUserMutationArgs,
  UpdateUserMutationArgs,
  DeleteUserMutationArgs,
  LoginUserMutationArgs,
} from '../../types/graph';
import { Context } from 'graphql-yoga/dist/types';

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
    checkJwt: async (_: any, __: any, context: Context) => {
      const token = context.request.headers.authorization;
      const SECRET_KEY = process.env.JWT_SECRET_KEY!;
      const decodedId = jwt.verify(token, SECRET_KEY);
      console.log(decodedId);
      return 'hi';
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserMutationArgs) => {
      try {
        // console.log(context.request.headers);
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

    loginUser: async (_: any, args: LoginUserMutationArgs, context: Context) => {
      try {
        const { user_email, user_password } = args;
        const user = await User.findOne({
          where: {
            user_email,
          },
        });
        if (!user) {
          return 'UserNotFound';
        }
        const pwd = await bcrypt.compare(user_password, user.user_password);
        if (!pwd) {
          return 'WrongPwd';
        }
        const SECRET_KEY = process.env.JWT_SECRET_KEY!;
        const jwtToken = jwt.sign(args, SECRET_KEY, {
          expiresIn: '4h',
        });
        console.log(jwtToken);

        return jwtToken;
      } catch (e) {
        console.log(e);
        return 'ServerErr';
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
