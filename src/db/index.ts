import { Sequelize, Model, DataTypes, NOW } from "sequelize";
import { config } from "./config";
import { UserFactory } from "../model/User";
import { CategoryFactory } from "../model/Category";
import { PostFactory } from "../model/Post";
import { ImageFactory } from "../model/Img";
import { ScrapFactory } from "../model/Scrap";


const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: "mysql",
  // operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
});

db.authenticate()
  .then(() => {
    console.log("✅ Connection successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

export const User = UserFactory(db);
export const Category = CategoryFactory(db);
export const Scrap = ScrapFactory(db);
export const Post = PostFactory(db);
export const Image = ImageFactory(db);


Post.belongsTo(Category, {foreignKey: 'category_idx'});
Post.belongsTo(User, {foreignKey: 'user_idx'});
Post.belongsTo(Image, {foreignKey: 'image_idx'});

// User.belongsTo(Post, {through: "post_user"});
