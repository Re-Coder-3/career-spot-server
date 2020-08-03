import jwt from 'jsonwebtoken';
import { Context } from 'graphql-yoga/dist/types';

interface IUser {
  user_email: string;
  user_idx: number;
  iat: number;
  exp: number;
}

export const getUser = (context: Context) => {
  const {
    request: {
      headers: { authorization: token },
    },
  } = context;
  if (token) {
    const SECRET_KEY = process.env.JWT_SECRET_KEY!;
    const user = jwt.verify(token, SECRET_KEY);
    return user as IUser;
  }
};
