import { CreateUserMutationArgs } from "../../../types/graph";
// import { user } from "../../../db";

export default {
  Mutation: {
    createUser: async (_: any, args: CreateUserMutationArgs) => {
      const { username, password, email, age } = args;
      // await user.create({
      //   user_id: "",
      //   user_name: username,
      //   user_age: age,
      //   user_email: email,
      //   user_password: password,
      //   user_createdAt: "",
      //   user_updatedAt: "",
      // });
      return "hi";
    },
  },
};
