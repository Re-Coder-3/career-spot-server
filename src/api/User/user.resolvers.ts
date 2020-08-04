import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Image, Profile, Category } from '../../db/index';
import {
  CreateUserMutationArgs,
  UpdateUserProfileMutationArgs,
  createUserReturnType,
  updateUserProfileReturnType,
  LoginUserMutationArgs,
  loginUserReturnType,
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
          user_profile_idx: '',
        });
        // TODO: 처음에는 default profile data가 있으면 거기 연결해도 괜찮을듯합니다.
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
    updateUserProfile: async (
      _: any,
      args: UpdateUserProfileMutationArgs,
      context: Context,
    ): Promise<updateUserProfileReturnType> => {
      const u = getUser(context);
      const user_idx = u?.user_idx;
      const {
        user_name = '',
        user_profile_img,
        user_birthday,
        user_career_img,
        user_education = '',
        user_like_category,
        user_location = '',
        user_career = '',
      } = args;

      if (user_idx) {
        try {
          const user = await User.findOne({
            where: {
              user_idx,
            },
          });
          const profile = await Profile.findOne({
            where: {
              user_idx,
            },
          });
          // * category 이름으로 검색해서 겹치는게 있으면 생성하지않고 연결만.
          const category = await Category.findOne({
            where: {
              category_name: user_like_category,
            },
          });
          // * 이미 프로필이 있으면 없애고 업데이트
          // * 프론트엔드에서는 프로필수정을 수행할때 input창에 value를
          // * 백엔드에서 받아온 유저 정보를 미리 넣어놓아야 수정할때
          // * 유저가 수정하지않은사항은 이전값 그대로 업데이트 할수있습니다.
          if (user?.user_profile_idx) {
            await Profile.destroy({
              where: {
                profile_idx: user?.user_profile_idx,
              },
            });
          }
          const profileImg = profile?.user_profile_img;
          if (profileImg) {
            await Image.destroy({
              where: {
                image_idx: profileImg,
              },
            });
          }
          const newProfileImg = await Image.create({
            image_idx: '',
            image_url: user_profile_img,
          });
          let userCategory;
          if (!category) {
            userCategory = await Category.create({
              category_idx: '',
              category_name: user_like_category,
            });
          } else {
            userCategory = category;
          }
          const profile_result = await Profile.create({
            profile_idx: '',
            user_idx,
            user_name,
            user_location,
            user_education,
            user_profile_img: newProfileImg.image_idx,
            user_like_category_idx: userCategory.category_idx,
            user_career,
          });

          await User.update(
            {
              user_profile_idx: profile_result.profile_idx,
            },
            {
              where: {
                user_idx,
              },
            },
          );
          return {
            error: null,
            status: 200,
          };
        } catch (e) {
          console.log(e);
        }
      }
      return {
        error: 'serverError',
        status: 400,
      };
    },

    loginUser: async (
      _: any,
      args: LoginUserMutationArgs,
      context: Context,
    ): Promise<loginUserReturnType> => {
      try {
        const { user_email, user_password } = args;
        const user = await User.findOne({
          where: {
            user_email,
          },
        });
        if (!user) {
          return {
            status: 400,
            data: null,
            error: 'UserNotFound',
          };
        }
        const pwd = await bcrypt.compare(user_password, user.user_password);
        if (!pwd) {
          return {
            status: 400,
            data: null,
            error: 'WrongPwd',
          };
        }
        const SECRET_KEY = process.env.JWT_SECRET_KEY!;
        const jwtToken = jwt.sign({ user_email: user_email, user_idx: user.user_idx }, SECRET_KEY, {
          expiresIn: '4h',
        });

        return {
          status: 200,
          data: jwtToken,
          error: null,
        };
      } catch (e) {
        console.log(e);
        return {
          status: 500,
          data: null,
          error: 'ServerError',
        };
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
