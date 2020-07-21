import { CreateUserMutationArgs } from "../../../types/graph";
import { user } from "../../../db";

export default {
  Mutation: {
    createUser: async (_: any, args: CreateUserMutationArgs) => {
      const { username, password, email } = args;
      //   const newUser = user.create({
      //     user_id: 1,
      //     user_name: username,
      //     user_email: email,
      //     user_password: password,
      //   });
      return "hi";
    },
  },
};
