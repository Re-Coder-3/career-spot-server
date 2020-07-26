import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PostAttributes {
  post_idx: number | string;
  category_idx: number;
  user_idx: number;
  image_idx: number;
  post_title: string;
  post_content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PostModel extends Model<PostAttributes>, PostAttributes {}
export class Post extends Model<PostModel, PostAttributes> {}

export type PostStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PostModel;
};

export function PostFactory(sequelize: Sequelize): PostStatic {
  return <PostStatic>sequelize.define(
    "post",
    {
      post_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      image_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      post_title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      post_content: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
}
