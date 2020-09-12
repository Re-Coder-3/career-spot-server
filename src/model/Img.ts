import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ImageAttributes {
  image_idx: number | string;
  image_url: string | null;
  target_post_idx: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ImageModel extends Model<ImageAttributes>, ImageAttributes {}
export class Image extends Model<ImageModel, ImageAttributes> {}

export type ImageStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageModel;
};

export function ImageFactory(sequelize: Sequelize): ImageStatic {
  return <ImageStatic>sequelize.define(
    'image',
    {
      image_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    },
  );
}
