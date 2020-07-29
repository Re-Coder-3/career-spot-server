import jwt from 'jsonwebtoken';
import { Context } from 'graphql-yoga/dist/types';

export const getUser = (context: Context) => {
  const {
    request: {
      headers: { authorization: token },
    },
  } = context;
  if (token) {
    const SECRET_KEY = process.env.JWT_SECRET_KEY!;
    const user = jwt.verify(token, SECRET_KEY);
    return user;
  }
  return false;
};
