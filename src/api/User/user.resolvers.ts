import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Image } from '../../db/index';
import {
  CreateUserMutationArgs,
  UpdateUserProfileMutationArgs,
  createUserReturnType,
  updateUserProfileReturnType,
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

    checkUser: async (_: any, __: any, context: Context): Promise<string> => {
      const user = getUser(context);
      console.log(user);
      return 'hi';
    },
  },

  Mutation: {
    createUser: async (_: any, args: CreateUserMutationArgs): Promise<createUserReturnType> => {
      try {
        const { user_email, user_password } = args;
        const hashedPassword = await bcrypt.hash(user_password, 10);
        // const nameCheck = await User.findOne({
        //   where: {
        //     user_name,
        //   },
        // });
        const emailCheck = await User.findOne({
          where: {
            user_email,
          },
        });
        // if (nameCheck) {
        //   return {
        //     status: 400,
        //     error: 'nameDuplicated',
        //   };
        // }
        if (emailCheck) {
          return {
            status: 400,
            error: 'emailDuplicated',
          };
        }
        await User.create({
          user_idx: '',
          user_email,
          user_password: hashedPassword,
        });
        return {
          status: 200,
          error: null,
        };
      } catch (e) {
        console.log(e);
        return {
          status: 400,
          error: 'serverError',
        };
      }
    },
    updateUserProfile: async (_: any, args: UpdateUserProfileMutationArgs, context: Context) => {
      const user = getUser(context);
      console.log(user?.user_idx);
    },

    loginUser: async (_: any, args: LoginUserMutationArgs, context: Context): Promise<string> => {
      try {
        const { user_email, user_password } = args;
        const user = await User.findOne({
          where: {
            user_email,
          },
        });
        if (!user) {
          // return {
          //   status:200,
          //   error: "UserNotFound",
          //   data:""
          // }
          return 'UserNotFound';
        }
        const pwd = await bcrypt.compare(user_password, user.user_password);
        if (!pwd) {
          return 'WrongPwd';
        }
        const SECRET_KEY = process.env.JWT_SECRET_KEY!;
        const jwtToken = jwt.sign({ user_email: user_email, user_idx: user.user_idx }, SECRET_KEY, {
          expiresIn: '4h',
        });
        console.log(jwtToken);

        return jwtToken;
      } catch (e) {
        console.log(e);
        return 'ServerErr';
      }
    },

    // updateUser: async (_: any, args: UpdateUserMutationArgs, context: Context): Promise<string> => {
    //   const user = getUser(context);
    //   const user_idx = user?.user_idx;
    //   try {
    //     const user = await User.findOne({
    //       where: { user_idx },
    //     });
    //     const image_idx = user?.user_profile_image;
    //     if (image_idx) {
    //       await Image.destroy({
    //         where: {
    //           image_idx,
    //         },
    //       });
    //       const { image_url }: string | any = args!;
    //       const image_result = await Image.create({
    //         image_idx: '',
    //         image_url: image_url,
    //       });
    //       await User.update(
    //         { user_profile_image: image_result.image_idx },
    //         { where: { user_idx } },
    //       );
    //     }
    //     return 'Success';
    //   } catch (e) {
    //     return 'Fail';
    //   }
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
