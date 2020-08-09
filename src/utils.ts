import jwt from 'jsonwebtoken';
import { Context } from 'graphql-yoga/dist/types';
import { Op } from 'sequelize';

interface IUser {
  user_email: string;
  user_idx: number;
  iat: number;
  exp: number;
}

// * header에 token이 담겨져 오면 유저정보를 해석하기 위한 함수입니다.
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

export const changeWhere = (filter: any) => {
  let fieldList = [];
  let where: any = {};
  
  let filter_ = filter.filters
  for (let i = 0; i < filter_.length; i++) {
    if (filter_[i].operator == 'like') {
      where[filter_[i].field] = {
        [Op.like]: `%${filter_[i].value}%`,
      };
    }
    fieldList.push(where);
  }

  let returnWhere = {};

  if(filter.logic == "and"){
    returnWhere = { 
      [Op.and]: fieldList[0]
     };
  }else if(filter.logic == "or"){
    returnWhere = { 
      [Op.or]: fieldList[0]
     };
  }

  return returnWhere;
};
