import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface UserAttributes {
  user_idx: number | string;
  user_email: string;
  user_password: string;
  // user_profile_image: number | string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define(
    'user',
    {
      user_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // user_name: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // user_profile_image: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: 'image',
      //     key: 'image_idx',
      //   },
      // },
      user_profile_idx: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Profile',
          key: 'profile_idx',
        },
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
