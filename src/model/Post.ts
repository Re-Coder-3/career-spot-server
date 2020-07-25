import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PostAttributes {
  post_idx: number;
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
      post_title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      post_content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
    }
  );
}
