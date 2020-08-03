import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Category } from '../types/graph';

export interface ProfileAttributes {
  profile_idx: number | string;
  user_idx: number | string;
  user_name: string;
  user_location: string;
  user_profile_img: number | string;
  user_like_category: number | string;
  user_career: string;
  //   user_career_img: string;
  user_birth_day: Date;
}
export interface ProfileModel extends Model<ProfileAttributes>, ProfileAttributes {}
export class Profile extends Model<ProfileModel, ProfileAttributes> {}

export type ProfileStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProfileModel;
};

export function ProfileFactory(sequelize: Sequelize): ProfileStatic {
  return <ProfileStatic>sequelize.define(
    'profile',
    {
      profile_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'user',
          key: 'user_idx',
        },
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_profile_img: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'image',
          key: 'image_idx',
        },
      },
      user_like_category: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'category',
          key: 'category_idx',
        },
      },
      user_career: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      //   user_career_img:{
      //       type:DataTypes.STRING
      //   },
      user_birth_day: {
        type: DataTypes.DATE,
        allowNull: true,
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
    },
  );
}
