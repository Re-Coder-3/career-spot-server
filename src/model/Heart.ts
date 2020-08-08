import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface HeartAttributes {
  heart_idx: number | string;
  user_idx: number;
  target_user_idx: number | null;
  target_post_idx: number | null;
}
export interface HeartModel extends Model<HeartAttributes>, HeartAttributes {}
export class Heart extends Model<HeartModel, HeartAttributes> {}

export type HeartStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): HeartModel;
};

export function HeartFactory(sequelize: Sequelize): HeartStatic {
  return <HeartStatic>sequelize.define(
    'heart',
    {
      heart_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_idx: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'user_idx',
        },
      },
      target_user_idx: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'user',
          key: 'user_idx',
        },
      },
      target_post_idx: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: 'post',
          key: 'post_idx',
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
}
