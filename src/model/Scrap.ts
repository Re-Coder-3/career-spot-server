import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ScrapAttributes {
  scrap_idx: number | string;
  user_idx: number;
  post_idx: number;
}
export interface ScrapModel extends Model<ScrapAttributes>, ScrapAttributes {}
export class Scrap extends Model<ScrapModel, ScrapAttributes> {}

export type ScrapStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScrapModel;
};

export function ScrapFactory(sequelize: Sequelize): ScrapStatic {
  return <ScrapStatic>sequelize.define(
    "scrap",
    {
      scrap_idx: {
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
          key: 'user_idx'
        }
      },
      post_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: 'post',
          key: 'post_idx'
        }
      },
    },
    {
      freezeTableName: true,
    }
  );
}
