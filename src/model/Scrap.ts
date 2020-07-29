import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ScrapAttributes {
  scrap_idx: number;
  user_idx: number;
  post_idx: number;
  createdAt?: Date;
  updatedAt?: Date;
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
      },
      post_idx: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
}
