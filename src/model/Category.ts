import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CategoryAttributes {
  category_idx: number | string;
  category_name: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CategoryModel extends Model<CategoryAttributes>, CategoryAttributes {}
export class Category extends Model<CategoryModel, CategoryAttributes> {}

export type CategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;
};

export function CategoryFactory(sequelize: Sequelize): CategoryStatic {
  return <CategoryStatic>sequelize.define(
    'category',
    {
      category_idx: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
