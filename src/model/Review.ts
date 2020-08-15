import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ReviewAttributes {
  review_idx: number | string;
  user_idx: number;
  target_user_idx: number | null;
  review_stars: number | null;
  review_content: string;
}
export interface ReviewModel extends Model<ReviewAttributes>, ReviewAttributes {}
export class Review extends Model<ReviewModel, ReviewAttributes> {}

export type ReviewStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ReviewModel;
};

export function ReviewFactory(sequelize: Sequelize): ReviewStatic {
  return <ReviewStatic>sequelize.define(
    'review',
    {
      review_idx: {
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
      review_stars: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      review_content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
}
