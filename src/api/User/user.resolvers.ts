import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Image } from '../../db/index';
import {
  CreateUserMutationArgs,
  UpdateUserMutationArgs,
  DeleteUserMutationArgs,
  LoginUserMutationArgs,
} from '../../types/graph';
import { Context } from 'graphql-yoga/dist/types';
import { getUser } from '../../utils';

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
    checkUser: async (_: any, __: any, context: Context) => {
      const user = getUser(context);
      console.log(user);
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
          user_profile_image: '',
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
        const jwtToken = jwt.sign({ ...args, user_idx: user.user_idx }, SECRET_KEY, {
          expiresIn: '4h',
        });
        console.log(jwtToken);

        return jwtToken;
      } catch (e) {
        console.log(e);
        return 'ServerErr';
      }
    },

    updateUser: async (_: any, args: UpdateUserMutationArgs, context: Context) => {
      const user = getUser(context);
      const user_idx = user?.user_idx;
      try {
        const user = await User.findOne({
          where: { user_idx },
        });
        const image_idx = user?.user_profile_image;
        if (image_idx) {
          await Image.destroy({
            where: {
              image_idx,
            },
          });
          const { image_url }: string | any = args!;
          const image_result = await Image.create({
            image_idx: '',
            image_url: image_url,
          });
          await User.update(
            { user_profile_image: image_result.image_idx },
            { where: { user_idx } },
          );
        }
        return 'Success';
      } catch (e) {
        return 'Fail';
      }
    },

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
