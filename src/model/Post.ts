import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface PostAttributes {
  post_idx: number | string;
  category_idx: number;
  user_idx: number;
  image_idx: number;
  hashtag_idx: number;
  post_title: string;
  post_content: string;
  post_location: string;
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
        references: {
          model: 'category',
          key: 'cateogory_idx'
        }
      },
      user_idx: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'user_idx'
        }
      },
      image_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'image',
          key: 'image_idx'
        }
      },
      hashtag_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'hashtag',
          key: 'hashtag_idx'
        }
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
      post_location: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
}
