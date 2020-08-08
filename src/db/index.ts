import { Sequelize, Model, DataTypes, NOW } from 'sequelize';
import { config } from './config';
import { UserFactory } from '../model/User';
import { CategoryFactory } from '../model/Category';
import { PostFactory } from '../model/Post';
import { ImageFactory } from '../model/Img';
import { ScrapFactory } from '../model/Scrap';
import { HashtagFactory } from '../model/Hashtag';
import { ProfileFactory } from '../model/Profile';
import { HeartFactory } from '../model/Heart';

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
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
    console.log('✅ Connection successfully.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });

export const User = UserFactory(db);
export const Category = CategoryFactory(db);
export const Post = PostFactory(db);
export const Image = ImageFactory(db);
export const Scrap = ScrapFactory(db);
export const Hashtag = HashtagFactory(db);
export const Profile = ProfileFactory(db);
export const Heart = HeartFactory(db);

Post.belongsTo(Category, { foreignKey: 'category_idx' });
Post.belongsTo(User, { foreignKey: 'user_idx' });
Post.belongsTo(Image, { foreignKey: 'image_idx' });
Post.belongsTo(Hashtag, { foreignKey: 'hashtag_idx' });

Scrap.belongsTo(Post, { foreignKey: 'post_idx' });
Scrap.belongsTo(User, { foreignKey: 'user_idx' });

// User.belongsTo(Image, { foreignKey: 'image_idx' });

// User.belongsTo(Post, {through: "post_user"});

// * foreignKey 이름은 mysql 내부의 column 이름과 같게 지어야 합니다.
User.belongsTo(Profile, { foreignKey: 'user_profile_idx' });

Profile.belongsTo(User, { foreignKey: 'user_idx' });
Profile.belongsTo(Image, { foreignKey: 'user_profile_img' });
Profile.belongsTo(Category, { foreignKey: 'user_like_category_idx' });
