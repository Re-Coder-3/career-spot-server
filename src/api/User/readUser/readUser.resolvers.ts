import User from "../../../models/User";
import { ReadUserQueryArgs } from "../../../types/graph";

export default {
  Query: {
    readUser: async (_: any, args: ReadUserQueryArgs) => {
      const { id } = args;
      try {
        const user = await User.findById(id);
        console.log(user);
        return user;
      } catch {
        return false;
      }
    },
  },
};
