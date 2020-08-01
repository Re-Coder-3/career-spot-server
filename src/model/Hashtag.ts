import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface HashtagAttributes {
  hashtag_idx: number | string;
  hashtag_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface HashtagModel extends Model<HashtagAttributes>, HashtagAttributes {}
export class Hashtag extends Model<HashtagModel, HashtagAttributes> {}

export type HashtagStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): HashtagModel;
};

export function HashtagFactory(sequelize: Sequelize): HashtagStatic {
  return <HashtagStatic>sequelize.define(
    "hashtag",
    {
      hashtag_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hashtag_name: {
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
